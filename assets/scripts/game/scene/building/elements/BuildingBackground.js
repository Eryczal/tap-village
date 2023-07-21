import { Element } from "../../../element/Element.js";

class BuildingBackground extends Element {
	constructor(game, menu) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.building, this.MENU_SIZE, 0, this.game.canvas.width - this.MENU_SIZE, this.game.canvas.height);
	}
}

export { BuildingBackground };
