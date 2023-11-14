import { BuyButton } from "../../_elements/BuyButton.js";
import { resources } from "../../../data/resources.js";

class ResourceShopButton extends BuyButton {
    constructor(game, x, y, width, height, parent) {
        super(game, x, y, width, height, parent, `${resources[parent.resourceId].cost} %i0`, ["gemIcon"]);

        if (this.canBuy()) {
            this.color = "#3f3";
        } else {
            this.color = "#f33";
        }

        this.clickable = this.canBuy();
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && (this.canBuy() || this.game.playerManager.gem === "max")) {
            if (this.game.playerManager.gem !== "max") {
                this.game.playerManager.gem -= resources[this.parent.resourceId].cost;
            }

            switch (this.parent.type) {
                case 0:
                    this.game.playerManager.wood += this.parent.amount;
                    break;

                case 1:
                    this.game.playerManager.stone += this.parent.amount;
                    break;

                case 2:
                    this.game.playerManager.gold += this.parent.amount;
                    break;

                case 3:
                    this.game.playerManager.wood += this.parent.amount[0];
                    this.game.playerManager.stone += this.parent.amount[1];
                    this.game.playerManager.gold += this.parent.amount[2];
                    break;
            }

            this.game.playerManager.updatePlayerData("player");
        }
    }

    canBuy() {
        return this.game.playerManager.gem >= resources[this.parent.resourceId].cost;
    }
}

export { ResourceShopButton };
