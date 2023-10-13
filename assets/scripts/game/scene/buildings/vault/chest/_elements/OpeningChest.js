import { Element } from "../../../../../element/Element.js";
import { chests } from "../../../../../data/chests.js";
import { cards } from "../../../../../data/cards.js";
import { OpenAgainButton } from "./OpenAgainButton.js";

class OpeningChest extends Element {
	constructor(game, menu) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;
		this.SIZE = this.game.canvas.width - this.MENU_SIZE;
		this.ICON_SIZE = this.game.canvas.height / 4;

		this.x = this.SIZE / 2 + this.MENU_SIZE - this.ICON_SIZE / 2;
		this.iY = this.game.canvas.height / 2 - this.ICON_SIZE / 2;
		this.y = this.game.canvas.height / 2 - this.ICON_SIZE / 2;

		this.HEADER_SIZE = this.ICON_SIZE / 2;
		this.HEADER_X = this.SIZE / 2 + this.MENU_SIZE;
		this.HEADER_Y = this.iY - this.HEADER_SIZE;
		this.headerOpacity = 1;

		this.chestId = this.game.sceneManager.currentScene.data.id;
		this.opened = false;
		this.openingAnimation = false;

		this.openAgainButton;
	}

	openChest() {
		if (this.headerOpacity > 0) {
			this.headerOpacity -= 0.08;
		}
		this.y += this.ICON_SIZE / 50;

		if (this.y >= this.iY + this.ICON_SIZE / 2) {
			this.headerOpacity = 0;
			this.y = this.iY + this.ICON_SIZE / 2;
			this.endAnimation();
		} else {
			setTimeout(() => this.openChest(), 16);
		}
	}

	openAgain() {
		this.opened = false;
		this.headerOpacity = 1;
		this.y = this.iY;
	}

	endAnimation() {
		this.openingAnimation = false;
		this.opened = true;
		this.openAgainButton = new OpenAgainButton(this.game, this.x, this.y + this.ICON_SIZE, this.ICON_SIZE * 2, this.ICON_SIZE / 4, this);
	}

	generateDrop() {
		let chance = Math.floor(Math.random() * 1000);
		let rarity = chests[this.chestId].chances.findIndex((threshold) => chance < threshold);
		let array = cards.filter((card) => card.rarity === rarity);
		let index = Math.floor(Math.random() * array.length);
		console.log(array[index]);
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.shop, this.MENU_SIZE, 0, this.SIZE, canvas.height);

		if (this.opened === false) {
			this.game.writeText("Otwórz", this.HEADER_X, this.HEADER_Y, this.HEADER_SIZE, `rgba(0, 0, 0, ${this.headerOpacity})`);
		} else {
			this.openAgainButton.draw();
			// this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y + this.ICON_SIZE, this.ICON_SIZE * 2, this.ICON_SIZE / 4);
			// this.game.writeText("Otwórz ponownie", this.x + this.ICON_SIZE / 2, this.y + this.ICON_SIZE + this.ICON_SIZE / 8, this.ICON_SIZE / 4);
		}
		this.game.ctx.drawImage(this.game.assetsManager.images[chests[this.chestId].image + "Chest"], this.x, this.y, this.ICON_SIZE, this.ICON_SIZE);
	}

	onClick(mouseX, mouseY) {
		if (this.openingAnimation === false && this.opened === false) {
			this.generateDrop();
			this.openingAnimation = true;
			this.openChest();
		} else {
			this.openAgainButton.onClick(mouseX, mouseY);
		}
	}

	onRightClick(mouseX, mouseY) {
		if (this.openingAnimation === false && this.opened === true) {
			this.openAgainButton.onRightClick(mouseX, mouseY);
		}
	}

	onHover(mouseX, mouseY) {
		if (this.opened === false && this.openingAnimation === false) {
			this.game.canvas.style.cursor = "pointer";
		}
	}
}

export { OpeningChest };
