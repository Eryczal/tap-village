import { Element } from "../../../element/Element.js";
import { BuyButton } from "../../_elements/BuyButton.js";
import { buildings } from "../../../data/buildings.js";

class BackButton extends Element {
    constructor(game, menu) {
        super(game);

        this.MENU_SIZE = menu.MENU_SIZE;

        this.width = this.game.canvas.width / 4;
        this.height = this.game.canvas.width / 24;

        this.x = (this.game.canvas.width - this.MENU_SIZE) / 2 + this.MENU_SIZE - this.width / 2;
        this.y = this.game.canvas.height - this.game.canvas.height / 8;

        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            let building = this.game.buildingsManager.clickedBuilding;
            if (building.buildingId !== 5 || building.menu === 0) {
                this.game.sceneManager.changeScene("main");
            } else {
                this.game.sceneManager.currentScene.changeMenu(0);
            }
            this.game.assetsManager.playAudio("click2", true);
        }
    }

    onResize() {
        this.width = this.game.canvas.width / 4;
        this.height = this.game.canvas.width / 24;

        this.x = (this.game.canvas.width - this.MENU_SIZE) / 2 + this.MENU_SIZE - this.width / 2;
        this.y = this.game.canvas.height - this.game.canvas.height / 8;
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
        this.game.strokeText("Powrót", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
        this.game.writeText("Powrót", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
    }
}

class UpgradeButton extends BackButton {
    constructor(game, menu) {
        super(game, menu);

        this.y = this.game.canvas.height - this.game.canvas.height / 8 - this.height * 1.2;

        this.offset = this.game.canvas.width / 200;
        this.iconY = this.y - this.height / 3 - this.height / 4;

        this.building = this.game.buildingsManager.clickedBuilding;
        this.cost = buildings[this.building.buildingId].upgrades[this.building.lvl - 1]?.cost;
        this.clickable = this.cost !== undefined;

        this.upgradeCost = new UpgradeCost(game, this);
    }

    onClick(mouseX, mouseY) {
        let player = this.game.playerManager;
        if (this.isMouseOver(mouseX, mouseY) && this.cost !== undefined) {
            if (
                player.wood >= this.cost.wood &&
                player.stone >= this.cost.stone &&
                player.gold >= this.cost.gold &&
                (this.building.buildingId === 0 || this.game.buildingsManager.buildings[0].lvl > this.building.lvl) &&
                this.game.constructionManager.constructionState === null
            ) {
                this.game.assetsManager.playAudio("click2", true);

                player.wood -= this.cost.wood;
                player.stone -= this.cost.stone;
                player.gold -= this.cost.gold;

                this.cost = buildings[this.building.buildingId].upgrades[this.building.lvl - 1]?.cost;
                this.clickable = this.cost !== undefined;

                this.game.constructionManager.setConstruction(this.building.buildingId, "upgrade", this.game.buildingsManager.clickedBuilding);
                this.game.constructionManager.setBuild();
                this.game.sceneManager.changeScene("main");
            }
        }
    }

    unload() {
        this.upgradeCost.unload();
    }

    onRightClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.game.playerManager.gem === "max") {
            if (this.game.constructionManager.constructionState === null) {
                this.game.constructionManager.setConstruction(this.building.buildingId, "upgrade", this.game.buildingsManager.clickedBuilding);
                this.game.constructionManager.setBuild();
                this.game.sceneManager.changeScene("main");
            }
        }
    }

    onResize() {
        this.y = this.game.canvas.height - this.game.canvas.height / 8 - this.height * 1.2;

        this.upgradeCost.onResize();
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.upgradeButton, this.x, this.y, this.width, this.height);

        if (this.building.buildingId === 0 || this.building.lvl < this.game.buildingsManager.buildings[0].lvl) {
            if (this.cost !== undefined) {
                this.game.strokeText("Ulepsz", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
                this.game.writeText("Ulepsz", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);

                this.upgradeCost.draw();
            } else {
                this.game.strokeText("Maksymalny poziom", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
                this.game.writeText("Maksymalny poziom", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
            }
        } else {
            this.game.strokeText("Wymaga ulepszenia zamku", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
            this.game.writeText("Wymaga ulepszenia zamku", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
        }
    }
}

class UpgradeCost extends BuyButton {
    constructor(game, parent) {
        super(
            game,
            parent.x,
            parent.y - parent.height * 0.7,
            parent.width,
            parent.height * 0.7,
            parent,
            `%i0 ${parent.cost.wood} %i1 ${parent.cost.stone} %i2 ${parent.cost.gold}`,
            ["woodIcon", "stoneIcon", "goldIcon"],
            parent.height * 0.7 * 0.8,
            3
        );

        this.updateColors();
    }

    unload() {
        clearTimeout(this.updateTimeout);
    }

    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "rgba(255, 255, 0, 0.2)";
        this.game.ctx.rect(this.x, this.y, this.width, this.height);
        this.game.ctx.fill();

        this.elements.forEach((element, i) => {
            if (typeof element.value === "string") {
                this.game.strokeText(element.value, this.x + element.x, this.y + this.height / 2, this.size, this.sColor, "left");
                this.game.writeText(element.value, this.x + element.x, this.y + this.height / 2, this.size, this.colors[Math.floor(i / 2)], "left");
            } else {
                this.game.ctx.drawImage(element.value, this.x + element.x, this.y + this.height * 0.2, this.height * 0.6, this.height * 0.6);
            }
        });
    }

    onResize() {
        this.x = this.parent.x;
        this.y = this.parent.y - this.parent.height / 1.5;
        this.width = this.parent.width;
        this.height = this.parent.height / 1.5;
    }

    updateColors() {
        this.colors = [
            this.game.playerManager.wood >= this.parent.cost.wood ? "#3f3" : "#f33",
            this.game.playerManager.stone >= this.parent.cost.stone ? "#3f3" : "#f33",
            this.game.playerManager.gold >= this.parent.cost.gold ? "#3f3" : "#f33",
        ];

        this.updateTimeout = setTimeout(() => {
            this.updateColors();
        }, 1000);
    }
}

export { BackButton, UpgradeButton };
