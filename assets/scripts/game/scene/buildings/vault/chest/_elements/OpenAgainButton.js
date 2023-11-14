import { BuyButton } from "../../../../_elements/BuyButton.js";
import { chests } from "../../../../../data/chests.js";

class OpenAgainButton extends BuyButton {
    constructor(game, x, y, width, height, parent) {
        super(game, x, y, width, height, parent, `Otwórz ( ${chests[parent.chestId].cost - game.buildingsManager.clickedBuilding.lvl} %i0 )`, ["coinIcon"]);

        this.clickable = this.canBuy();

        if (this.canBuy()) {
            this.color = "#fff";
        } else {
            this.color = "#f33";
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.canBuy()) {
            this.game.playerManager.coin -= chests[this.parent.chestId].cost - this.game.buildingsManager.clickedBuilding.lvl;

            this.parent.openAgain();
        }
    }

    onRightClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.game.playerManager.gem === "max") {
            this.parent.openAgain();
        }
    }

    canBuy() {
        return this.game.playerManager.coin >= chests[this.parent.chestId].cost - this.game.buildingsManager.clickedBuilding.lvl;
    }
}

class ChestReturnButton extends BuyButton {
    constructor(game, x, y, width, height, parent) {
        super(game, x, y, width, height, parent, "Powrót");

        this.clickable = true;

        this.color = "#fff";
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.sceneManager.changeScene("vault");
            this.game.sceneManager.currentScene.changeMenu(1);
        }
    }
}

export { OpenAgainButton, ChestReturnButton };
