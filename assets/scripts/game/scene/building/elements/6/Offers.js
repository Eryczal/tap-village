import { Element } from "../../../../element/Element.js";

class Offers extends Element {
	constructor(game) {
		super(game);
	}

	draw() {
		console.log(this.game.buildingsManager.clickedBuilding.offers);
	}
}

export { Offers };
