import { buildings } from "../../../data/buildings.js";
import { Element } from "../../../element/Element.js";

class BuildingName extends Element {
	constructor(game, menu) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;
		this.SCREEN_SIZE = this.game.canvas.width - this.MENU_SIZE;
	}

	draw() {
		let building = this.game.buildingsManager.clickedBuilding;

		console.log(building.image + "Background");
		this.game.ctx.drawImage(
			this.game.assetsManager.images[buildings[building.buildingId].image + "Background"],
			this.MENU_SIZE,
			0,
			this.SCREEN_SIZE,
			this.game.canvas.height
		);
		this.game.writeText(buildings[building.buildingId].name, this.SCREEN_SIZE / 2 + this.MENU_SIZE, this.game.canvas.height / 16, this.game.canvas.height / 16);
		this.game.writeText("Poziom " + building.lvl, this.SCREEN_SIZE / 2 + this.MENU_SIZE, this.game.canvas.height / 9, this.game.canvas.height / 27);
	}
}

export { BuildingName };
