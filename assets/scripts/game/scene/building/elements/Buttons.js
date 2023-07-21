import { Element } from "../../../element/Element.js";

class BackButton extends Element {
	constructor(game, menu) {
		super(game);

		let canvas = this.game.canvas;

		this.MENU_SIZE = menu.MENU_SIZE;

		this.width = canvas.width / 4;
		this.height = canvas.width / 24;

		this.x = (canvas.width - this.MENU_SIZE) / 2 + this.MENU_SIZE - this.width / 2;
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
		this.game.writeText("Powrót", this.x + this.width / 2, this.y + this.height / 2, 48);
	}
}

class UpgradeButton extends BackButton {
	constructor(game, menu) {
		super(game, menu);

		let canvas = this.game.canvas;

		this.y = canvas.height - canvas.height / 4;

		this.clickable = true;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			this.game.sceneManager.changeScene("upgrade");
		}
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.upgradeButton, this.x, this.y, this.width, this.height);
		this.game.writeText("Ulepsz", this.x + this.width / 2, this.y + this.height / 2, 48);
	}
}

export { BackButton, UpgradeButton };
