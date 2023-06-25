import { Element } from "../../../element/Element.js";

class Menu extends Element {
	constructor(game) {
		super(game);

		this.MENU_SIZE = 250;

		this.backButton = new BackButton(game, this);
		this.resourcesButton = new ResourcesButton(game, this);
		this.buildingsButton = new BuildingsButton(game, this);
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.menu, 0, 0, this.MENU_SIZE, canvas.height);
		this.backButton.draw();
		this.resourcesButton.draw();
		this.buildingsButton.draw();
	}

	onResize() {
		this.backButton.onResize();
		this.resourcesButton.onResize();
		this.buildingsButton.onResize();
	}

	onHover(mouseX, mouseY) {
		this.backButton.onHover(mouseX, mouseY);
		this.resourcesButton.onHover(mouseX, mouseY);
		this.buildingsButton.onHover(mouseX, mouseY);
	}

	onClick(mouseX, mouseY) {
		this.backButton.onClick(mouseX, mouseY);
		this.resourcesButton.onClick(mouseX, mouseY);
		this.buildingsButton.onClick(mouseX, mouseY);
	}
}

class Button extends Element {
	constructor(game, menu, text) {
		super(game);

		this.width = menu.MENU_SIZE;
		this.height = 100;

		this.x = 0;

		this.text = text;

		this.clickable = true;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.shopButton, this.x, this.y, this.width, this.height);
		this.game.writeText(this.text, this.x + this.width / 2, this.y + this.height / 2, 56, "#000");
	}
}

class BackButton extends Button {
	constructor(game, menu) {
		super(game, menu, "Cofnij");

		this.y = game.canvas.height - this.height;
	}

	onResize() {
		this.y = this.game.canvas.height - this.height;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			this.game.sceneManager.changeScene("main");
		}
	}
}

class ResourcesButton extends Button {
	constructor(game, menu) {
		super(game, menu, "Zasoby");

		this.y = game.canvas.height - this.height * 2;
	}

	onResize() {
		this.y = this.game.canvas.height - this.height * 2;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			// this.game.sceneManager.changeScene("main");
		}
	}
}

class BuildingsButton extends Button {
	constructor(game, menu) {
		super(game, menu, "Budynki");

		this.y = game.canvas.height - this.height * 3;
	}

	onResize() {
		this.y = this.game.canvas.height - this.height * 3;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			// this.game.sceneManager.changeScene("main");
		}
	}
}

export { Menu };
