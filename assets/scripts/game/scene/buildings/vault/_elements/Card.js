import { Element } from "../../../../element/Element.js";
import { cards } from "../../../../data/cards.js";

class Card extends Element {
	constructor(game, parent, id, column, row) {
		super(game);

		this.parent = parent;
		this.scroll = parent.scroll;

		this.id = id;
		this.column = column;
		this.row = row;
		this.size = this.parent.SIZE / this.parent.MAX_PER_ROW;
		this.x = (this.parent.SIZE / this.parent.MAX_PER_ROW) * this.column + this.parent.MENU_SIZE;
		this.y = this.row * this.size + 200;

		this.ICON_SIZE = this.size * 0.8;

		this.clickable = true;
	}

	updateScroll(scroll) {
		this.scroll = scroll;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.woodChanceCard, this.x + this.size / 10, this.y - this.scroll, this.ICON_SIZE, this.ICON_SIZE); //add cards images
	}

	onClick(mouseX, mouseY) {}

	onRightClick(mouseX, mouseY) {}
}

export { Card };
