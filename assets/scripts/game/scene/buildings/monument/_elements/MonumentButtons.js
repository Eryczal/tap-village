import { BuyButton } from "../../../_elements/BuyButton.js";

class TakeGemsButton extends BuyButton {
    constructor(game, menu) {
        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 + menu.MENU_SIZE + game.canvas.width * 0.15,
            game.canvas.height - game.canvas.height / 8,
            game.canvas.width / 4,
            game.canvas.width / 24,
            false,
            `Zbierz klejnoty ( ${game.buildingsManager.clickedBuilding.storedGems} %i0 )`,
            ["gemIcon"],
            game.canvas.width / 48,
            3
        );

        this.MENU_SIZE = menu.MENU_SIZE;

        this.building = this.game.buildingsManager.clickedBuilding;
        this.color = "#fff";

        this.clickable = this.game.buildingsManager.clickedBuilding.storedGems > 0;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.game.buildingsManager.clickedBuilding.storedGems > 0) {
            this.game.buildingsManager.clickedBuilding.takeGems();
            this.updateText(`Zbierz klejnoty ( ${game.buildingsManager.clickedBuilding.storedGems} %i0 )`, ["gemIcon"]);
        }
    }
}

class SacrificeButton extends BuyButton {
    constructor(game, menu) {
        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 + menu.MENU_SIZE + game.canvas.width * 0.15,
            game.canvas.height - game.canvas.height / 8 - game.canvas.width / 20,
            game.canvas.width / 4,
            game.canvas.width / 24,
            false,
            "Złóż ofiarę",
            false,
            game.canvas.width / 48,
            3
        );

        this.MENU_SIZE = menu.MENU_SIZE;

        this.building = this.game.buildingsManager.clickedBuilding;

        this.sacrificeCost = new SacrificeCost(game, this);

        this.clickable = this.canBuy() && this.hasLvl();
        if (this.hasLvl()) {
            this.color = "#fff";
        } else {
            this.text = "Wymaga ulepszenia budynku";
        }
    }

    unload() {
        this.sacrificeCost.unload();
    }

    draw() {
        if (this.hasLvl()) {
            this.sacrificeCost.draw();
        }
        super.draw();
    }

    canBuy() {
        return (
            this.game.playerManager.wood >= this.building.prestigeObject.cost &&
            this.game.playerManager.stone >= this.building.prestigeObject.cost &&
            this.game.playerManager.gold >= this.building.prestigeObject.cost
        );
    }

    hasLvl() {
        return this.game.buildingsManager.clickedBuilding.lvl >= this.building.prestigeObject.buildingLvl;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.canBuy() && this.hasLvl()) {
                this.game.playerManager.wood -= this.building.prestigeObject.cost;
                this.game.playerManager.stone -= this.building.prestigeObject.cost;
                this.game.playerManager.gold -= this.building.prestigeObject.cost;

                this.building.addPrestige();

                this.clickable = this.canBuy() && this.hasLvl();
                if (this.hasLvl()) {
                    this.color = "#fff";
                } else {
                    this.color = "#ccc";
                    this.text = "Wymaga ulepszenia budynku";
                }
            }
        }
    }
}

class SacrificeCost extends BuyButton {
    constructor(game, parent) {
        super(
            game,
            parent.x,
            parent.y - parent.height * 0.7,
            parent.width,
            parent.height * 0.7,
            parent,
            `%i0 ${parent.building.prestigeObject.cost} %i1 ${parent.building.prestigeObject.cost} %i2 ${parent.building.prestigeObject.cost}`,
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
            this.game.playerManager.wood >= this.parent.building.prestigeObject.cost ? "#3f3" : "#f33",
            this.game.playerManager.stone >= this.parent.building.prestigeObject.cost ? "#3f3" : "#f33",
            this.game.playerManager.gold >= this.parent.building.prestigeObject.cost ? "#3f3" : "#f33",
        ];

        this.updateTimeout = setTimeout(() => {
            this.updateColors();
        }, 1000);
    }
}

export { TakeGemsButton, SacrificeButton };
