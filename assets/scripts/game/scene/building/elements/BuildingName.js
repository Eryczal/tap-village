import { buildings } from "../../shop/elements/buildings.js";
import { Element } from "../../../element/Element.js";

class BuildingName extends Element {
	constructor(game, menu) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;
	}

	draw() {
		let building = this.game.buildingsManager.clickedBuilding;
		this.game.writeText(buildings[building.buildingId].name, (canvas.width - this.MENU_SIZE) / 2 + this.MENU_SIZE, 56, 56);
		this.game.writeText("Poziom " + building.lvl, (canvas.width - this.MENU_SIZE) / 2 + this.MENU_SIZE, 100, 40);
	}
}

export { BuildingName };
