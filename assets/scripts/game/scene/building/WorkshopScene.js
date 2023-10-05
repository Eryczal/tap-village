import { BuildingScene } from "./BuildingScene.js";
import { BuildingPower, CriticChance, CriticPower, Workers, WorkersSpeed } from "./elements/ClickingUpgrades.js";

class WorkshopScene extends BuildingScene {
	constructor(game) {
		super(game);
	}

	initChild(menu) {
		this.elementsHolder.addElement("BuildingPower", new BuildingPower(this.game, menu));
		this.elementsHolder.addElement("CriticPower", new CriticPower(this.game, menu));
		this.elementsHolder.addElement("CriticChance", new CriticChance(this.game, menu));
		this.elementsHolder.addElement("Workers", new Workers(this.game, menu));
		this.elementsHolder.addElement("WorkersSpeed", new WorkersSpeed(this.game, menu));
	}

	init() {
		super.init();
	}
}

export { WorkshopScene };
