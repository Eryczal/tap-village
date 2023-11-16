import { Element } from "../../../element/Element.js";
import { BuyButton } from "../../_elements/BuyButton.js";
import { buildings } from "../../../data/buildings.js";
import { cards } from "../../../data/cards.js";
import { MineBuilding, QuarryBuilding, SawmillBuilding, WorkshopBuilding } from "../../../managers/BuildingsManager.js";

class BuildingButton extends BuyButton {
    constructor(game, menu, text, stat, y = 0) {
        if (game.buildingsManager.clickedBuilding.buildingId === 4 && stat !== "workersSpeed") {
            y -= y > 0 ? 2 : 0;
        }

        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 - game.canvas.width / 6 / 2 + menu.MENU_SIZE,
            game.canvas.height / 6 + (y * game.canvas.width) / 36,
            game.canvas.width / 6,
            game.canvas.width / 36,
            false,
            "Kup",
            false,
            game.canvas.width / 78,
            4
        );

        this.MENU_SIZE = menu.MENU_SIZE;

        this.offset = canvas.width / 200;

        this.clickable = true;

        this.text = text;
        this.stat = stat;
        this.building = this.game.buildingsManager.clickedBuilding;

        if (this.building.lvl > 1) {
            this.maxStat = buildings[this.building.buildingId].upgrades[this.building.lvl - 2].maxStats[stat];
        } else {
            this.maxStat = buildings[this.building.buildingId].maxStats[stat];
        }

        this.updateValues(0, 0, false);

        this.state = 0;
    }

    updateValues(mouseX, mouseY, save = true) {
        if (this.stat !== "workers" && this.stat !== "workersSpeed") {
            switch (this.building.buildingId) {
                case 1:
                    this[this.stat] = SawmillBuilding.stats[this.stat];
                    this.cost = SawmillBuilding.statsCost[this.stat];
                    this.gatheringCard = cards[4].upgrades[this.game.playerManager.cards[4].lvl];
                    this.chanceCard = cards[0].upgrades[this.game.playerManager.cards[0].lvl];
                    break;

                case 2:
                    this[this.stat] = QuarryBuilding.stats[this.stat];
                    this.cost = QuarryBuilding.statsCost[this.stat];
                    this.gatheringCard = cards[5].upgrades[this.game.playerManager.cards[5].lvl];
                    this.chanceCard = cards[1].upgrades[this.game.playerManager.cards[1].lvl];
                    break;

                case 3:
                    this[this.stat] = MineBuilding.stats[this.stat];
                    this.cost = MineBuilding.statsCost[this.stat];
                    this.gatheringCard = cards[6].upgrades[this.game.playerManager.cards[6].lvl];
                    this.chanceCard = cards[2].upgrades[this.game.playerManager.cards[2].lvl];
                    break;

                case 4:
                    this[this.stat] = WorkshopBuilding.stats[this.stat];
                    this.cost = WorkshopBuilding.statsCost[this.stat];
                    this.gatheringCard = 0;
                    break;
            }

            if (save) {
                this.building.saveType();
            }
        } else {
            this[this.stat] = this.building[this.stat];
            this.cost = this.building[this.stat + "Cost"];

            if (save) {
                this.game.buildingsManager.saveBuilding(this.building.position);
            }
        }

        this.actualCost = {
            wood: Math.ceil(this.cost.wood - (this.cost.wood * cards[8].upgrades[this.game.playerManager.cards[8].lvl]) / 100),
            stone: Math.ceil(this.cost.stone - (this.cost.stone * cards[9].upgrades[this.game.playerManager.cards[9].lvl]) / 100),
            gold: Math.ceil(this.cost.gold - (this.cost.gold * cards[10].upgrades[this.game.playerManager.cards[10].lvl]) / 100),
        };

        this.updateColors();

        this.updateText(`%i0 ${this.actualCost.wood} %i1 ${this.actualCost.stone} %i2 ${this.actualCost.gold}`, ["woodIcon", "stoneIcon", "goldIcon"]);

        this.updateTexts?.();

        this.onHover(mouseX, mouseY);
    }

    onHover(mouseX, mouseY) {
        super.onHover(mouseX, mouseY);

        if (this.isMouseOver(mouseX, mouseY)) {
            this.updateColors();
            this.updateText(`%i0 ${this.actualCost.wood} %i1 ${this.actualCost.stone} %i2 ${this.actualCost.gold}`, ["woodIcon", "stoneIcon", "goldIcon"]);
        }

        return this.isMouseOver(mouseX, mouseY);
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);

        if (this.state === 0) {
            this.game.strokeText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
            this.game.writeText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
        } else if (this.state === 1) {
            this.elements.forEach((element, i) => {
                if (typeof element.value === "string") {
                    this.game.strokeText(element.value, this.x + element.x, this.y + this.height / 2, this.size, this.sColor, "left");
                    this.game.writeText(element.value, this.x + element.x, this.y + this.height / 2, this.size, this.colors[Math.floor(i / 2)], "left");
                } else {
                    this.game.ctx.drawImage(element.value, this.x + element.x, this.y + this.height * 0.2, this.height * 0.6, this.height * 0.6);
                }
            });
        } else {
            this.game.strokeText("Wymaga ulepszenia budynku", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
            this.game.writeText("Wymaga ulepszenia budynku", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
        }
    }

    updateColors() {
        this.colors = [
            this.game.playerManager.wood >= this.actualCost.wood ? "#3f3" : "#f33",
            this.game.playerManager.stone >= this.actualCost.stone ? "#3f3" : "#f33",
            this.game.playerManager.gold >= this.actualCost.gold ? "#3f3" : "#f33",
        ];
    }
}

