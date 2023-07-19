import { Element } from "../element/Element.js";

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
		this.buildings.push(new Building(this.game, buildingId, posX, posY));
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

export { BuildingsManager };
