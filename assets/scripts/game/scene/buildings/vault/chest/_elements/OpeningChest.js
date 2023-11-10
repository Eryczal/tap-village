import { Element } from "../../../../../element/Element.js";
import { chests } from "../../../../../data/chests.js";
import { cards } from "../../../../../data/cards.js";
import { OpenAgainButton, ChestReturnButton } from "./OpenAgainButton.js";

class OpeningChest extends Element {
    constructor(game, menu) {
        super(game);

        this.MENU_SIZE = menu.MENU_SIZE;
        this.SIZE = this.game.canvas.width - this.MENU_SIZE;
        this.ICON_SIZE = this.game.canvas.height / 4;

        this.x = this.SIZE / 2 + this.MENU_SIZE - this.ICON_SIZE / 2;
        this.iY = this.game.canvas.height / 2 - this.ICON_SIZE / 2;
        this.y = this.game.canvas.height / 2 - this.ICON_SIZE / 2;

        this.HEADER_SIZE = this.ICON_SIZE / 2;
        this.HEADER_X = this.SIZE / 2 + this.MENU_SIZE;
        this.HEADER_Y = this.iY - this.HEADER_SIZE;
        this.headerOpacity = 1;
        this.gradientProgress = 0;
        this.progress = 0;
        this.flipProgress = 0;
        this.iconWidth = this.ICON_SIZE;
        this.cardImg;

        this.chestId = this.game.sceneManager.currentScene.data.id;
        this.opened = false;
        this.openingAnimation = false;
        this.lvlAnimation = false;
        this.drop = null;

        this.openAgainButton;
    }

    openChest() {
        if (this.headerOpacity > 0) {
            this.headerOpacity -= 0.08;
        }
        this.y += this.ICON_SIZE / 50;
        this.progress += this.ICON_SIZE / 25;
        this.flipProgress += 0.15;
        this.iconWidth = this.flipProgress < 0.5 ? this.ICON_SIZE * (1 - this.flipProgress * 2) : this.ICON_SIZE * ((this.flipProgress - 0.5) * 2);
        this.img = this.flipProgress < 0.5 ? this.game.assetsManager.images[this.drop.image + "Card"] : this.game.assetsManager.images.cardBack;

        if (this.flipProgress >= 1) {
            this.flipProgress = 0;
        }

        if (this.y >= this.iY + this.ICON_SIZE / 2) {
            this.headerOpacity = 0;
            this.y = this.iY + this.ICON_SIZE / 2;
            this.flipProgress = 0;
            this.iconWidth = this.flipProgress < 0.5 ? this.ICON_SIZE * (1 - this.flipProgress * 2) : this.ICON_SIZE * ((this.flipProgress - 0.5) * 2);
            this.img = this.flipProgress < 0.5 ? this.game.assetsManager.images[this.drop.image + "Card"] : this.game.assetsManager.images.cardBack;
            this.progress = this.ICON_SIZE;
            this.endAnimation();
        } else {
            setTimeout(() => this.openChest(), 16);
        }
    }

    animateLvl() {
        this.gradientProgress += 0.02;

        if (this.gradientProgress >= 1) {
            this.gradientProgress = 1;
            this.endLvlAnimation();
        } else {
            setTimeout(() => this.animateLvl(), 16);
        }
    }

    openAgain() {
        this.opened = false;
        this.headerOpacity = 1;
        this.y = this.iY;
        this.progress = 0;
        this.angle = 0;
        this.gradientProgress = 0;
        if (this.lvlAnimation) {
            this.endLvlAnimation();
        }
    }

    endAnimation() {
        this.openingAnimation = false;
        this.opened = true;
        this.openAgainButton = new OpenAgainButton(
            this.game,
            this.x - this.ICON_SIZE / 2,
            this.y + this.ICON_SIZE * 1.2,
            this.ICON_SIZE * 2,
            this.ICON_SIZE / 4,
            this
        );
        this.chestReturnButton = new ChestReturnButton(
            this.game,
            this.x - this.ICON_SIZE / 2,
            this.y + this.ICON_SIZE * 1.2 + this.ICON_SIZE / 4,
            this.ICON_SIZE * 2,
            this.ICON_SIZE / 4,
            this
        );

        if (this.lvlAnimation) {
            setTimeout(() => this.animateLvl(), 100);
        }
    }

