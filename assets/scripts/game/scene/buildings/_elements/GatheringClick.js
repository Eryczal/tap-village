import { Element } from "../../../element/Element.js";
import { cards } from "../../../data/cards.js";
import { GatheredNumber } from "./GatheredNumber.js";

class GatheringClick extends Element {
    constructor(game, menu) {
        super(game);

        this.MENU_SIZE = menu.MENU_SIZE;

        this.width = this.game.canvas.width / 6;
        this.height = this.game.canvas.width / 6;

        this.x = this.MENU_SIZE + this.width / 4;
        this.y = this.game.canvas.height / 2 - this.height / 2;

        this.iconSize = this.game.canvas.width / 18;
        this.cIconSize = this.game.canvas.width / 18;
        this.iconX = this.x + this.width / 2 - this.iconSize / 2;
        this.iconY = this.y + this.height / 2 - this.iconSize / 2;

        this.clickable = true;

        this.clicks = [];
    }

    init() {
        this.chanceCard = cards[this.chanceCardId].upgrades[this.game.playerManager.cards[this.chanceCardId].lvl];
        this.powerCard = cards[this.powerCardId].upgrades[this.game.playerManager.cards[this.powerCardId].lvl];
        this.gemCard = cards[7].upgrades[this.game.playerManager.cards[7].lvl];
    }

    addClick(critic, amount, x, y) {
        this.clicks.push(new GatheredNumber(this.game, this.clicks.length, x, y, critic, amount, this.clicks));
    }

    draw() {
        let diff = (this.iconSize - this.cIconSize) / 2;
        this.game.strokeText(this.text, this.x + this.width / 2, this.y - this.game.canvas.height / 24, this.game.canvas.height / 24, "#000");
        this.game.writeText(this.text, this.x + this.width / 2, this.y - this.game.canvas.height / 24, this.game.canvas.height / 24, "#fff");
        this.game.ctx.drawImage(this.game.assetsManager.images.buildingClick, this.x, this.y, this.width, this.height);
        this.game.ctx.drawImage(this.game.assetsManager.images[this.resource + "Icon"], this.iconX + diff, this.iconY + diff, this.cIconSize, this.cIconSize);

        for (let i = this.clicks.length - 1; i >= 0; i--) {
            this.clicks[i].draw();
            this.clicks[i].updatePos();
        }

        if (this.cIconSize < this.iconSize) {
            this.cIconSize += 5;
        }
        if (this.cIconSize >= this.iconSize) {
            this.cIconSize = this.iconSize;
        }
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            if (Math.random() < (this.buildingClass.stats.gatheringChance + this.chanceCard) / 100) {
                if (Math.random() < this.gemCard / 100) {
                    this.game.playerManager.gem++;
                }
                let critic = Math.random() < this.buildingClass.stats.criticalChance / 100;
                let amount = critic ? this.buildingClass.stats.criticalPower : this.buildingClass.stats.gatheringPower;
                amount = Math.floor(amount * (1 + this.powerCard / 100));
                this.game.playerManager[this.resource] += amount;
                this.addClick(critic, amount, mouseX, mouseY);
                let audio = Math.floor(Math.random() * 3) + 1;
                this.game.assetsManager.playAudio("gather" + audio, true);
            } else {
                let audio = Math.floor(Math.random() * 2) + 1;
                this.game.assetsManager.playAudio("miss" + audio, true);
            }
            this.cIconSize = this.game.canvas.width / 20;
        }
    }
}

export { GatheringClick };
