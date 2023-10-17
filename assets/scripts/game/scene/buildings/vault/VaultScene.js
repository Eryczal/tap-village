import { BuildingScene } from "../BuildingScene.js";
import { CardPanel } from "./_elements/CardPanel.js";
import { ChestPanel } from "./_elements/ChestPanel.js";
import { ChestsButton, CardsButton } from "./_elements/VaultMenu.js";

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

			case 2:
				this.elementsHolder.addElement("CardPanel", new CardPanel(this.game, menu), init);
				break;
		}

		if (init) {
			this.reloadButtons(this.menu, this.game.buildingsManager.clickedBuilding.menu);
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

			case 2:
				this.elementsHolder.removeElement("CardPanel");
				break;
		}

		this.game.buildingsManager.clickedBuilding.menu = menu;

		this.initChild(menu, true);
	}
}

export { VaultScene };
