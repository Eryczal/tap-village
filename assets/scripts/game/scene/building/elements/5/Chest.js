import { Element } from "../../../../element/Element.js";
import { chests } from "../../../../data/chests.js";

class Chest extends Element {
	constructor(game, menu, id, parent) {
		super(game);

		this.menu = menu;
		this.MENU_SIZE = menu.MENU_SIZE;
		this.SIZE = this.game.canvas.width - menu.MENU_SIZE;
		this.id = id;
		this.parent = parent;
		this.scroll = this.parent.scroll;

		this.y = this.parent.chestSizes.slice(0, this.id).reduce((a, b) => a + b + 200, 200);
		this.x = this.MENU_SIZE + this.SIZE / 5;

		this.ICON_SIZE = this.SIZE / 10;
		this.HEADING_SIZE = this.SIZE / 20;
		this.TEXT_SIZE = this.SIZE / 40;

		this.description = this.game.wrapText(chests[this.id].description, this.SIZE / 2, this.TEXT_SIZE);

		this.DESCRIPTION_Y = this.y + this.HEADING_SIZE * 2;
		this.DESCRIPTION_HEIGHT =
			this.game.writeText(this.description, this.x + this.ICON_SIZE * 1.2, this.DESCRIPTION_Y - this.scroll, this.TEXT_SIZE, "transparent", "left", "top")
				.lines * this.TEXT_SIZE;

		this.height = this.HEADING_SIZE * 1.2 + this.DESCRIPTION_HEIGHT;

		this.parent.chestSizes[this.id] = this.height;
	}

	updateScroll(scroll) {
		this.scroll = scroll;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images[chests[this.id].image + "Chest"], this.x, this.y - this.scroll, this.ICON_SIZE, this.ICON_SIZE);

		this.game.writeText(chests[this.id].name, this.MENU_SIZE + this.SIZE / 2, this.y - this.scroll, this.HEADING_SIZE, "#000", "center", "top");
		this.game.writeText(this.description, this.x + this.ICON_SIZE * 1.2, this.DESCRIPTION_Y - this.scroll, this.TEXT_SIZE, "#000", "left", "top");
	}
}

export { Chest };
