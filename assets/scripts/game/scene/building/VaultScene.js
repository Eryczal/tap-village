import { BuildingScene } from "./BuildingScene.js";
import { ChestsButton, CardsButton } from "./elements/5/VaultMenu.js";

class VaultScene extends BuildingScene {
	constructor(game) {
		super(game);
	}

	initChild(menu) {
		switch (this.game.buildingsManager.clickedBuilding.menu) {
			case 0:
				this.elementsHolder.addElement("ChestsButton", new ChestsButton(this.game, menu));
				this.elementsHolder.addElement("CardsButton", new CardsButton(this.game, menu));
				break;
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
		}

		this.game.buildingsManager.clickedBuilding.menu = menu;

		//this.initChild(menu?)?
	}
}

export { VaultScene };
