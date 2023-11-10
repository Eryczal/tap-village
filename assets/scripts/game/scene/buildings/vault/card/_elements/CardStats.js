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

        this.GRADIENT_X = this.TEXT_X;
        this.GRADIENT_Y = this.ICON_Y + this.TEXT_SIZE * 8;
        this.GRADIENT_WIDTH = this.width - (this.TEXT_X - this.MENU_SIZE) * 2;

        this.GRADIENT_HEIGHT = this.TEXT_SIZE * 2;

        this.gradientStops = [
            { stop: 0 / 15, color: "#999999" },
            { stop: 1 / 15, color: "#4bb043" },
            { stop: 2 / 15, color: "#47b9d7" },
            { stop: 4 / 15, color: "#ae47d7" },
            { stop: 14 / 15, color: "#e6bc39" },
            { stop: 15 / 15, color: "#e6bc39" },
        ];

        this.cardLevelText = `Poziom karty: ${this.game.playerManager.cards[this.cardId].lvl}/${cards[this.cardId].upgrades.length - 1}`;
        this.cardBonusText = `${cards[this.cardId].bonusDesc}${cards[this.cardId].upgrades[this.game.playerManager.cards[this.cardId].lvl]}%`;
        this.cardAmount = this.game.playerManager.cards[this.cardId].amount;

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

        let gradient = this.game.ctx.createLinearGradient(this.GRADIENT_X, this.GRADIENT_Y, this.GRADIENT_X + this.GRADIENT_WIDTH, this.GRADIENT_Y);

        let cardStop = Math.min(this.cardAmount / 15, 1);
        for (let i = 0; i < this.gradientStops.length; i++) {
            let currentStop = this.gradientStops[i].stop;
            let nextStop = this.gradientStops[i + 1]?.stop;
            let color = this.gradientStops[i].color;

            if (currentStop === cardStop) {
                gradient.addColorStop(currentStop, color);
                gradient.addColorStop(currentStop, color + "33");
                gradient.addColorStop(nextStop ? nextStop : 1, color + "33");
            }

            if (cardStop > currentStop && cardStop < nextStop) {
                gradient.addColorStop(currentStop, color);
                gradient.addColorStop(cardStop, color);
                gradient.addColorStop(cardStop, color + "33");
                gradient.addColorStop(nextStop, color + "33");
            } else if (cardStop > currentStop && cardStop > nextStop) {
                gradient.addColorStop(currentStop, color);
                gradient.addColorStop(nextStop, color);
            } else if (cardStop < currentStop && cardStop < nextStop) {
                gradient.addColorStop(currentStop, color + "33");
                gradient.addColorStop(nextStop, color + "33");
            } else if (cardStop > currentStop && cardStop === nextStop) {
                gradient.addColorStop(currentStop, color);
                gradient.addColorStop(nextStop, color);
                gradient.addColorStop(nextStop, color + "33");
            }
        }

        this.game.ctx.fillStyle = gradient;
        this.game.ctx.strokeStyle = "rgba(34, 34, 34, 0.6)";
        this.game.ctx.fillRect(this.GRADIENT_X, this.GRADIENT_Y, this.GRADIENT_WIDTH, this.GRADIENT_HEIGHT);
        this.game.ctx.strokeRect(this.GRADIENT_X, this.GRADIENT_Y, this.GRADIENT_WIDTH, this.GRADIENT_HEIGHT);
        this.game.strokeText(`${this.cardAmount} / 15`, this.GRADIENT_X + this.GRADIENT_WIDTH / 2, this.GRADIENT_Y + this.GRADIENT_HEIGHT / 2, this.TEXT_SIZE);
        this.game.writeText(`${this.cardAmount} / 15`, this.GRADIENT_X + this.GRADIENT_WIDTH / 2, this.GRADIENT_Y + this.GRADIENT_HEIGHT / 2, this.TEXT_SIZE);
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
