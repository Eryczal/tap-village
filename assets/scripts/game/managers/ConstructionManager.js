import { buildings } from "../scene/shop/elements/BuildingsShop.js";
import { Element } from "../element/Element.js";
import { map } from "../scene/main/elements/Map.js";

class ConstructionManager extends Element {
	constructor(game) {
		super(game);

		this.constructionState = null;
	}

	init() {}

	setConstruction(buildingId) {
		this.buildingId = buildingId;
		this.constructionState = 0;
	}

	setBuild(posX, posY) {
		this.constructionState = 1;
		this.constructionX = posX;
		this.constructionY = posY;
		this.clickProgress = 0;
		this.clickable = true;

		for (let y = posY; y < posY + buildings[this.buildingId].size.y; y++) {
			for (let x = posX; x < posX + buildings[this.buildingId].size.x; x++) {
				map[y][x] = 5;
			}
		}
	}

	addProgress(progress) {
		this.clickProgress += progress;

		if (this.clickProgress >= buildings[this.buildingId].clicks) {
			this.game.buildingsManager.addBuilding(this.buildingId, this.constructionX, this.constructionY);
			this.constructionState = null;
			this.clickable = false;
		}
	}
}

export { ConstructionManager };
