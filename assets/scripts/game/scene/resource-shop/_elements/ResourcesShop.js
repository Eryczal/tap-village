import { Element } from "../../../element/Element.js";
import { ShopResource } from "./ShopResource.js";
import { resources } from "../../../data/resources.js";

class ResourcesShop extends Element {
    constructor(game, menu) {
        super(game);

        this.menu = menu;
        this.MENU_SIZE = menu.MENU_SIZE;
        this.MAX_PER_ROW = 4;
        this.SIZE = this.game.canvas.width - this.MENU_SIZE;
        this.OFFSET = this.SIZE * 0.05;
        this.scroll = 0;
        this.resources = [];
        this.rows = [0];
    }

    init() {
        let column = 0;
        let row = 0;

        for (let i = 0; i < resources.length * 4; i++) {
            this.resources[i] = new ShopResource(this.game, this, i, column, row, i % 4);
            column++;

            if (column > this.MAX_PER_ROW - 1) {
                column = 0;
                row++;

                this.rows[row] = 0;
            }
        }
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.shop, this.MENU_SIZE, 0, this.SIZE, canvas.height);

        this.game.writeText("Zasoby", this.SIZE / 2 + this.MENU_SIZE, this.SIZE / 24, this.SIZE / 24, "#000", "center", "top");

        this.game.ctx.save();
        this.game.ctx.beginPath();
        this.game.ctx.rect(this.MENU_SIZE + this.SIZE / 24, this.SIZE / 12, this.SIZE - this.SIZE / 12, this.game.canvas.height - this.SIZE / 8);
        this.game.ctx.clip();

        for (let i = 0; i < this.resources.length; i++) {
            this.resources[i].draw();
        }

        this.game.ctx.restore();
    }

    onHover(mouseX, mouseY) {
        for (let i = 0; i < this.resources.length; i++) {
            this.resources[i].onHover(mouseX, mouseY);
        }
    }

    onClick(mouseX, mouseY) {
        for (let i = 0; i < this.resources.length; i++) {
            this.resources[i].onClick(mouseX, mouseY);
        }
    }

    onScroll(event) {
        let sum = (Math.floor(this.resources.length / 4) - 1) * this.resources[0].ICON_SIZE * 4;

        this.scroll += event.deltaY;
        this.scroll = Math.min(Math.max(0, this.scroll), sum);

        for (let i = 0; i < this.resources.length; i++) {
            this.resources[i].updateScroll(this.scroll);
        }
    }

    onResize() {
        for (let i = 0; i < this.resources.length; i++) {
            this.resources[i].onResize();
        }
        this.MENU_SIZE = this.menu.MENU_SIZE;
    }
}

export { ResourcesShop };
