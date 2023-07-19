import { buildings } from "../../shop/elements/BuildingsShop.js";
import { Element } from "../../../element/Element.js";

class BuildingName extends Element {
	constructor(game) {
		super(game);
	}

	draw() {
		let building = this.game.buildingsManager.clickedBuilding;
		this.game.writeText(buildings[building.buildingId].name, canvas.width / 2, 56, 56);
		this.game.writeText("Poziom " + building.lvl, canvas.width / 2, 100, 40);
	}
}

export { BuildingName };
