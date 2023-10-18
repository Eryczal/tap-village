import { Element } from "../../../element/Element.js";
import { ShopBuilding } from "./ShopBuilding.js";
import { buildings } from "../../../data/buildings.js";

class BuildingsShop extends Element {
	constructor(game, menu) {
		super(game);

		this.menu = menu;
		this.MENU_SIZE = menu.MENU_SIZE;
		this.MAX_PER_ROW = 4;
		this.SIZE = this.game.canvas.width - this.MENU_SIZE;
		this.OFFSET = this.SIZE * 0.05;
		this.scroll = 0;
		this.rows = [0];
	}

	init() {
		let column = 0;
		let row = 0;

		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image] = new ShopBuilding(this.game, this, i, column, row);
			column++;

			if (column > this.MAX_PER_ROW - 1) {
				column = 0;
				row++;

				this.rows[row] = 0;
			}
		}

		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].updatePosition();
		}
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.shop, this.MENU_SIZE, 0, this.SIZE, canvas.height);

		this.game.writeText("Budynki", this.SIZE / 2 + this.MENU_SIZE, this.SIZE / 24, this.SIZE / 24, "#000", "center", "top");

		this.game.ctx.save();
		this.game.ctx.beginPath();
		this.game.ctx.rect(this.MENU_SIZE + this.SIZE / 24, this.SIZE / 12, this.SIZE - this.SIZE / 12, this.game.canvas.height - this.SIZE / 8);
		this.game.ctx.clip();

		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].draw();
		}

		this.game.ctx.restore();
	}

	onHover(mouseX, mouseY) {
		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].onHover(mouseX, mouseY);
		}
	}

	onClick(mouseX, mouseY) {
		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].onClick(mouseX, mouseY);
		}
	}

	onRightClick(mouseX, mouseY) {
		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].onRightClick(mouseX, mouseY);
		}
	}

	onScroll(event) {
		let sum = this.rows.slice(0, -1).reduce((a, b) => a + b + 200, 200);

		this.scroll += event.deltaY;
		this.scroll = Math.min(Math.max(0, this.scroll), sum);

		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].updateScroll(this.scroll);
		}
	}

	onResize() {
		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].onResize();
		}
		this.MENU_SIZE = this.menu.MENU_SIZE;
	}
}

export { BuildingsShop };