class GatheringPower extends BuildingButton {
    constructor(game, menu) {
        super(game, menu, "Ulepsz", "gatheringPower");

        this.updateTexts();
    }

    updateTexts() {
        this.texts = [
            `Moc zbierania `,
            `${Math.floor(this.gatheringPower + (this.gatheringPower * this.gatheringCard) / 100)} `,
            `-> `,
            `${Math.floor(this.gatheringPower + 1 + ((this.gatheringPower + 1) * this.gatheringCard) / 100)} `,
        ];

        this.textSizes = [
            this.game.writeText(this.texts[0], 0, 0, this.height / 2, "transparent").sizes[0].width,
            this.game.writeText(this.texts[1], 0, 0, this.height / 2, "transparent").sizes[0].width,
            this.game.writeText(this.texts[2], 0, 0, this.height / 2, "transparent").sizes[0].width,
        ];

        this.textX = [
            this.x,
            this.x + this.textSizes[0],
            this.x + this.textSizes[0] + this.textSizes[1],
            this.x + this.textSizes[0] + this.textSizes[1] + this.textSizes[2],
        ];
    }

    draw() {
        super.draw();
        this.game.strokeText(this.texts[0] + this.texts[1] + this.texts[2] + this.texts[3], this.x, this.y - this.height / 4, this.height / 2, "#000", "left");
        this.game.writeText(this.texts[0], this.textX[0], this.y - this.height / 4, this.height / 2, "#fff", "left");
        this.game.writeText(this.texts[1], this.textX[1], this.y - this.height / 4, this.height / 2, this.gatheringCard > 0 ? "#3cf" : "#fff", "left");
        this.game.writeText(this.texts[2], this.textX[2], this.y - this.height / 4, this.height / 2, "#fff", "left");
        this.game.writeText(this.texts[3], this.textX[3], this.y - this.height / 4, this.height / 2, this.gatheringCard > 0 ? "#3cf" : "#fff", "left");
    }

    onHover(mouseX, mouseY) {
        if (super.onHover(mouseX, mouseY)) {
            if (this.gatheringPower < this.maxStat) {
                this.state = 1;
            } else {
                this.state = 2;
            }
        } else {
            this.state = 0;
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.gatheringPower < this.maxStat) {
                if (
                    this.game.playerManager.wood >= this.actualCost.wood &&
                    this.game.playerManager.stone >= this.actualCost.stone &&
                    this.game.playerManager.gold >= this.actualCost.gold
                ) {
                    this.game.playerManager.wood -= this.actualCost.wood;
                    this.game.playerManager.stone -= this.actualCost.stone;
                    this.game.playerManager.gold -= this.actualCost.gold;

                    switch (this.building.buildingId) {
                        case 1:
                            SawmillBuilding.stats.gatheringPower += 1;
                            break;

                        case 2:
                            QuarryBuilding.stats.gatheringPower += 1;
                            break;

                        case 3:
                            MineBuilding.stats.gatheringPower += 1;
                            break;
                    }

                    this.cost.wood = Math.round(this.cost.wood * 1.8);
                    this.cost.stone = Math.round(this.cost.stone * 1.8);
                    this.cost.gold = Math.round(this.cost.gold * 1.8);

                    if (this.cost.wood < 10 && this.gatheringPower + 1 > 3) {
                        this.cost.wood = 10;
                    }

                    if (this.cost.stone < 10 && this.gatheringPower + 1 > 4) {
                        this.cost.stone = Math.round(this.cost.wood / 3);
                    }

                    if (this.cost.gold < 10 && this.gatheringPower + 1 > 5) {
                        this.cost.gold = Math.round(this.cost.stone / 3);
                    }

                    this.game.assetsManager.playAudio("upgrade", true);

                    this.updateValues(mouseX, mouseY);
                }
            }
        }
    }
}

