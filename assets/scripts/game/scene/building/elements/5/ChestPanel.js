import { Element } from "../../../../element/Element.js";
import { chests } from "../../../../data/chests.js";
import { Chest } from "./Chest.js";

class ChestPanel extends Element {
	constructor(game, menu) {
		super(game);

		this.menu = menu;
		this.MENU_SIZE = menu.MENU_SIZE;
		this.scroll = 0;
		this.chests = [];
		this.chestSizes = [];
	}

	init() {
		for (let i = 0; i < chests.length; i++) {
			this.chests[i] = new Chest(this.game, this.menu, i, this);
		}
	}

	onScroll(event) {
		console.log("scrolling");
		let sum = this.chestSizes.slice(0, -1).reduce((a, b) => a + b + 200, 200);

		this.scroll += event.deltaY;
		this.scroll = Math.min(Math.max(0, this.scroll), sum);

		for (let i = 0; i < chests.length; i++) {
			this.chests[i].updateScroll(this.scroll);
		}
	}

	draw() {
		for (let i = 0; i < this.chests.length; i++) {
			this.chests[i].draw();
		}
	}
}

export { ChestPanel };
