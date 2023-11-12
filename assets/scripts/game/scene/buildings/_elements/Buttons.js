import { Element } from "../../../element/Element.js";
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

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
        this.game.strokeText("Powrót", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
        this.game.writeText("Powrót", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
    }
}

class UpgradeButton extends BackButton {
    constructor(game, menu) {
        super(game, menu);

        this.y = this.game.canvas.height - this.game.canvas.height / 4;

        this.offset = this.game.canvas.width / 200;
        this.iconY = this.y - this.height / 3 - this.height / 4;

        this.building = this.game.buildingsManager.clickedBuilding;
        this.cost = buildings[this.building.buildingId].upgrades[this.building.lvl - 1]?.cost;
        this.clickable = this.cost !== undefined;
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

    onRightClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.game.playerManager.gem === "max") {
            if (this.game.constructionManager.constructionState === null) {
                this.game.constructionManager.setConstruction(this.building.buildingId, "upgrade", this.game.buildingsManager.clickedBuilding);
                this.game.constructionManager.setBuild();
                this.game.sceneManager.changeScene("main");
            }
        }
    }

    draw() {
        let textX = this.x + this.offset;
        let player = this.game.playerManager;

        this.game.ctx.drawImage(this.game.assetsManager.images.upgradeButton, this.x, this.y, this.width, this.height);

        if (this.building.buildingId === 0 || this.building.lvl < this.game.buildingsManager.buildings[0].lvl) {
            if (this.cost !== undefined) {
                this.game.ctx.beginPath();
                this.game.ctx.fillStyle = "rgba(255, 255, 0, 0.2)";
                this.game.ctx.rect(this.x, this.y - this.height / 1.5, this.width, this.height / 1.5);
                this.game.ctx.fill();

                this.game.strokeText("Ulepsz", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
                this.game.writeText("Ulepsz", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);

                this.game.ctx.drawImage(this.game.assetsManager.images.woodIcon, textX, this.iconY, this.height / 2, this.height / 2);
                textX += this.height / 2 + this.offset * 2;

                this.game.strokeText(this.cost.wood, textX, this.y - this.height / 3, this.height / 2, "#000", "left");
                let woodSize = this.game.writeText(
                    this.cost.wood,
                    textX,
                    this.y - this.height / 3,
                    this.height / 2,
                    player.wood >= this.cost.wood ? "#0f0" : "#f00",
                    "left"
                );
                textX += woodSize.sizes[0].width + this.offset * 2;

                this.game.ctx.drawImage(this.game.assetsManager.images.stoneIcon, textX, this.iconY, this.height / 2, this.height / 2);
                textX += this.height / 2 + this.offset * 2;

                this.game.strokeText(this.cost.stone, textX, this.y - this.height / 3, this.height / 2, "#000", "left");
                let stoneSize = this.game.writeText(
                    this.cost.stone,
                    textX,
                    this.y - this.height / 3,
                    this.height / 2,
                    player.stone >= this.cost.stone ? "#0f0" : "#f00",
                    "left"
                );
                textX += stoneSize.sizes[0].width + this.offset * 2;

                this.game.ctx.drawImage(this.game.assetsManager.images.goldIcon, textX, this.iconY, this.height / 2, this.height / 2);
                textX += this.height / 2 + this.offset * 2;

                this.game.strokeText(this.cost.gold, textX, this.y - this.height / 3, this.height / 2, "#000", "left");
                let goldSize = this.game.writeText(
                    this.cost.gold,
                    textX,
                    this.y - this.height / 3,
                    this.height / 2,
                    player.gold >= this.cost.gold ? "#0f0" : "#f00",
                    "left"
                );
                textX += goldSize.sizes[0].width + this.offset * 2;
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

export { BackButton, UpgradeButton };
