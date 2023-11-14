import { Element } from "../../../element/Element.js";
import { ResourceShopButton } from "./ResourceShopButton.js";
import { resources } from "../../../data/resources.js";
import { MineBuilding, QuarryBuilding, SawmillBuilding } from "../../../managers/BuildingsManager.js";

class ShopResource extends Element {
    constructor(game, parent, id, column, row, type) {
        super(game);

        this.parent = parent;
        this.scroll = parent.scroll;

        this.id = id;
        this.resourceId = Math.floor(id / 4);
        this.column = column;
        this.row = row;
        this.type = type;
        this.x = ((this.parent.SIZE - this.parent.OFFSET * 2) / this.parent.MAX_PER_ROW) * this.column + this.parent.MENU_SIZE + this.parent.OFFSET;
        this.size = this.parent.SIZE / this.parent.MAX_PER_ROW;

        this.ICON_SIZE = this.game.canvas.width / 20;
        this.TEXT_SIZE = this.game.canvas.width / 30;

        this.y = this.row * this.ICON_SIZE * 4 + 200;

        switch (this.type) {
            case 0:
                this.amount = Math.floor(
                    resources[this.resourceId].amount * (SawmillBuilding.stats.gatheringPower + 1) * (SawmillBuilding.stats.gatheringChance / 100)
                );
                break;

            case 1:
                this.amount = Math.floor(
                    resources[this.resourceId].amount * (QuarryBuilding.stats.gatheringPower + 1) * (QuarryBuilding.stats.gatheringChance / 100)
                );
                break;

            case 2:
                this.amount = Math.floor(
                    resources[this.resourceId].amount * (MineBuilding.stats.gatheringPower + 1) * (MineBuilding.stats.gatheringChance / 100)
                );
                break;

            case 3:
                let wood = Math.floor(
                    resources[this.resourceId].amount * 0.4 * (SawmillBuilding.stats.gatheringPower + 1) * (SawmillBuilding.stats.gatheringChance / 100)
                );
                let stone = Math.floor(
                    resources[this.resourceId].amount * 0.4 * (QuarryBuilding.stats.gatheringPower + 1) * (QuarryBuilding.stats.gatheringChance / 100)
                );
                let gold = Math.floor(
                    resources[this.resourceId].amount * 0.4 * (MineBuilding.stats.gatheringPower + 1) * (MineBuilding.stats.gatheringChance / 100)
                );
                this.amount = [wood, stone, gold];
                break;
        }

        if (this.type === 3) {
            this.amount[0] = isNaN(this.amount[0]) ? 0 : this.amount[0];
            this.amount[1] = isNaN(this.amount[1]) ? 0 : this.amount[1];
            this.amount[2] = isNaN(this.amount[2]) ? 0 : this.amount[2];
        } else if (isNaN(this.amount)) {
            this.amount = 0;
        }

        this.height = this.ICON_SIZE * 3;

        this.buyButton = new ResourceShopButton(game, this.x + this.size / 2 - this.size / 4, this.y + this.ICON_SIZE * 3, this.size / 2, this.size / 12, this);

        if (this.height > this.parent.rows[this.row]) {
            this.parent.rows[this.row] = this.height;
        }
    }

    updateScroll(scroll) {
        this.scroll = scroll;
        this.buyButton.y = this.buyButton.iY - scroll;
    }

    draw() {
        switch (this.type) {
            case 0:
                this.game.ctx.drawImage(
                    this.game.assetsManager.images.woodIcon,
                    this.x + this.size / 2 - this.ICON_SIZE / 2,
                    this.y - this.scroll,
                    this.ICON_SIZE,
                    this.ICON_SIZE
                );
                break;
            case 1:
                this.game.ctx.drawImage(
                    this.game.assetsManager.images.stoneIcon,
                    this.x + this.size / 2 - this.ICON_SIZE / 2,
                    this.y - this.scroll,
                    this.ICON_SIZE,
                    this.ICON_SIZE
                );
                break;
            case 2:
                this.game.ctx.drawImage(
                    this.game.assetsManager.images.goldIcon,
                    this.x + this.size / 2 - this.ICON_SIZE / 2,
                    this.y - this.scroll,
                    this.ICON_SIZE,
                    this.ICON_SIZE
                );
                break;
            case 3:
                this.game.ctx.drawImage(
                    this.game.assetsManager.images.woodIcon,
                    this.x + this.size / 2 - this.ICON_SIZE,
                    this.y + this.ICON_SIZE / 2 - this.scroll,
                    this.ICON_SIZE,
                    this.ICON_SIZE
                );
                this.game.ctx.drawImage(
                    this.game.assetsManager.images.goldIcon,
                    this.x + this.size / 2,
                    this.y + this.ICON_SIZE / 2 - this.scroll,
                    this.ICON_SIZE,
                    this.ICON_SIZE
                );
                this.game.ctx.drawImage(
                    this.game.assetsManager.images.stoneIcon,
                    this.x + this.size / 2 - this.ICON_SIZE / 2,
                    this.y - this.scroll,
                    this.ICON_SIZE,
                    this.ICON_SIZE
                );
                break;
        }

        this.game.strokeText(
            this.type === 3 ? this.amount.join(", ") : this.amount,
            this.x + this.size / 2,
            this.y + this.ICON_SIZE * 2 - this.scroll,
            this.TEXT_SIZE * (1 - this.amount.toString().length / 50)
        );
        this.game.writeText(
            this.type === 3 ? this.amount.join(", ") : this.amount,
            this.x + this.size / 2,
            this.y + this.ICON_SIZE * 2 - this.scroll,
            this.TEXT_SIZE * (1 - this.amount.toString().length / 50)
        );

        this.buyButton.draw();
    }

    onHover(mouseX, mouseY) {
        this.buyButton.onHover(mouseX, mouseY);
    }

    onClick(mouseX, mouseY) {
        this.buyButton.onClick(mouseX, mouseY);
    }

    onRightClick(mouseX, mouseY) {
        this.buyButton.onRightClick(mouseX, mouseY);
    }

    onResize() {
        this.ICON_SIZE = this.game.canvas.width / 40;
        this.MAX_IMAGE_SIZE = this.ICON_SIZE * 5;
        this.IMAGE_SIZE_X = buildings[this.id].size.x * this.ICON_SIZE; // ---- // == // - / = /
        this.IMAGE_SIZE_Y = buildings[this.id].size.y * this.ICON_SIZE; // ---- // == // - / = /
        this.TEXT_SPACING = this.game.canvas.height / 100;
        this.ICON_SPACING = this.game.canvas.height / 50;
    }
}

export { ShopResource };
