import { Element } from "../../../../element/Element.js";

class RemoveAccount extends Element {
	constructor(game) {
		super(game);

		let canvas = this.game.canvas;

		this.width = canvas.width / 8;
		this.height = canvas.width / 48;

		this.x = canvas.width - this.width * 1.2;
		this.y = canvas.height - canvas.height / 12;

		this.clickable = true;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.redButton, this.x, this.y, this.width, this.height);
		this.game.writeText("Usuń konto", this.x + this.width / 2, this.y + this.height / 2, 40, "#fff");
	}

	onRightClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			this.game.playerManager.gem = "max";
		}
	}
}

class RemoveProgress extends RemoveAccount {
	constructor(game) {
		super(game);

		this.y -= this.height * 1.5;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.redButton, this.x, this.y, this.width, this.height);
		this.game.writeText("Usuń postęp", this.x + this.width / 2, this.y + this.height / 2, 40, "#fff");
	}
}

export { RemoveAccount, RemoveProgress };
