import { Scene } from "../Scene.js";
import { BuildingName } from "./elements/BuildingName.js";
import { BackButton, UpgradeButton } from "./elements/Buttons.js";
import { Menu } from "../elements/Menu.js";
import { Wood, Stone, Gold, Gem } from "../elements/Resources.js";

class BuildingScene extends Scene {
	constructor(game) {
		super(game);
	}

	init() {
		let menu = new Menu(this.game, "open");
		this.elementsHolder.addElement("menu", menu);
		this.elementsHolder.addElement("wood", new Wood(this.game));
		this.elementsHolder.addElement("stone", new Stone(this.game));
		this.elementsHolder.addElement("gold", new Gold(this.game));
		this.elementsHolder.addElement("gem", new Gem(this.game));

		this.elementsHolder.addElement("BuildingName", new BuildingName(this.game, menu));

		this.game.buildingsManager.clickedBuilding.init();

		this.initChild(menu);

		this.elementsHolder.addElement("UpgradeButton", new UpgradeButton(this.game, menu));
		this.elementsHolder.addElement("BackButton", new BackButton(this.game, menu));

		super.init();
	}

	initChild(menu) {}

	reloadButtons(menu) {
		this.elementsHolder.removeElement("UpgradeButton");
		this.elementsHolder.removeElement("BackButton");

		this.elementsHolder.addElement("UpgradeButton", new UpgradeButton(this.game, menu));
		this.elementsHolder.addElement("BackButton", new BackButton(this.game, menu));
	}
}

export { BuildingScene };
