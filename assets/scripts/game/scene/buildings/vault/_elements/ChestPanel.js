import { Element } from "../../../../element/Element.js";
import { chests } from "../../../../data/chests.js";
import { Chest } from "./Chest.js";

class ChestPanel extends Element {
	constructor(game, menu) {
		super(game);

		this.menu = menu;
		this.MENU_SIZE = menu.MENU_SIZE;
		this.SIZE = this.game.canvas.width - this.MENU_SIZE;
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
		let sum = this.chestSizes.slice(0, -1).reduce((a, b) => a + b + 200, 200);

		this.scroll += event.deltaY;
		this.scroll = Math.min(Math.max(0, this.scroll), sum);

		for (let i = 0; i < this.chests.length; i++) {
			this.chests[i].updateScroll(this.scroll);
		}
	}

	draw() {
		this.game.ctx.save();
		this.game.ctx.beginPath();
		this.game.ctx.rect(this.MENU_SIZE + this.SIZE / 24, this.SIZE / 12, this.SIZE - this.SIZE / 12, this.game.canvas.height - this.SIZE / 8);
		this.game.ctx.clip();

		for (let i = 0; i < this.chests.length; i++) {
			this.chests[i].draw();
		}

		this.game.ctx.restore();
	}

	onClick(mouseX, mouseY) {
		for (let i = 0; i < this.chests.length; i++) {
			this.chests[i].onClick(mouseX, mouseY);
		}
	}

	onRightClick(mouseX, mouseY) {
		for (let i = 0; i < this.chests.length; i++) {
			this.chests[i].onRightClick(mouseX, mouseY);
		}
	}
}

export { ChestPanel };
