import { Element } from "../../element/Element.js";

class BuyButton extends Element {
	constructor(game, x, y, width, height, parent) {
		super(game);

		this.width = width;
		this.height = height;

		this.x = x;
		this.iY = y;
		this.y = y;

		this.parent = parent;

		this.color = "#999";
		this.text = "Kup";
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
		this.game.writeText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.height * 0.8, this.color);
	}
}

export { BuyButton };
