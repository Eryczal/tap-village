import { Element } from "../../../element/Element.js";

class BuildingBackground extends Element {
	constructor(game) {
		super(game);
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.shop, 0, 0, this.game.canvas.width, this.game.canvas.height);
	}
}

export { BuildingBackground };
