import { buildings } from "../scene/shop/elements/BuildingsShop.js";

class ConstructionManager {
	constructor(game) {
		this.game = game;
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
	}

	addProgress(progress) {
		this.clickProgress += progress;

		if (this.clickProgress >= buildings[this.buildingId].clicks) {
			this.game.buildingsManager.addBuilding(this.buildingId, this.constructionX, this.constructionY);
			this.constructionState = null;
		}
	}

	isClicked(tileX, tileY) {
		return !(
			this.constructionY + buildings[this.buildingId].size.y < tileY ||
			this.constructionY > tileY ||
			this.constructionX + buildings[this.buildingId].size.x < tileX ||
			this.constructionX > tileX
		);
	}
}

export { ConstructionManager };
