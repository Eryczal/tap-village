import { BuyButton } from "../../../_elements/BuyButton.js";
import { architectObjects } from "../../../../data/architectObjects.js";

class ArchitectShopButton extends BuyButton {
    constructor(game, x, y, width, height, parent) {
        let cost = architectObjects[parent.id].cost;
        super(game, x, y, width, height, parent, `%i0 ${cost.wood}   %i1 ${cost.stone}   %i2 ${cost.gold}`, ["woodIcon", "stoneIcon", "goldIcon"], height / 2);

        if (!this.hasLvl()) {
            this.color = "#ccc";
            this.notAllowedText = "Wymaga ulepszenia budynku";
        } else if (this.canBuy()) {
            this.color = "#3f3";
        } else {
            this.color = "#f33";
        }

        this.clickable = this.canBuy() && this.hasLvl();
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
