import { Element } from "../../../../element/Element";
import { chests } from "../../../../data/chests.js";

class ChestPanel extends Element {
	constructor(game, menu) {
		super(game);

		this.menu = menu;
		this.MENU_SIZE = menu.MENU_SIZE;
	}

	init() {
		for (let i = 0; i < chests.length; i++) {
			this.chests[i] = new Chest(this.game, this.menu, i);
		}
	}
}
