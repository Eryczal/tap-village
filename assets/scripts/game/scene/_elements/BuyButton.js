import { Element } from "../../element/Element.js";

class BuyButton extends Element {
    constructor(game, x, y, width, height, parent, text = "Kup", images = false, size = height * 0.8) {
        super(game);

        this.width = width;
        this.height = height;

        this.x = x;
        this.iY = y;
        this.y = y;

        this.parent = parent;

        this.sColor = "#000";
        this.color = "#ccc";

        this.size = size;

        this.images = images ? images.map((image) => (image ? this.game.assetsManager.images[image] : false)) : false;
        this.margin = this.size / 8;

        if (this.images) {
            this.elements = text.split(" ").map((element, i) => {
                const match = element.match(/%i(\d+)/);
                if (match) {
                    const imageIndex = parseInt(match[1]);
                    return this.images[imageIndex] ? this.images[imageIndex] : element;
                } else {
                    return element;
                }
            });

            let totalWidth = this.images ? -this.margin : 0;

            this.elements.forEach((element) => {
                if (typeof element === "string") {
                    totalWidth += this.game.writeText(element, 0, 0, this.height * 0.8, "transparent").sizes[0].width;
                } else {
                    totalWidth += this.height * 0.6;
                }
                totalWidth += this.margin;
            });

            const centerX = (this.width - totalWidth) / 2;

            let currentX = centerX;

            this.elements.forEach((element, i) => {
                let elementWidth;
                if (typeof element === "string") {
                    elementWidth = this.game.writeText(element, 0, 0, this.height * 0.8, "transparent").sizes[0].width;
                } else {
                    elementWidth = this.height * 0.6;
                }

                this.elements[i] = { value: element, x: currentX };

                currentX += elementWidth + this.margin;
            });
        } else {
            this.text = text;
        }
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);

        if (this.notAllowedText || this.images === false) {
            this.game.strokeText(this.notAllowedText || this.text, this.x + this.width / 2, this.y + this.height / 2, this.size, this.sColor, "center");
            this.game.writeText(this.notAllowedText || this.text, this.x + this.width / 2, this.y + this.height / 2, this.size, this.color, "center");
        } else {
            this.elements.forEach((element, i) => {
                if (typeof element.value === "string") {
                    this.game.strokeText(element.value, this.x + element.x, this.y + this.height / 2, this.size, this.sColor, "left");
                    this.game.writeText(element.value, this.x + element.x, this.y + this.height / 2, this.size, this.color, "left");
                } else {
                    this.game.ctx.drawImage(element.value, this.x + element.x, this.y + this.height * 0.2, this.height * 0.6, this.height * 0.6);
                }
            });
        }
    }
}

export { BuyButton };
