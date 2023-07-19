import { Scene } from "../Scene.js";
import { BuildingName } from "./elements/BuildingName.js";
import { BackButton } from "./elements/BackButton.js";
import { Stats } from "./elements/0/Stats.js";
import { RemoveProgress, RemoveAccount } from "./elements/0/RemoveButtons.js";

class BuildingScene extends Scene {
	constructor(game) {
		super(game);
	}

	init() {
		switch (this.game.buildingsManager.clickedBuilding.buildingId) {
			case 0:
				this.elementsHolder.addElement("Stats", new Stats(this.game));
				this.elementsHolder.addElement("RemoveProgress", new RemoveProgress(this.game));
				this.elementsHolder.addElement("RemoveAccount", new RemoveAccount(this.game));
				break;
		}

		this.elementsHolder.addElement("BuildingName", new BuildingName(this.game));
		this.elementsHolder.addElement("BackButton", new BackButton(this.game));

		super.init();
	}
}

export { BuildingScene };
