import { Scene } from "../Scene.js";
import { BuildingBackground } from "./elements/BuildingBackground.js";
import { BuildingName } from "./elements/BuildingName.js";
import { BackButton, UpgradeButton } from "./elements/Buttons.js";
import { Menu } from "../elements/Menu.js";
import { Wood, Stone, Gold, Gem } from "../elements/Resources.js";
import { Stats } from "./elements/0/Stats.js";
import { RemoveProgress, RemoveAccount } from "./elements/0/RemoveButtons.js";

class BuildingScene extends Scene {
	constructor(game) {
		super(game);
	}

	init() {
		let menu = new Menu(this.game, "open");
		this.elementsHolder.addElement("BuildingBackground", new BuildingBackground(this.game, menu));
		this.elementsHolder.addElement("menu", menu);
		this.elementsHolder.addElement("wood", new Wood(this.game));
		this.elementsHolder.addElement("stone", new Stone(this.game));
		this.elementsHolder.addElement("gold", new Gold(this.game));
		this.elementsHolder.addElement("gem", new Gem(this.game));

		switch (this.game.buildingsManager.clickedBuilding.buildingId) {
			case 0:
				this.elementsHolder.addElement("Stats", new Stats(this.game));
				this.elementsHolder.addElement("RemoveProgress", new RemoveProgress(this.game));
				this.elementsHolder.addElement("RemoveAccount", new RemoveAccount(this.game));
				break;
		}

		this.elementsHolder.addElement("BuildingName", new BuildingName(this.game, menu));
		this.elementsHolder.addElement("UpgradeButton", new UpgradeButton(this.game, menu));
		this.elementsHolder.addElement("BackButton", new BackButton(this.game, menu));

		super.init();
	}
}

export { BuildingScene };