class GatheringChance extends BuildingButton {
    constructor(game, menu) {
        super(game, menu, "Ulepsz", "gatheringChance", 2);

        this.updateTexts();
    }

    updateTexts() {
        this.texts = [
            `Szansa zbierania `,
            `${Math.floor(this.gatheringChance + this.chanceCard)}% `,
            `-> `,
            `${Math.floor(this.gatheringChance + 1 + this.chanceCard)}% `,
        ];

        this.textSizes = [
            this.game.writeText(this.texts[0], 0, 0, this.height / 2, "transparent").sizes[0].width,
            this.game.writeText(this.texts[1], 0, 0, this.height / 2, "transparent").sizes[0].width,
            this.game.writeText(this.texts[2], 0, 0, this.height / 2, "transparent").sizes[0].width,
        ];

        this.textX = [
            this.x,
            this.x + this.textSizes[0],
            this.x + this.textSizes[0] + this.textSizes[1],
            this.x + this.textSizes[0] + this.textSizes[1] + this.textSizes[2],
        ];
    }

    draw() {
        super.draw();
        this.game.strokeText(this.texts[0] + this.texts[1] + this.texts[2] + this.texts[3], this.x, this.y - this.height / 4, this.height / 2, "#000", "left");
        this.game.writeText(this.texts[0], this.textX[0], this.y - this.height / 4, this.height / 2, "#fff", "left");
        this.game.writeText(this.texts[1], this.textX[1], this.y - this.height / 4, this.height / 2, this.chanceCard > 0 ? "#3cf" : "#fff", "left");
        this.game.writeText(this.texts[2], this.textX[2], this.y - this.height / 4, this.height / 2, "#fff", "left");
        this.game.writeText(this.texts[3], this.textX[3], this.y - this.height / 4, this.height / 2, this.chanceCard > 0 ? "#3cf" : "#fff", "left");
    }

    onHover(mouseX, mouseY) {
        if (super.onHover(mouseX, mouseY)) {
            if (this.gatheringChance < this.maxStat) {
                this.state = 1;
            } else {
                this.state = 2;
            }
        } else {
            this.state = 0;
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.gatheringChance < this.maxStat) {
                if (
                    this.game.playerManager.wood >= this.actualCost.wood &&
                    this.game.playerManager.stone >= this.actualCost.stone &&
                    this.game.playerManager.gold >= this.actualCost.gold
                ) {
                    this.game.playerManager.wood -= this.actualCost.wood;
                    this.game.playerManager.stone -= this.actualCost.stone;
                    this.game.playerManager.gold -= this.actualCost.gold;

                    switch (this.building.buildingId) {
                        case 1:
                            SawmillBuilding.stats.gatheringChance += 1;
                            break;

                        case 2:
                            QuarryBuilding.stats.gatheringChance += 1;
                            break;

                        case 3:
                            MineBuilding.stats.gatheringChance += 1;
                            break;
                    }

                    this.cost.wood = Math.round(this.cost.wood * 1.1);
                    this.cost.stone = Math.round(this.cost.stone * 1.1);
                    this.cost.gold = Math.round(this.cost.gold * 1.1);

                    if (this.cost.wood < 10 && this.gatheringChance + 1 > 7) {
                        this.cost.wood = 10;
                    }

                    if (this.cost.stone < 10 && this.gatheringChance + 1 > 10) {
                        this.cost.stone = Math.round(this.cost.wood / 3);
                    }

                    if (this.cost.gold < 10 && this.gatheringChance + 1 > 15) {
                        this.cost.gold = Math.round(this.cost.stone / 3);
                    }

                    this.game.assetsManager.playAudio("upgrade", true);

                    this.updateValues();
                }
            }
        }
    }
}

class BuildingPower extends BuildingButton {
    constructor(game, menu) {
        super(game, menu, "Ulepsz", "buildingPower");
    }

