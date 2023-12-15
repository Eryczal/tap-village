import { Button } from "../../../_elements/Button.js";
import { architectObjects } from "../../../../data/architectObjects.js";

class ArchitectShopButton extends Button {
    constructor(game, x, y, width, height, parent) {
        let cost = architectObjects[parent.id].cost;
        super(game, x, y, width, height, parent, `%i0 ${cost.wood} %i1 ${cost.stone} %i2 ${cost.gold}`, ["woodIcon", "stoneIcon", "goldIcon"], height / 2, 3);

        if (!this.hasLvl()) {
            this.color = "#ccc";
            this.notAllowedText = `Wymaga ${architectObjects[this.parent.id].minLvl} poziomu`;
        }

        this.colors = [
            this.game.playerManager.wood >= architectObjects[this.parent.id].cost.wood ? "#3f3" : "#f33",
            this.game.playerManager.stone >= architectObjects[this.parent.id].cost.stone ? "#3f3" : "#f33",
            this.game.playerManager.gold >= architectObjects[this.parent.id].cost.gold ? "#3f3" : "#f33",
        ];

        this.clickable = this.canBuy() && this.hasLvl();
    }

    draw() {
        if (this.hasLvl()) {
            this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);

            this.elements.forEach((element, i) => {
                if (typeof element.value === "string") {
                    this.game.strokeText(element.value, this.x + element.x, this.y + this.height / 2, this.size, this.sColor, "left");
                    this.game.writeText(element.value, this.x + element.x, this.y + this.height / 2, this.size, this.colors[Math.floor(i / 2)], "left");
                } else {
                    this.game.ctx.drawImage(element.value, this.x + element.x, this.y + this.height * 0.2, this.height * 0.6, this.height * 0.6);
                }
            });
        } else {
            super.draw();
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.canBuy() && this.hasLvl()) {
            this.game.sceneManager.changeScene("main", { placeObject: true, objectId: this.parent.id });
            this.game.assetsManager.playAudio("click2", true);
        }
    }

    canBuy() {
        return (
            this.game.playerManager.wood >= architectObjects[this.parent.id].cost.wood &&
            this.game.playerManager.stone >= architectObjects[this.parent.id].cost.stone &&
            this.game.playerManager.gold >= architectObjects[this.parent.id].cost.gold
        );
    }

    hasLvl() {
        return this.game.buildingsManager.clickedBuilding.lvl >= architectObjects[this.parent.id].minLvl;
    }
}

export { ArchitectShopButton };
