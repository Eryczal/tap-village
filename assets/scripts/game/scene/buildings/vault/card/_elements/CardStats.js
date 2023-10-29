import { Element } from "../../../../../element/Element.js";
import { cards } from "../../../../../data/cards.js";

class CardStats extends Element {
	constructor(game, menu) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;
		this.ICON_SIZE = this.game.canvas.height / 2;

		this.x = this.MENU_SIZE;
		this.y = 0;
		this.width = this.game.canvas.width - this.MENU_SIZE;
		this.height = this.game.canvas.height;

		this.HEADER_SIZE = this.ICON_SIZE / 8;
		this.HEADER_X = this.width / 2 + this.MENU_SIZE;
		this.HEADER_Y = this.y + this.HEADER_SIZE;
		this.TEXT_SIZE = this.HEADER_SIZE * 0.7;

		this.cardId = this.game.sceneManager.currentScene.data.id;

		this.ICON_X = this.MENU_SIZE + this.ICON_SIZE / 5;
		this.ICON_Y = this.height / 2 - this.ICON_SIZE / 2;

		switch (this.game.playerManager.cards[this.cardId].lvl) {
			case 0:
				this.bgColor = "#999";
				break;

			case 1:
				this.bgColor = "#4bb043";
				break;

			case 2:
				this.bgColor = "#47b9d7";
				break;

			case 3:
				this.bgColor = "#ae47d7";
				break;

			case 4:
				this.bgColor = "#e6bc39";
				break;
		}

		this.TEXT_X = this.ICON_X + this.ICON_SIZE * 1.2;

		this.description = this.game.wrapText(cards[this.cardId].description, this.width / 4, this.TEXT_SIZE);
		this.DESCRIPTION_Y = this.HEADER_Y + this.HEADER_SIZE * 1.5;

		this.cardLevelText = `Poziom karty: ${this.game.playerManager.cards[this.cardId].lvl}/${cards[this.cardId].upgrades.length - 1}`;
		this.cardBonusText = `${cards[this.cardId].bonusDesc}${cards[this.cardId].upgrades[this.game.playerManager.cards[this.cardId].lvl]}%`;

		this.clickable = true;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.vaultBackground, this.x, this.y, this.width, this.height);

		this.game.writeText(cards[this.cardId].name, this.HEADER_X, this.HEADER_Y, this.HEADER_SIZE);
		this.game.writeText(cards[this.cardId].description, this.HEADER_X, this.DESCRIPTION_Y, this.TEXT_SIZE);

		this.game.ctx.fillStyle = this.bgColor;
		this.game.ctx.fillRect(this.ICON_X, this.ICON_Y, this.ICON_SIZE, this.ICON_SIZE);
		this.game.ctx.drawImage(this.game.assetsManager.images[cards[this.cardId].image + "Card"], this.ICON_X, this.ICON_Y, this.ICON_SIZE, this.ICON_SIZE);

		this.game.writeText(this.cardLevelText, this.TEXT_X, this.ICON_Y, this.TEXT_SIZE, "#000", "left", "top");
		this.game.writeText(this.cardBonusText, this.TEXT_X, this.ICON_Y + this.TEXT_SIZE * 2, this.TEXT_SIZE, "#000", "left", "top");
		this.game.writeText("Liczba kart", this.HEADER_X, this.ICON_Y + this.TEXT_SIZE * 6, this.HEADER_SIZE);
	}

	onClick(mouseX, mouseY) {
		this.game.sceneManager.changeScene("vault");
		this.game.sceneManager.currentScene.changeMenu(2);
	}

	onHover(mouseX, mouseY) {
		this.game.canvas.style.cursor = "pointer";
	}
}

export { CardStats };
