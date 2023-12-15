import { Element } from "../../../../element/Element.js";
import { chests } from "../../../../data/chests.js";
import { Chest } from "./Chest.js";

class ChestPanel extends Element {
    constructor(game, menu) {
        super(game);

        this.menu = menu;
        this.MENU_SIZE = menu.MENU_SIZE;
        this.SIZE = this.game.canvas.width - this.MENU_SIZE;
        this.scroll = 0;
        this.chests = [];
        this.chestSizes = [];
    }

    init() {
        for (let i = 0; i < chests.length; i++) {
            this.chests[i] = new Chest(this.game, this.menu, i, this);
        }
    }

    onMouseDown(mouseX, mouseY) {
        this.iScroll = this.scroll;
    }

    onMouseDrag(mouseLastPos, event) {
        let sum = this.chestSizes.slice(0, -2).reduce((a, b) => a + b + 200, 200);

        if (Math.abs(mouseLastPos.y - event.clientY) > 7) {
            this.scroll = this.iScroll - (event.clientY - mouseLastPos.y);
            this.scroll = Math.min(Math.max(0, this.scroll), sum);

            for (let i = 0; i < this.chests.length; i++) {
                this.chests[i].updateScroll(this.scroll);
            }
        }
    }

    onMouseUp(mouseX, mouseY) {
        this.iScroll = this.scroll;
    }

    onScroll(event) {
        let sum = this.chestSizes.slice(0, -2).reduce((a, b) => a + b + 200, 200);

        this.scroll += event.deltaY;
        this.scroll = Math.min(Math.max(0, this.scroll), sum);

        for (let i = 0; i < this.chests.length; i++) {
            this.chests[i].updateScroll(this.scroll);
        }
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.beginPath();
        this.game.ctx.rect(this.MENU_SIZE + this.SIZE / 24, this.SIZE / 12, this.SIZE - this.SIZE / 12, this.game.canvas.height - this.SIZE / 8);
        this.game.ctx.clip();

        for (let i = 0; i < this.chests.length; i++) {
            this.chests[i].draw();
        }

        this.game.ctx.restore();
    }

    onHover(mouseX, mouseY) {
        for (let i = 0; i < this.chests.length; i++) {
            this.chests[i].onHover(mouseX, mouseY);
        }
    }

    onClick(mouseX, mouseY) {
        if (!this.game.sceneManager.currentScene.elementsHolder?.elements?.BackButton?.isMouseOver(mouseX, mouseY)) {
            for (let i = 0; i < this.chests.length; i++) {
                this.chests[i].onClick(mouseX, mouseY);
            }
        }
    }

    onRightClick(mouseX, mouseY) {
        for (let i = 0; i < this.chests.length; i++) {
            this.chests[i].onRightClick(mouseX, mouseY);
        }
    }
}

export { ChestPanel };
