import { Element } from "../../../../element/Element.js";
import { cards } from "../../../../data/cards.js";

class Card extends Element {
    constructor(game, parent, id, column, row) {
        super(game);

        this.parent = parent;
        this.scroll = parent.scroll;

        this.id = id;
        this.column = column;
        this.row = row;
        this.size = this.parent.SIZE / this.parent.MAX_PER_ROW;
        this.width = this.size * 0.8;
        this.height = this.size * 0.8;
        this.x = this.size * this.column + this.parent.MENU_SIZE + this.size / 10;
        this.iY = this.row * this.size + 200 + this.size / 10;
        this.y = this.row * this.size + 200 + this.size / 10;

        switch (this.game.playerManager.cards[this.id].lvl) {
            case 0:
                this.bgColor = "#999";
                break;

            case 1:
                this.bgColor = "#633";
                break;

            case 2:
                this.bgColor = "#363";
                break;

            case 3:
                this.bgColor = "#336";
                break;

            case 4:
                this.bgColor = "#3eb";
                break;

            case 5:
                this.bgColor = "#eb3";
                break;
        }

        this.clickable = true;
    }

    updateScroll(scroll) {
        this.scroll = scroll;
        this.y = this.iY - this.scroll;
    }

    draw() {
        this.game.ctx.shadowColor = "rgba(34, 34, 34, 0.6)";
        this.game.ctx.shadowBlur = this.width / 10;
        this.game.ctx.fillStyle = this.bgColor;
        this.game.ctx.fillRect(this.x, this.y, this.width, this.width);
        this.game.ctx.drawImage(this.game.assetsManager.images[cards[this.id].image + "Card"], this.x, this.y, this.width, this.width);
        this.game.ctx.shadowColor = "rgba(0, 0, 0, 0)";
        this.game.ctx.shadowBlur = 0;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.sceneManager.changeScene("card", {
                id: this.id,
            });
        }
    }
}

export { Card };
