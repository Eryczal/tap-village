import { Element } from "../../element/Element.js";

class BuyButton extends Element {
    constructor(game, x, y, width, height, parent, text = "Kup", image = false) {
        super(game);

        this.width = width;
        this.height = height;

        this.x = x;
        this.iY = y;
        this.y = y;

        this.parent = parent;

        this.sColor = "#000";
        this.color = "#ccc";
        this.text = text;

        this.image = image ? this.game.assetsManager.images[image] : false;

        this.textX = this.x + this.width / 2;
        this.textSize = this.game.writeText(this.text, 0, 0, this.height * 0.8, "transparent").sizes[0].width;
        this.align = "center";

        if (this.image) {
            this.textMargin = this.height * 0.1;
            this.combinedWidth = this.textSize + this.height * 0.6 + this.textMargin;
            this.textX -= this.combinedWidth / 2;
            this.align = "left";
        }
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
        if (this.image) {
            this.game.ctx.drawImage(this.image, this.textX + this.textSize + this.textMargin, this.y + this.height * 0.2, this.height * 0.6, this.height * 0.6);
        }
        this.game.strokeText(this.text, this.textX, this.y + this.height / 2, this.height * 0.8, this.sColor, this.align);
        this.game.writeText(this.text, this.textX, this.y + this.height / 2, this.height * 0.8, this.color, this.align);
    }
}

export { BuyButton };
