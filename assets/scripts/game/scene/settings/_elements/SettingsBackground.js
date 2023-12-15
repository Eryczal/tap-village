import { Element } from "../../../element/Element.js";

class SettingsBackground extends Element {
    constructor(game, menu) {
        super(game);

        this.menu = menu;
        this.MENU_SIZE = menu.MENU_SIZE;
        this.SIZE = this.game.canvas.width - this.MENU_SIZE;
        this.HEADER_SIZE = this.SIZE / 24;
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.shop, this.MENU_SIZE, 0, this.SIZE, this.game.canvas.height);

        this.game.strokeText("Ustawienia", this.SIZE / 2 + this.MENU_SIZE, this.HEADER_SIZE, this.HEADER_SIZE, "#000", "center", "top");
        this.game.writeText("Ustawienia", this.SIZE / 2 + this.MENU_SIZE, this.HEADER_SIZE, this.HEADER_SIZE, "#fff", "center", "top");
    }

    onResize() {
        this.MENU_SIZE = this.menu.MENU_SIZE;
        this.SIZE = this.game.canvas.width - this.MENU_SIZE;
        this.HEADER_SIZE = this.SIZE / 24;
    }
}

export { SettingsBackground };
