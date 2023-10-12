import { BuildingScene } from "../BuildingScene.js";
import { Offers } from "./_elements/Offers.js";

class TraderScene extends BuildingScene {
	constructor(game) {
		super(game);
	}

	initChild(menu) {
		this.elementsHolder.addElement("Offers", new Offers(this.game, menu));
	}

	init() {
		super.init();
	}
}

export { TraderScene };
