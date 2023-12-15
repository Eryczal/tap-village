import { Element } from "../../../../element/Element.js";
import { ArchitectShopObject } from "./ArchitectShopObject.js";
import { architectObjects } from "../../../../data/architectObjects.js";

class ArchitectShop extends Element {
    constructor(game, menu) {
        super(game);

        this.menu = menu;
        this.MENU_SIZE = menu.MENU_SIZE;
        this.MAX_PER_ROW = 4;
        this.SIZE = this.game.canvas.width - this.MENU_SIZE;
        this.HEADER_SIZE = this.SIZE / 24;
        this.OFFSET = this.SIZE * 0.05;
        this.scroll = 0;
        this.iScroll = 0;
        this.objects = [];
        this.rows = [0];
    }

    init() {
        let column = 0;
        let row = 0;

        for (let i = 0; i < architectObjects.length; i++) {
            this.objects[i] = new ArchitectShopObject(this.game, this, i, column, row);
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

        this.game.strokeText("Obiekty", this.SIZE / 2 + this.MENU_SIZE, this.HEADER_SIZE, this.HEADER_SIZE, "#000", "center", "top");
        this.game.writeText("Obiekty", this.SIZE / 2 + this.MENU_SIZE, this.HEADER_SIZE, this.HEADER_SIZE, "#fff", "center", "top");

        this.game.ctx.save();
        this.game.ctx.beginPath();
        this.game.ctx.rect(this.MENU_SIZE + this.SIZE / 24, this.SIZE / 12, this.SIZE - this.SIZE / 12, this.game.canvas.height - this.SIZE / 8);
        this.game.ctx.clip();

        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw();
        }

        this.game.ctx.restore();
    }

    onHover(mouseX, mouseY) {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].onHover(mouseX, mouseY);
        }
    }

    onClick(mouseX, mouseY) {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].onClick(mouseX, mouseY);
        }
    }

    onMouseDown(mouseX, mouseY) {
        this.iScroll = this.scroll;
    }

    onMouseDrag(mouseLastPos, event) {
        let sum = Math.floor(this.objects.length / this.MAX_PER_ROW) * this.objects[0].ICON_SIZE * this.MAX_PER_ROW;

        if (Math.abs(mouseLastPos.y - event.clientY) > 7) {
            this.scroll = this.iScroll - (event.clientY - mouseLastPos.y);
            this.scroll = Math.min(Math.max(0, this.scroll), sum);

            for (let i = 0; i < this.objects.length; i++) {
                this.objects[i].updateScroll(this.scroll);
            }
        }
    }

    onMouseUp(mouseX, mouseY) {
        this.iScroll = this.scroll;
    }

    onScroll(event) {
        let sum = Math.floor(this.objects.length / this.MAX_PER_ROW) * this.objects[0].ICON_SIZE * this.MAX_PER_ROW;

        this.scroll += event.deltaY;
        this.scroll = Math.min(Math.max(0, this.scroll), sum);

        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].updateScroll(this.scroll);
        }
    }

    onResize() {
        this.MENU_SIZE = this.menu.MENU_SIZE;
        this.SIZE = this.game.canvas.width - this.MENU_SIZE;
        this.HEADER_SIZE = this.SIZE / 24;
        this.OFFSET = this.SIZE * 0.05;
        for (let i = 0; i < this.rows.length; i++) {
            this.rows[i] = 0;
        }
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].onResize();
        }
    }
}

export { ArchitectShop };
