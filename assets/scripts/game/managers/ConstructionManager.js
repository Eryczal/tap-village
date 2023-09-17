import { buildings } from "../data/buildings.js";
import { Element } from "../element/Element.js";
import { map } from "../scene/main/elements/Map.js";

class ConstructionManager extends Element {
	constructor(game) {
		super(game);

		this.constructionState = null;
	}

	init() {}

	setConstruction(buildingId, type = "build", building) {
		this.buildingId = buildingId;
		this.constructionType = type;
		this.constructionState = 0;
		if (building) {
			this.building = building;
			this.building.upgrading = true;
			this.building.clickable = false;
		}
	}

	setBuild(posX, posY) {
		this.constructionState = 1;
		this.constructionX = posX === undefined ? this.building.posX : posX;
		this.constructionY = posY === undefined ? this.building.posY : posY;
		this.clickProgress = 0;
		this.neededClicks =
			this.constructionType === "build" ? buildings[this.buildingId].clicks : buildings[this.buildingId].upgrades[this.building.lvl - 1].clicks;
		this.clickable = true;

		for (let y = posY; y < posY + buildings[this.buildingId].size.y; y++) {
			for (let x = posX; x < posX + buildings[this.buildingId].size.x; x++) {
				map[y][x] = 5;
			}
		}
	}

	addProgress(progress) {
		this.clickProgress += progress;

		if (this.clickProgress >= this.neededClicks) {
			if (this.constructionType == "build") {
				this.game.buildingsManager.addBuilding(this.buildingId, this.constructionX, this.constructionY);
			} else if (this.constructionType == "upgrade") {
				this.building.lvl++;
				this.building.upgrading = false;
				this.building.clickable = true;
			}
			this.constructionState = null;
			this.clickable = false;
		}
	}
}

export { ConstructionManager };
