import { BuildingScene } from "./BuildingScene.js";
import { ChestPanel } from "./elements/5/ChestPanel.js";
import { ChestsButton, CardsButton } from "./elements/5/VaultMenu.js";

class VaultScene extends BuildingScene {
	constructor(game) {
		super(game);
	}

	initChild(menu, init = false) {
		if (init === false) {
			this.menu = menu;
		} else {
			menu = this.menu;
		}
		switch (this.game.buildingsManager.clickedBuilding.menu) {
			case 0:
				this.elementsHolder.addElement("ChestsButton", new ChestsButton(this.game, menu), init);
				this.elementsHolder.addElement("CardsButton", new CardsButton(this.game, menu), init);
				break;

			case 1:
				this.elementsHolder.addElement("ChestPanel", new ChestPanel(this.game, menu), init);
				break;
		}

		if (init) {
			this.reloadButtons(this.menu);
		}
	}

	init() {
		super.init();
	}

	changeMenu(menu) {
		switch (this.game.buildingsManager.clickedBuilding.menu) {
			case 0:
				this.elementsHolder.removeElement("ChestsButton");
				this.elementsHolder.removeElement("CardsButton");
				break;

			case 1:
				this.elementsHolder.removeElement("ChestPanel");
				break;
		}

		this.game.buildingsManager.clickedBuilding.menu = menu;

		this.initChild(menu, true);
	}
}

export { VaultScene };
