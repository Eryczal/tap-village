import { Element } from "../../../../element/Element.js";
import { cards } from "../../../../data/cards.js";
import { Card } from "./Card.js";

class CardPanel extends Element {
    constructor(game, menu) {
        super(game);

        this.menu = menu;
        this.MENU_SIZE = menu.MENU_SIZE;
        this.MAX_PER_ROW = 6;
        this.SIZE = this.game.canvas.width - this.MENU_SIZE;
        this.scroll = 0;
        this.cards = [];
    }

    init() {
        let column = 0;
        let row = 0;

        for (let i = 0; i < cards.length; i++) {
            this.cards[i] = new Card(this.game, this, i, column, row);
            column++;

            if (column > this.MAX_PER_ROW - 1) {
                column = 0;
                row++;
            }
        }
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.beginPath();
        this.game.ctx.rect(this.MENU_SIZE, this.SIZE / 12, this.SIZE, this.game.canvas.height - this.SIZE / 8);
        this.game.ctx.clip();

        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].draw();
        }

        this.game.ctx.restore();
    }

    onHover(mouseX, mouseY) {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].onHover(mouseX, mouseY);
        }
    }

    onClick(mouseX, mouseY) {
        if (!this.game.sceneManager.currentScene.elementsHolder?.elements?.BackButton?.isMouseOver(mouseX, mouseY)) {
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].onClick(mouseX, mouseY);
            }
        }
    }

    onScroll(event) {
        let sum = Math.floor(this.cards.length / this.MAX_PER_ROW - 1) * (this.SIZE / this.MAX_PER_ROW) + 200;

        this.scroll += event.deltaY;
        this.scroll = Math.min(Math.max(0, this.scroll), sum);

        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].updateScroll(this.scroll);
        }
    }

    onResize() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].onResize();
        }
        this.MENU_SIZE = this.menu.MENU_SIZE;
    }
}

export { CardPanel };
