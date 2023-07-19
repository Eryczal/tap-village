import { Element } from "../../../element/Element.js";

class BackButton extends Element {
	constructor(game) {
		super(game);

		let canvas = this.game.canvas;

		this.width = canvas.width / 4;
		this.height = canvas.width / 24;

		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - canvas.height / 8;

		this.clickable = true;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			this.game.sceneManager.changeScene("main");
		}
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
		this.game.writeText("Powrót", this.x + this.width / 2, this.y + this.height / 2, 40, "#fff");
	}
}

export { BackButton };
