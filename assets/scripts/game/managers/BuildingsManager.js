import { buildings } from "../scene/shop/elements/BuildingsShop.js";

class BuildingsManager {
	constructor(game) {
		this.game = game;
		this.buildings = [];
	}

	init() {}

	addBuilding(buildingId, posX, posY) {
		this.buildings.push({
			buildingId,
			posX,
			posY,
			lvl: 1,
		});
	}

	isClicked(tileX, tileY) {
		return !(
			this.constructionY + buildings[this.buildingId.size.y] < tileY ||
			this.constructionY > tileY ||
			this.constructionX + buildings[this.buildingId.size.x] < tileX ||
			this.constructionX > tileX
		);
	}
}

export { BuildingsManager };
