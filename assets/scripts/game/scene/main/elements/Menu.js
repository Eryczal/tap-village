import { Element } from "../../../element/Element.js";

class Menu extends Element {
	constructor(game) {
		super(game);

		this.MENU_SIZE = 250;

		this.button = new Button(game, this);
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.menu, 0, 0, this.MENU_SIZE, canvas.height);
		this.button.draw();
	}

	onResize() {
		this.button.onResize();
	}

	onHover(mouseX, mouseY) {
		this.button.onHover(mouseX, mouseY);
	}

	onClick(mouseX, mouseY) {
		this.button.onClick(mouseX, mouseY);
	}
}

class Button extends Element {
	constructor(game, menu) {
		super(game);

		this.width = menu.MENU_SIZE;
		this.height = 100;

		this.x = 0;
		this.y = game.canvas.height - this.height;

		this.clickable = true;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.shopButton, this.x, this.y, this.width, this.height);
		this.game.writeText("Sklep", this.x + this.width / 2, this.y + this.height / 2, 56, "#000");
	}

	onResize() {
		this.y = this.game.canvas.height - this.height;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			this.game.sceneManager.changeScene("shop");
		}
	}
}

export { Menu };