    draw() {
        super.draw();
        this.game.strokeText(
            `Moc budowania ${this.buildingPower} -> ${this.buildingPower + 1}`,
            this.x,
            this.y - this.height / 4,
            this.height / 2,
            "#000",
            "left"
        );
        this.game.writeText(
            `Moc budowania ${this.buildingPower} -> ${this.buildingPower + 1}`,
            this.x,
            this.y - this.height / 4,
            this.height / 2,
            "#fff",
            "left"
        );
    }

    onHover(mouseX, mouseY) {
        if (super.onHover(mouseX, mouseY)) {
            if (this.buildingPower < this.maxStat) {
                this.state = 1;
            } else {
                this.state = 2;
            }
        } else {
            this.state = 0;
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.buildingPower < this.maxStat) {
                if (
                    this.game.playerManager.wood >= this.actualCost.wood &&
                    this.game.playerManager.stone >= this.actualCost.stone &&
                    this.game.playerManager.gold >= this.actualCost.gold
                ) {
                    this.game.playerManager.wood -= this.actualCost.wood;
                    this.game.playerManager.stone -= this.actualCost.stone;
                    this.game.playerManager.gold -= this.actualCost.gold;

                    WorkshopBuilding.stats.buildingPower += 1;

                    this.cost.wood = Math.round(this.cost.wood * 1.3);
                    this.cost.stone = Math.round(this.cost.stone * 1.3);
                    this.cost.gold = Math.round(this.cost.gold * 1.3);

                    this.game.assetsManager.playAudio("upgrade", true);

                    this.updateValues(mouseX, mouseY);
                }
            }
        }
    }
}

class CriticPower extends BuildingButton {
    constructor(game, menu) {
        super(game, menu, "Ulepsz", "criticalPower", 4);

        this.updateTexts();
    }

    updateTexts() {
        this.texts = [
            `Moc ciosu kryt. `,
            `${Math.floor(this.criticalPower + (this.criticalPower * this.gatheringCard) / 100)} `,
            `-> `,
            `${Math.floor(this.criticalPower + 1 + ((this.criticalPower + 1) * this.gatheringCard) / 100)} `,
        ];

        this.textSizes = [
            this.game.writeText(this.texts[0], 0, 0, this.height / 2, "transparent").sizes[0].width,
            this.game.writeText(this.texts[1], 0, 0, this.height / 2, "transparent").sizes[0].width,
            this.game.writeText(this.texts[2], 0, 0, this.height / 2, "transparent").sizes[0].width,
        ];

        this.textX = [
            this.x,
            this.x + this.textSizes[0],
            this.x + this.textSizes[0] + this.textSizes[1],
            this.x + this.textSizes[0] + this.textSizes[1] + this.textSizes[2],
        ];
    }

    draw() {
        super.draw();
        this.game.strokeText(this.texts[0] + this.texts[1] + this.texts[2] + this.texts[3], this.x, this.y - this.height / 4, this.height / 2, "#000", "left");
        this.game.writeText(this.texts[0], this.textX[0], this.y - this.height / 4, this.height / 2, "#fff", "left");
        this.game.writeText(this.texts[1], this.textX[1], this.y - this.height / 4, this.height / 2, this.gatheringCard > 0 ? "#3cf" : "#fff", "left");
        this.game.writeText(this.texts[2], this.textX[2], this.y - this.height / 4, this.height / 2, "#fff", "left");
        this.game.writeText(this.texts[3], this.textX[3], this.y - this.height / 4, this.height / 2, this.gatheringCard > 0 ? "#3cf" : "#fff", "left");
    }

