import { BuyButton } from "../../../_elements/BuyButton.js";
import { chests } from "../../../../data/chests.js";

class ChestButton extends BuyButton {
    constructor(game, x, y, width, height, parent) {
        super(game, x, y, width, height, parent);

        this.clickable = this.canBuy();

        if (this.canBuy()) {
            this.color = "#fff";
        } else {
            this.color = "#f33";
        }

        this.text = chests[this.parent.id].cost;

        this.scroll = this.parent.scroll;

        this.resource = {
            x: this.x + this.width / 2,
            iY: this.y + this.height / 4,
            y: this.y + this.height / 4 + this.scroll,
            width: this.height / 2,
            height: this.height / 2,
        };

        this.resource.x -= (this.resource.width * 1.2 + this.game.writeText(this.text, 0, 0, this.height * 0.8, "transparent").sizes[0].width) / 2;
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
        this.game.ctx.drawImage(this.game.assetsManager.images.coinIcon, this.resource.x, this.resource.y, this.resource.width, this.resource.height);
        this.game.strokeText(this.text, this.resource.x + this.resource.width * 1.2, this.y + this.height / 2, this.height * 0.8, "#000", "left");
        this.game.writeText(this.text, this.resource.x + this.resource.width * 1.2, this.y + this.height / 2, this.height * 0.8, this.color, "left");
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY) && this.canBuy()) {
            this.game.playerManager.coin -= chests[this.parent.id].cost;

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
        return this.game.playerManager.coin >= chests[this.parent.id].cost;
    }
}

export { ChestButton };
