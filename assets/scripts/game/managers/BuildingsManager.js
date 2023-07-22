import { Element } from "../element/Element.js";
import { buildings } from "../scene/shop/elements/buildings.js";

class Building extends Element {
	constructor(game, buildingId, posX, posY) {
		super(game);

		this.buildingId = buildingId;
		this.posX = posX;
		this.posY = posY;
		this.lvl = 1;
		this.clickable = true;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			return true;
		}
	}
}

class SawmillBuilding extends Building {
	static stats = {};
	static statsCost = {};

	constructor(game, buildingId, posX, posY, stats, statsCost) {
		super(game, buildingId, posX, posY);

		let pStats = JSON.parse(JSON.stringify(stats));

		this.workers = pStats.workers;
		this.workersSpeed = pStats.workersSpeed;

		if (Object.keys(SawmillBuilding.stats).length === 0) {
			SawmillBuilding.stats = pStats;
			delete SawmillBuilding.stats.workers;
			delete SawmillBuilding.stats.workersSpeed;
		}

		let pStatsCost = JSON.parse(JSON.stringify(statsCost));

		this.workersCost = pStatsCost.workers;
		this.workersSpeedCost = pStatsCost.workersSpeed;

		if (Object.keys(SawmillBuilding.statsCost).length === 0) {
			SawmillBuilding.statsCost = pStatsCost;
			delete SawmillBuilding.statsCost.workers;
			delete SawmillBuilding.statsCost.workersSpeed;
		}
	}
}

class BuildingsManager {
	constructor(game) {
		this.game = game;
		this.buildings = [];
		this.clickedBuilding;
	}

	init() {}

	countBuilding(id) {
		let count = 0;

		for (let building of this.buildings) {
			if (building.buildingId === id) {
				count++;
			}
		}

		if (this.game.constructionManager.constructionState === 1) {
			if (this.game.constructionManager.buildingId === id) {
				count++;
			}
		}

		return count;
	}

	addBuilding(buildingId, posX, posY) {
		switch (buildingId) {
			case 1:
				this.buildings.push(new SawmillBuilding(this.game, buildingId, posX, posY, buildings[buildingId].stats, buildings[buildingId].statsCost));
				console.log(SawmillBuilding.stats);
				break;

			default:
				this.buildings.push(new Building(this.game, buildingId, posX, posY));
				break;
		}
	}

	onClick(mouseX, mouseY) {
		for (let i = 0; i < this.buildings.length; i++) {
			if (this.buildings[i].onClick(mouseX, mouseY)) {
				this.clickedBuilding = this.buildings[i];
				this.game.sceneManager.changeScene("building");
				return true;
			}
		}
	}
}

export { BuildingsManager, SawmillBuilding };
