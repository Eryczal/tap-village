import { Element } from "../../../element/Element.js";

class MapObject extends Element {
	constructor(game, parent, type, x, y, clicks, TILE_SIZE, MENU_SIZE) {
		super(game);

		this.parent = parent;

		this.id = y + "_" + x;

		this.type = type;
		this.tileX = x;
		this.tileY = y;

		this.TILE_SIZE = TILE_SIZE;
		this.MENU_SIZE = MENU_SIZE;

		this.x = x * TILE_SIZE + MENU_SIZE;
		this.y = y * TILE_SIZE;

		this.width = TILE_SIZE;
		this.height = TILE_SIZE;

		this.clicks = clicks;

		this.clickable = true;

		this.image = 0;

		if (this.type === 2 || this.type === 3) {
			if ((this.tileX ^ this.tileY) % 3 === 1) {
				this.image = 1;
			}
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			this.clicks -= 1;

			if (this.clicks <= 0) {
				this.parent.handleDestroyedObject(this.type, this.tileX, this.tileY);
			}

			return true;
		}
	}

	updatePos() {}
}

export { MapObject };