    endLvlAnimation() {
        this.lvlAnimation = false;
    }

    generateDrop() {
        let chance = Math.floor(Math.random() * 1000);
        let rarity = chests[this.chestId].chances.findIndex((threshold) => chance < threshold);
        if (rarity < 3) {
            if (Math.random() < cards[11].upgrades[this.game.playerManager.cards[11].lvl] / 100) {
                rarity++;
            }
        }
        let array = cards.filter((card) => card.rarity === rarity);
        let index = Math.floor(Math.random() * array.length);
        let card = this.game.playerManager.cards[array[index].id];
        let oldLvl = card.lvl;
        this.drop = array[index];
        card.amount++;

        if (card.amount >= 1 && card.amount < 2) {
            card.lvl = 1;
        } else if (card.amount >= 2 && card.amount < 5) {
            card.lvl = 2;
        } else if (card.amount >= 5 && card.amount < 15) {
            card.lvl = 3;
        } else if (card.amount >= 15) {
            card.lvl = 4;
        }

        if (oldLvl !== card.lvl) {
            this.lvlAnimation = true;
        }

        this.game.playerManager.updatePlayerData("cards", array[index].id);
    }

    getColor(lvl) {
        switch (lvl) {
            case 0:
                return "#999";

            case 1:
                return "#4bb043";

            case 2:
                return "#47b9d7";

            case 3:
                return "#ae47d7";

            case 4:
                return "#e6bc39";
        }
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images.shop, this.MENU_SIZE, 0, this.SIZE, this.game.canvas.height);

        if (this.opened === false) {
            this.game.writeText("Otwórz", this.HEADER_X, this.HEADER_Y, this.HEADER_SIZE, `rgba(0, 0, 0, ${this.headerOpacity})`);
        } else {
            this.openAgainButton.draw();
            this.chestReturnButton.draw();
        }

        if (this.openingAnimation === true || this.opened === true) {
            this.game.ctx.globalAlpha = 1 - this.headerOpacity;
            if (this.lvlAnimation === true) {
                let gradient = this.game.ctx.createLinearGradient(
                    this.x,
                    this.y - this.progress,
                    this.x + this.ICON_SIZE,
                    this.y - this.progress + this.ICON_SIZE
                );
                gradient.addColorStop(0, this.getColor(this.game.playerManager.cards[this.drop.id].lvl));
                gradient.addColorStop(this.gradientProgress, this.getColor(this.game.playerManager.cards[this.drop.id].lvl));
                gradient.addColorStop(this.gradientProgress, this.getColor(this.game.playerManager.cards[this.drop.id].lvl - 1));
                gradient.addColorStop(1, this.getColor(this.game.playerManager.cards[this.drop.id].lvl - 1));
                this.game.ctx.fillStyle = gradient;
            } else {
                this.game.ctx.fillStyle = this.getColor(this.game.playerManager.cards[this.drop.id].lvl);
            }

            this.game.ctx.fillRect(this.x + (this.ICON_SIZE - this.iconWidth) / 2, this.y - this.progress, this.iconWidth, this.ICON_SIZE);
            this.game.ctx.drawImage(this.img, this.x + (this.ICON_SIZE - this.iconWidth) / 2, this.y - this.progress, this.iconWidth, this.ICON_SIZE);
            this.game.ctx.globalAlpha = 1;
        }
        this.game.ctx.drawImage(this.game.assetsManager.images[chests[this.chestId].image + "Chest"], this.x, this.y, this.ICON_SIZE, this.ICON_SIZE);
    }

    onClick(mouseX, mouseY) {
        if (this.openingAnimation === false && this.opened === false) {
            this.generateDrop();
            this.openingAnimation = true;
            this.openChest();
        } else {
            this.openAgainButton.onClick(mouseX, mouseY);
            this.chestReturnButton.onClick(mouseX, mouseY);
        }
    }

    onRightClick(mouseX, mouseY) {
        if (this.openingAnimation === false && this.opened === true) {
            this.openAgainButton.onRightClick(mouseX, mouseY);
        }
    }

    onHover(mouseX, mouseY) {
        if (this.opened === false && this.openingAnimation === false) {
            this.game.canvas.style.cursor = "pointer";
        }
    }
}

export { OpeningChest };
