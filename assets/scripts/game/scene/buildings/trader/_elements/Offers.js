import { Element } from "../../../../element/Element.js";

class Offers extends Element {
    constructor(game, menu) {
        super(game);

        this.MENU_SIZE = menu.MENU_SIZE;
        this.offers = [];

        for (let i = 0; i < this.game.buildingsManager.clickedBuilding.offers.length; i++) {
            this.offers[i] = new Offer(this.game, i, menu, this.game.buildingsManager.clickedBuilding.offers[i]);
        }
    }

    unload() {
        this.game.buildingsManager.saveBuilding(this.game.buildingsManager.clickedBuilding.position);
    }

    draw() {
        this.offers.forEach((offer) => offer.draw());
    }

    onClick(mouseX, mouseY) {
        this.offers.forEach((offer) => offer.onClick(mouseX, mouseY));
    }

    onHover(mouseX, mouseY) {
        this.offers.forEach((offer) => offer.onHover(mouseX, mouseY));
    }

    onResize() {
        for (let i = 0; i < this.offers.length; i++) {
            this.offers[i].onResize();
        }
    }
}

class Offer extends Element {
    constructor(game, num, menu, offer) {
        super(game);

        this.menu = menu;
        this.MENU_SIZE = menu.MENU_SIZE;
        this.SCENE_SIZE = this.game.canvas.width - menu.MENU_SIZE;

        this.num = num;
        this.offer = offer;

        this.width = this.game.canvas.width / 6;
        this.height = this.game.canvas.width / 6;

        this.MARGIN_SIZE = (this.SCENE_SIZE - 3 * this.width) / 4;

        this.x = (this.game.canvas.width / 6 + this.MARGIN_SIZE) * this.num + this.MENU_SIZE + this.MARGIN_SIZE;
        this.y = this.game.canvas.height / 2 - this.height / 2;

        this.clickable = true;

        this.resource = {
            icon: this.offer.type + "Icon",
            x: this.x + this.width / 2,
            y: this.y + this.height / 4,
            width: this.width / 6,
            height: this.height / 6,
        };

        this.resource.x -= (this.resource.width * 1.2 + this.game.writeText(this.offer.amount, 0, 0, this.resource.width, "transparent").sizes[0].width) / 2;

        this.reward = {
            icon: "coinIcon",
            x: this.x + this.width / 2,
            y: this.y + (this.height / 4) * 3 - this.height / 6,
            width: this.width / 6,
            height: this.height / 6,
        };

        this.reward.x -= (this.reward.width * 1.2 + this.game.writeText(this.offer.reward, 0, 0, this.reward.width, "transparent").sizes[0].width) / 2;
    }

    draw() {
        this.game.ctx.shadowColor = "rgba(34, 34, 34, 0.6)";
        this.game.ctx.shadowBlur = this.width / 10;
        this.game.ctx.drawImage(this.game.assetsManager.images.buildingSelect, this.x, this.y, this.width, this.height);

        this.game.ctx.shadowColor = "rgba(0, 0, 0, 0)";
        this.game.ctx.shadowBlur = 0;

        this.game.ctx.drawImage(
            this.game.assetsManager.images[this.resource.icon],
            this.resource.x,
            this.resource.y,
            this.resource.width,
            this.resource.height
        );

        this.game.strokeText(
            this.offer.amount,
            this.resource.x + this.resource.width * 1.2,
            this.resource.y + this.resource.height / 2,
            this.resource.width,
            "#000",
            "left"
        );
        this.game.writeText(
            this.offer.amount,
            this.resource.x + this.resource.width * 1.2,
            this.resource.y + this.resource.height / 2,
            this.resource.width,
            this.offer.amount >= this.game.playerManager[this.offer.type] ? "#f33" : "#3f3",
            "left"
        );

        this.game.strokeText("↓", this.x + this.width / 2, this.y + this.height / 2, this.resource.width * 0.8, "#000", "center", "middle", "Impact");
        this.game.writeText("↓", this.x + this.width / 2, this.y + this.height / 2, this.resource.width * 0.8, "#fff", "center", "middle", "Impact");

        this.game.ctx.drawImage(this.game.assetsManager.images[this.reward.icon], this.reward.x, this.reward.y, this.reward.width, this.reward.height);

        this.game.strokeText(
            this.offer.reward,
            this.reward.x + this.reward.width * 1.2,
            this.reward.y + this.reward.height / 2,
            this.reward.width,
            "#000",
            "left"
        );
        this.game.writeText(
            this.offer.reward,
            this.reward.x + this.reward.width * 1.2,
            this.reward.y + this.reward.height / 2,
            this.reward.width,
            "#fff",
            "left"
        );
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (this.game.playerManager[this.offer.type] >= this.offer.amount) {
                this.game.playerManager[this.offer.type] -= this.offer.amount;
                this.game.playerManager.coin += this.offer.reward;

                this.game.buildingsManager.clickedBuilding.changeOffers(this.num);

                this.refreshOffer();

                this.game.assetsManager.playAudio("trade", true);
            }
        }
    }

    refreshOffer() {
        this.offer = this.game.buildingsManager.clickedBuilding.offers[this.num];

        this.resource.icon = this.offer.type + "Icon";

        this.resource.x =
            this.x +
            this.width / 2 -
            (this.resource.width * 1.2 + this.game.writeText(this.offer.amount, 0, 0, this.resource.width, "transparent").sizes[0].width) / 2;

        this.reward.x =
            this.x +
            this.width / 2 -
            (this.reward.width * 1.2 + this.game.writeText(this.offer.reward, 0, 0, this.reward.width, "transparent").sizes[0].width) / 2;
    }

    onResize() {
        this.MENU_SIZE = this.menu.MENU_SIZE;
        this.SCENE_SIZE = this.game.canvas.width - this.menu.MENU_SIZE;

        this.width = this.game.canvas.width / 6;
        this.height = this.game.canvas.width / 6;

        this.MARGIN_SIZE = (this.SCENE_SIZE - 3 * this.width) / 4;

        this.x = (this.game.canvas.width / 6 + this.MARGIN_SIZE) * this.num + this.MENU_SIZE + this.MARGIN_SIZE;
        this.y = this.game.canvas.height / 2 - this.height / 2;

        this.resource = {
            icon: this.offer.type + "Icon",
            x: this.x + this.width / 2,
            y: this.y + this.height / 4,
            width: this.width / 6,
            height: this.height / 6,
        };

        this.resource.x -= (this.resource.width * 1.2 + this.game.writeText(this.offer.amount, 0, 0, this.resource.width, "transparent").sizes[0].width) / 2;

        this.reward = {
            icon: "coinIcon",
            x: this.x + this.width / 2,
            y: this.y + (this.height / 4) * 3 - this.height / 6,
            width: this.width / 6,
            height: this.height / 6,
        };

        this.reward.x -= (this.reward.width * 1.2 + this.game.writeText(this.offer.reward, 0, 0, this.reward.width, "transparent").sizes[0].width) / 2;
    }
}

export { Offers };