    onHover(mouseX, mouseY) {
        if (super.onHover(mouseX, mouseY)) {
            if (this.criticalPower < this.maxStat) {
                this.state = 1;
            } else {
                this.state = 2;
            }
        } else {
            this.state = 0;
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.criticalPower < this.maxStat) {
                if (
                    this.game.playerManager.wood >= this.actualCost.wood &&
                    this.game.playerManager.stone >= this.actualCost.stone &&
                    this.game.playerManager.gold >= this.actualCost.gold
                ) {
                    this.game.playerManager.wood -= this.actualCost.wood;
                    this.game.playerManager.stone -= this.actualCost.stone;
                    this.game.playerManager.gold -= this.actualCost.gold;

                    switch (this.building.buildingId) {
                        case 1:
                            SawmillBuilding.stats.criticalPower += 1;
                            break;

                        case 2:
                            QuarryBuilding.stats.criticalPower += 1;
                            break;

                        case 3:
                            MineBuilding.stats.criticalPower += 1;
                            break;

                        case 4:
                            WorkshopBuilding.stats.criticalPower += 1;
                            break;
                    }

                    this.cost.wood = Math.round(this.cost.wood * 1.2);
                    this.cost.stone = Math.round(this.cost.stone * 1.2);
                    this.cost.gold = Math.round(this.cost.gold * 1.2);

                    if (this.cost.wood < 10 && this.criticalPower + 1 > 7) {
                        this.cost.wood = 10;
                    }

                    if (this.cost.stone < 10 && this.criticalPower + 1 > 10) {
                        this.cost.stone = Math.round(this.cost.wood / 3);
                    }

                    if (this.cost.gold < 10 && this.criticalPower + 1 > 15) {
                        this.cost.gold = Math.round(this.cost.stone / 3);
                    }

                    this.game.assetsManager.playAudio("upgrade", true);

                    this.updateValues();
                }
            }
        }
    }
}

class CriticChance extends BuildingButton {
    constructor(game, menu) {
        super(game, menu, "Ulepsz", "criticalChance", 6);
    }

    draw() {
        super.draw();
        this.game.strokeText(
            `Szansa ciosu kryt. ${this.criticalChance}% -> ${this.criticalChance + 1}%`,
            this.x,
            this.y - this.height / 4,
            this.height / 2,
            "#000",
            "left"
        );
        this.game.writeText(
            `Szansa ciosu kryt. ${this.criticalChance}% -> ${this.criticalChance + 1}%`,
            this.x,
            this.y - this.height / 4,
            this.height / 2,
            "#fff",
            "left"
        );
    }

    onHover(mouseX, mouseY) {
        if (super.onHover(mouseX, mouseY)) {
            if (this.criticalChance < this.maxStat) {
                this.state = 1;
            } else {
                this.state = 2;
            }
        } else {
            this.state = 0;
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.criticalChance < this.maxStat) {
                if (
                    this.game.playerManager.wood >= this.actualCost.wood &&
                    this.game.playerManager.stone >= this.actualCost.stone &&
                    this.game.playerManager.gold >= this.actualCost.gold
                ) {
                    this.game.playerManager.wood -= this.actualCost.wood;
                    this.game.playerManager.stone -= this.actualCost.stone;
                    this.game.playerManager.gold -= this.actualCost.gold;

                    switch (this.building.buildingId) {
                        case 1:
                            SawmillBuilding.stats.criticalChance += 1;
                            break;

                        case 2:
                            QuarryBuilding.stats.criticalChance += 1;
                            break;

                        case 3:
                            MineBuilding.stats.criticalChance += 1;
                            break;

                        case 4:
                            WorkshopBuilding.stats.criticalChance += 1;
                            break;
                    }

                    this.cost.wood = Math.round(this.cost.wood * 1.2);
                    this.cost.stone = Math.round(this.cost.stone * 1.2);
                    this.cost.gold = Math.round(this.cost.gold * 1.2);

                    if (this.cost.wood < 10 && this.criticalChance + 1 > 7) {
                        this.cost.wood = 10;
                    }

                    if (this.cost.stone < 10 && this.criticalChance + 1 > 10) {
                        this.cost.stone = Math.round(this.cost.wood / 3);
                    }

                    if (this.cost.gold < 10 && this.criticalChance + 1 > 15) {
                        this.cost.gold = Math.round(this.cost.stone / 3);
                    }

                    this.game.assetsManager.playAudio("upgrade", true);

                    this.updateValues();
                }
            }
        }
    }
}

class Workers extends BuildingButton {
    constructor(game, menu) {
        super(game, menu, "Zatrudnij", "workers");

        this.x += this.width * 1.2;
    }

    draw() {
        super.draw();
        this.game.strokeText(`Liczba pracowników ${this.workers} -> ${this.workers + 1}`, this.x, this.y - this.height / 4, this.height / 2, "#000", "left");
        this.game.writeText(`Liczba pracowników ${this.workers} -> ${this.workers + 1}`, this.x, this.y - this.height / 4, this.height / 2, "#fff", "left");
    }

