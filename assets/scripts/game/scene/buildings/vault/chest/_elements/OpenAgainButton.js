import { BuyButton } from "../../../../_elements/BuyButton.js";
import { chests } from "../../../../../data/chests.js";

class OpenAgainButton extends BuyButton {
	constructor(game, x, y, width, height, parent) {
		super(game, x, y, width, height, parent);

		this.clickable = this.canBuy();

		if (this.canBuy()) {
			this.color = "#999";
		} else {
			this.color = "#000";
		}

		this.text = "Otwórz ponownie";
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY) && this.canBuy()) {
			this.game.playerManager.coin -= chests[this.parent.chestId].cost;

			this.parent.openAgain();
		}
	}

	onRightClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY) && this.game.playerManager.gem === "max") {
			this.parent.openAgain();
		}
	}

	canBuy() {
		return this.game.playerManager.coin >= chests[this.parent.chestId].cost;
	}
}

export { OpenAgainButton };
