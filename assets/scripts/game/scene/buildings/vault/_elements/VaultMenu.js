import { Element } from "../../../../element/Element.js";

class Button extends Element {
    constructor(game, num, menu, img, text) {
        super(game);

        this.menu = menu;
        this.MENU_SIZE = menu.MENU_SIZE;
        this.SCENE_SIZE = this.game.canvas.width - menu.MENU_SIZE;

        this.num = num;

        this.width = this.game.canvas.width / 6;
        this.height = this.game.canvas.width / 6;

        this.MARGIN_SIZE = (this.SCENE_SIZE - 2 * this.width) / 3;

        this.x = (this.width + this.MARGIN_SIZE) * this.num + this.MENU_SIZE + this.MARGIN_SIZE;
        this.y = this.game.canvas.height / 2 - this.height / 2;

        this.clickable = true;

        this.img = {
            icon: img,
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            width: this.width / 4,
            height: this.height / 4,
        };

        this.text = {
            value: text,
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            sizes: this.game.writeText(text, 0, 0, this.img.width / 2, "transparent").sizes[0],
        };

        this.text.height = this.text.sizes.fontBoundingBoxAscent + this.text.sizes.fontBoundingBoxDescent;

        this.img.x -= this.img.width / 2;
        this.img.y -= (this.img.height + this.text.height) / 2;

        this.text.y = this.img.y + this.img.height + this.text.height / 2;
    }

    draw() {
        this.game.ctx.shadowColor = "rgba(34, 34, 34, 0.6)";
        this.game.ctx.shadowBlur = this.width / 10;
        this.game.ctx.drawImage(this.game.assetsManager.images.buildingSelect, this.x, this.y, this.width, this.height);

        if (this.num === 1) {
            this.game.ctx.fillStyle = "#e6bc39";
            this.game.ctx.fillRect(this.img.x, this.img.y, this.img.width, this.img.height);
        }

        this.game.ctx.drawImage(this.game.assetsManager.images[this.img.icon], this.img.x, this.img.y, this.img.width, this.img.height);
        this.game.ctx.shadowColor = "rgba(0, 0, 0, 0)";
        this.game.ctx.shadowBlur = 0;

        this.game.strokeText(this.text.value, this.text.x, this.text.y, this.img.width / 2);
        this.game.writeText(this.text.value, this.text.x, this.text.y, this.img.width / 2);
    }
}

class ChestsButton extends Button {
    constructor(game, menu) {
        super(game, 0, menu, "legendaryChest", "Skrzynie");
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.sceneManager.currentScene.changeMenu(1);
        }
    }
}

class CardsButton extends Button {
    constructor(game, menu) {
        super(game, 1, menu, "woodChanceCard", "Karty");
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.sceneManager.currentScene.changeMenu(2);
        }
    }
}

export { ChestsButton, CardsButton };
