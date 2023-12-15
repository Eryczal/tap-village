import { Element } from "../../../../element/Element.js";
import { ArchitectShopButton } from "./ArchitectShopButton.js";
import { architectObjects } from "../../../../data/architectObjects.js";

class ArchitectShopObject extends Element {
    constructor(game, parent, id, column, row) {
        super(game);

        this.parent = parent;
        this.scroll = parent.scroll;

        this.id = id;
        this.column = column;
        this.row = row;
        this.x = ((this.parent.SIZE - this.parent.OFFSET * 2) / this.parent.MAX_PER_ROW) * this.column + this.parent.MENU_SIZE + this.parent.OFFSET;
        this.size = this.parent.SIZE / this.parent.MAX_PER_ROW;

        this.ICON_SIZE = this.game.canvas.width / 20;
        this.TEXT_SIZE = this.game.canvas.width / 30;

        this.y = this.row * this.ICON_SIZE * 4 + 200;

        this.height = this.ICON_SIZE * 3;

        this.buyButton = new ArchitectShopButton(
            game,
            this.x + this.size / 2 - this.size * 0.3,
            this.y + this.ICON_SIZE * 3,
            this.size * 0.6,
            this.size * 0.1,
            this
        );

        if (this.height > this.parent.rows[this.row]) {
            this.parent.rows[this.row] = this.height;
        }
    }

    updateScroll(scroll) {
        this.scroll = scroll;
        this.buyButton.y = this.buyButton.iY - scroll;
    }

    draw() {
        this.game.ctx.drawImage(
            this.game.assetsManager.images[architectObjects[this.id].image],
            this.x + this.size / 2 - this.ICON_SIZE / 2,
            this.y - this.scroll,
            this.ICON_SIZE,
            this.ICON_SIZE
        );

        this.game.strokeText(architectObjects[this.id].name, this.x + this.size / 2, this.y + this.ICON_SIZE * 2 - this.scroll, this.ICON_SIZE / 2);
        this.game.writeText(architectObjects[this.id].name, this.x + this.size / 2, this.y + this.ICON_SIZE * 2 - this.scroll, this.ICON_SIZE / 2);

        this.buyButton.draw();
    }

    onHover(mouseX, mouseY) {
        this.buyButton.onHover(mouseX, mouseY);
    }

    onClick(mouseX, mouseY) {
        this.buyButton.onClick(mouseX, mouseY);
    }

    onRightClick(mouseX, mouseY) {
        this.buyButton.onRightClick(mouseX, mouseY);
    }

    onResize() {
        this.x = ((this.parent.SIZE - this.parent.OFFSET * 2) / this.parent.MAX_PER_ROW) * this.column + this.parent.MENU_SIZE + this.parent.OFFSET;
        this.size = this.parent.SIZE / this.parent.MAX_PER_ROW;

        this.ICON_SIZE = this.game.canvas.width / 20;
        this.TEXT_SIZE = this.game.canvas.width / 30;

        this.y = this.row * this.ICON_SIZE * 4 + 200;

        this.height = this.ICON_SIZE * 3;

        this.buyButton = new ArchitectShopButton(
            this.game,
            this.x + this.size / 2 - this.size * 0.3,
            this.y + this.ICON_SIZE * 3,
            this.size * 0.6,
            this.size * 0.1,
            this
        );

        if (this.height > this.parent.rows[this.row]) {
            this.parent.rows[this.row] = this.height;
        }
    }
}

export { ArchitectShopObject };
