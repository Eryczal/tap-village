import { Element } from "../../../../element/Element.js";
import { chests } from "../../../../data/chests.js";
import { ChestButton } from "./ChestButton.js";

class Chest extends Element {
    constructor(game, menu, id, parent) {
        super(game);

        this.menu = menu;
        this.MENU_SIZE = menu.MENU_SIZE;
        this.SIZE = this.game.canvas.width - menu.MENU_SIZE;
        this.id = id;
        this.parent = parent;
        this.scroll = this.parent.scroll;

        this.y = this.parent.chestSizes.slice(0, this.id).reduce((a, b) => a + b + 200, 200);
        this.x = this.MENU_SIZE + this.SIZE / 5;

        this.ICON_SIZE = this.SIZE / 10;
        this.HEADING_SIZE = this.SIZE / 40;
        this.TEXT_SIZE = this.SIZE / 80;

        this.description = this.game.wrapText(chests[this.id].description, this.SIZE / 2, this.TEXT_SIZE);

        this.DESCRIPTION_Y = this.y + this.HEADING_SIZE * 2;
        this.DESCRIPTION_HEIGHT =
            this.game.writeText(this.description, this.x + this.ICON_SIZE * 1.2, this.DESCRIPTION_Y - this.scroll, this.TEXT_SIZE, "transparent", "left", "top")
                .lines * this.TEXT_SIZE;

        this.height = this.HEADING_SIZE * 1.2 + this.DESCRIPTION_HEIGHT;

        this.BUTTON_SIZE = this.SIZE / 12;
        this.BUTTON_HEIGHT = this.SIZE / 48;

        this.chestButton = new ChestButton(
            game,
            this.SIZE / 2 + this.MENU_SIZE - this.BUTTON_SIZE / 2,
            this.y + this.height + this.BUTTON_HEIGHT,
            this.BUTTON_SIZE,
            this.BUTTON_HEIGHT,
            this
        );

        this.parent.chestSizes[this.id] = this.height;
    }

    updateScroll(scroll) {
        this.scroll = scroll;
        this.chestButton.y = this.chestButton.iY - scroll;
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images[chests[this.id].image + "Chest"], this.x, this.y - this.scroll, this.ICON_SIZE, this.ICON_SIZE);

        this.game.writeText(chests[this.id].name, this.MENU_SIZE + this.SIZE / 2, this.y - this.scroll, this.HEADING_SIZE, "#000", "center", "top");
        this.game.writeText(this.description, this.x + this.ICON_SIZE * 1.2, this.DESCRIPTION_Y - this.scroll, this.TEXT_SIZE, "#000", "left", "top");

        this.chestButton.draw();
    }

    onClick(mouseX, mouseY) {
        this.chestButton.onClick(mouseX, mouseY);
    }

    onRightClick(mouseX, mouseY) {
        this.chestButton.onRightClick(mouseX, mouseY);
    }

    onHover(mouseX, mouseY) {
        this.chestButton.onHover(mouseX, mouseY);
    }
}

export { Chest };
