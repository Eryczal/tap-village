import { BuyButton } from "../../_elements/BuyButton.js";
import { buildings } from "../../../data/buildings.js";

class BuildingShopButton extends BuyButton {
	constructor(game, x, y, width, height, parent) {
		super(game, x, y, width, height, parent);

		if (this.canBuy()) {
			this.color = "#000";
		} else {
			this.color = "#999";
		}

		this.clickable = this.canBuy();

		this.text = this.game.buildingsManager.countBuilding(parent.id) < buildings[parent.id].maxOnMap ? "Kup" : "Maksymalna ilość";
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY) && this.canBuy()) {
			if (this.game.constructionManager.constructionState === null) {
				let building = buildings[this.parent.id];
				if (this.parent.id === 0 || this.game.buildingsManager.countBuilding(0) === 1) {
					this.game.playerManager.wood -= building.cost.wood;
					this.game.playerManager.stone -= building.cost.stone;
					this.game.playerManager.gold -= building.cost.gold;

					this.game.constructionManager.setConstruction(building.id);
					this.game.sceneManager.changeScene("main");
				}
			}
		}
	}

	onRightClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY) && this.game.playerManager.gem === "max") {
			if (this.game.constructionManager.constructionState === null) {
				let building = buildings[this.parent.id];
				this.game.constructionManager.setConstruction(building.id);
				this.game.sceneManager.changeScene("main");
			}
		}
	}

	canBuy() {
		return (
			this.game.playerManager.wood >= buildings[this.parent.id].cost.wood &&
			this.game.playerManager.stone >= buildings[this.parent.id].cost.stone &&
			this.game.playerManager.gold >= buildings[this.parent.id].cost.gold &&
			!this.isMaxed()
		);
	}

	isMaxed() {
		return this.game.buildingsManager.countBuilding(this.parent.id) >= buildings[this.parent.id].maxOnMap;
	}
}

export { BuildingShopButton };
