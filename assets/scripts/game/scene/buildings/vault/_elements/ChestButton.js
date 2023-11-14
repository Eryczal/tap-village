import { BuyButton } from "../../../_elements/BuyButton.js";
import { chests } from "../../../../data/chests.js";

class ChestButton extends BuyButton {
    constructor(game, x, y, width, height, parent) {
        super(game, x, y, width, height, parent, `${chests[parent.id].cost - game.buildingsManager.clickedBuilding.lvl} %i0`, ["coinIcon"]);

        this.clickable = this.canBuy();

        if (this.canBuy()) {
            this.color = "#3f3";
        } else {
            this.color = "#f33";
        }

        this.scroll = this.parent.scroll;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.canBuy()) {
            this.game.playerManager.coin -= chests[this.parent.id].cost - this.game.buildingsManager.clickedBuilding.lvl;

            this.game.sceneManager.changeScene("chest", {
                id: this.parent.id,
            });
        }
    }

    onRightClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.game.playerManager.gem === "max") {
            this.game.sceneManager.changeScene("chest", {
                id: this.parent.id,
            });
        }
    }

    canBuy() {
        return this.game.playerManager.coin >= chests[this.parent.id].cost - this.game.buildingsManager.clickedBuilding.lvl;
    }
}

export { ChestButton };
