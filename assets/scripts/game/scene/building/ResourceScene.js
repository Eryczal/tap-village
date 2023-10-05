import { BuildingScene } from "./BuildingScene.js";
import { SawmillClick } from "./elements/1/SawmillClick.js";
import { GatheringChance, GatheringPower, CriticChance, CriticPower, Workers, WorkersSpeed } from "./elements/ClickingUpgrades.js";
import { QuarryClick } from "./elements/2/QuarryClick.js";
import { MineClick } from "./elements/3/MineClick.js";

class ResourceScene extends BuildingScene {
	constructor(game) {
		super(game);
	}

	initChild(menu) {
		switch (this.game.buildingsManager.clickedBuilding.buildingId) {
			case 1:
				this.elementsHolder.addElement("BuildingClick", new SawmillClick(this.game, menu));
				break;

			case 2:
				this.elementsHolder.addElement("BuildingClick", new QuarryClick(this.game, menu));
				break;

			case 3:
				this.elementsHolder.addElement("BuildingClick", new MineClick(this.game, menu));
				break;
		}
		this.elementsHolder.addElement("GatheringPower", new GatheringPower(this.game, menu));
		this.elementsHolder.addElement("GatheringChance", new GatheringChance(this.game, menu));
		this.elementsHolder.addElement("CriticPower", new CriticPower(this.game, menu));
		this.elementsHolder.addElement("CriticChance", new CriticChance(this.game, menu));
		this.elementsHolder.addElement("Workers", new Workers(this.game, menu));
		this.elementsHolder.addElement("WorkersSpeed", new WorkersSpeed(this.game, menu));
	}

	init() {
		super.init();
	}
}

export { ResourceScene };