    onHover(mouseX, mouseY) {
        if (super.onHover(mouseX, mouseY)) {
            if (this.workers < this.maxStat) {
                this.state = 1;
            } else {
                this.state = 2;
            }
        } else {
            this.state = 0;
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.workers < this.maxStat) {
                if (
                    this.game.playerManager.wood >= this.actualCost.wood &&
                    this.game.playerManager.stone >= this.actualCost.stone &&
                    this.game.playerManager.gold >= this.actualCost.gold
                ) {
                    this.game.playerManager.wood -= this.actualCost.wood;
                    this.game.playerManager.stone -= this.actualCost.stone;
                    this.game.playerManager.gold -= this.actualCost.gold;
                    this.building.workers += 1;
                    this.cost.wood = Math.round(this.cost.wood * 1.7);
                    this.cost.stone = Math.round(this.cost.stone * 1.7);
                    this.cost.gold = Math.round(this.cost.gold * 1.7);

                    if (this.cost.gold < 4 && this.building.workers > 3) {
                        this.cost.gold = Math.round(this.cost.stone / 3);
                    }

                    this.game.assetsManager.playAudio("upgrade", true);

                    this.updateValues();
                }
            }
        }
    }
}

class WorkersSpeed extends BuildingButton {
    constructor(game, menu) {
        super(game, menu, "Ulepsz", "workersSpeed", 2);

        this.workersSpeedUpgrade = Math.round((this.workersSpeed - 0.5) * 10) / 10;

        this.x += this.width * 1.2;
    }

    updateValues() {
        super.updateValues();

        this.workersSpeedUpgrade = Math.round((this.workersSpeed - 0.5) * 10) / 10;
    }

    draw() {
        super.draw();
        this.game.strokeText(
            `Prędkość pracowników ${this.workersSpeed}s -> ${this.workersSpeedUpgrade}s`,
            this.x,
            this.y - this.height / 4,
            this.height / 2,
            "#000",
            "left"
        );
        this.game.writeText(
            `Prędkość pracowników ${this.workersSpeed}s -> ${this.workersSpeedUpgrade}s`,
            this.x,
            this.y - this.height / 4,
            this.height / 2,
            "#fff",
            "left"
        );
    }

    onHover(mouseX, mouseY) {
        if (super.onHover(mouseX, mouseY)) {
            if (this.workersSpeed > this.maxStat) {
                this.state = 1;
            } else {
                this.state = 2;
            }
        } else {
            this.state = 0;
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.workersSpeed > this.maxStat) {
                if (
                    this.game.playerManager.wood >= this.actualCost.wood &&
                    this.game.playerManager.stone >= this.actualCost.stone &&
                    this.game.playerManager.gold >= this.actualCost.gold
                ) {
                    this.game.playerManager.wood -= this.actualCost.wood;
                    this.game.playerManager.stone -= this.actualCost.stone;
                    this.game.playerManager.gold -= this.actualCost.gold;

                    this.building.workersSpeed = this.workersSpeedUpgrade;

                    clearInterval(this.building.workersTimer);

                    this.building.workersTimer = setInterval(() => {
                        switch (this.building.buildingId) {
                            case 1:
                                this.game.playerManager.wood += this.building.workers;
                                break;

                            case 2:
                                this.game.playerManager.stone += this.building.workers;
                                break;

                            case 3:
                                this.game.playerManager.gold += this.building.workers;
                                break;

                            case 4:
                                if (this.game.constructionManager.constructionState === 1) {
                                    let critic = Math.random() < cards[3].upgrades[this.game.playerManager.cards[3].lvl] / 100;
                                    let amount = critic ? this.building.workers * 2 : this.building.workers;
                                    this.game.constructionManager.addProgress("worker", amount);
                                    this.game.sceneManager.currentScene?.elementsHolder?.elements?.map?.addWorkerClick(critic, amount);
                                }
                                break;
                        }
                    }, this.building.workersSpeed * 1000);

                    this.cost.wood = Math.round(this.cost.wood * 1.3);
                    this.cost.stone = Math.round(this.cost.stone * 1.3);
                    this.cost.gold = Math.round(this.cost.gold * 1.3);

                    if (this.cost.gold < 4 && this.building.workersSpeed < Math.round(buildings[this.building.buildingId].stats.workersSpeed - 1.5)) {
                        this.cost.gold = Math.round(this.cost.stone / 3);
                    }

                    this.game.assetsManager.playAudio("upgrade", true);

                    this.updateValues();
                }
            }
        }
    }
}

export { GatheringPower, GatheringChance, BuildingPower, CriticPower, CriticChance, Workers, WorkersSpeed };
