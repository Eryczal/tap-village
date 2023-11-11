import { Element } from "../../../element/Element.js";
import { BuildingShopButton } from "./BuildingShopButton.js";
import { buildings } from "../../../data/buildings.js";

class ShopBuilding extends Element {
    constructor(game, parent, id, column, row) {
        super(game);

        this.parent = parent;
        this.scroll = parent.scroll;

        this.id = id;
        this.column = column;
        this.row = row;
        this.x = ((this.parent.SIZE - this.parent.OFFSET * 2) / this.parent.MAX_PER_ROW) * this.column + this.parent.MENU_SIZE + this.parent.OFFSET;
        this.y = this.row * 1000 + 200;
        this.size = this.parent.SIZE / this.parent.MAX_PER_ROW;

        this.ICON_SIZE = this.game.canvas.width / 50;
        this.MAX_IMAGE_SIZE = this.ICON_SIZE * 5;
        this.IMAGE_SIZE_X = buildings[id].size.x * this.ICON_SIZE;
        this.IMAGE_SIZE_Y = buildings[id].size.y * this.ICON_SIZE;
        this.TEXT_SPACING = this.game.canvas.height / 100;
        this.ICON_SPACING = this.game.canvas.height / 50;
        this.TEXT_HEADING_SIZE = this.game.canvas.height / 20;
        this.TEXT_SIZE = this.game.canvas.height / 35;

        this.buildingDescription = this.game.wrapText(buildings[this.id].description, this.size * 0.8, this.TEXT_SIZE);

        this.HEADER_Y = this.y + this.MAX_IMAGE_SIZE;
        this.DESCRIPTION_Y = this.HEADER_Y + this.TEXT_HEADING_SIZE + this.TEXT_SPACING;
        this.DESCRIPTION_HEIGHT =
            this.game.writeText(
                this.buildingDescription,
                this.x + this.size / 2,
                this.DESCRIPTION_Y - this.scroll,
                this.TEXT_SIZE,
                "transparent",
                "center",
                "top"
            ).lines * this.TEXT_SIZE;
        this.RESOURCE_Y = this.DESCRIPTION_Y + this.DESCRIPTION_HEIGHT + this.TEXT_SPACING * 2;

        this.height = this.RESOURCE_Y + this.ICON_SIZE + this.ICON_SPACING + this.size / 12 - this.y;

        this.buyButton = new BuildingShopButton(
            game,
            this.x + this.size / 2 - this.size / 4,
            this.RESOURCE_Y + this.ICON_SIZE + this.ICON_SPACING,
            this.size / 2,
            this.size / 12,
            this
        );

        if (this.height > this.parent.rows[this.row]) {
            this.parent.rows[this.row] = this.height;
        }
    }

    updateScroll(scroll) {
        this.scroll = scroll;
        this.buyButton.y = this.buyButton.iY - scroll;
    }

    draw() {
        let player = this.game.playerManager;

        this.game.strokeText(
            buildings[this.id].size.x + "x" + buildings[this.id].size.y,
            this.x + this.size / 2,
            this.y - this.MAX_IMAGE_SIZE / 6 - this.scroll,
            this.TEXT_SIZE
        );
        this.game.writeText(
            buildings[this.id].size.x + "x" + buildings[this.id].size.y,
            this.x + this.size / 2,
            this.y - this.MAX_IMAGE_SIZE / 6 - this.scroll,
            this.TEXT_SIZE
        );

        this.game.ctx.drawImage(
            this.game.assetsManager.images[buildings[this.id].image],
            this.x + this.size / 2 - this.IMAGE_SIZE_X / 2,
            this.y + (this.MAX_IMAGE_SIZE - this.IMAGE_SIZE_Y) / 2 - this.scroll,
            this.IMAGE_SIZE_X,
            this.IMAGE_SIZE_Y
        );

        this.game.strokeText(buildings[this.id].name, this.x + this.size / 2, this.HEADER_Y - this.scroll, this.TEXT_HEADING_SIZE, "#000", "center", "top");
        this.game.writeText(buildings[this.id].name, this.x + this.size / 2, this.HEADER_Y - this.scroll, this.TEXT_HEADING_SIZE, "#fff", "center", "top");

        this.game.strokeText(this.buildingDescription, this.x + this.size / 2, this.DESCRIPTION_Y - this.scroll, this.TEXT_SIZE, "#000", "center", "top");
        this.game.writeText(this.buildingDescription, this.x + this.size / 2, this.DESCRIPTION_Y - this.scroll, this.TEXT_SIZE, "#ccc", "center", "top");

        let iconX = this.x + this.MAX_IMAGE_SIZE / 2;

        this.game.ctx.drawImage(this.game.assetsManager.images.woodIcon, iconX, this.RESOURCE_Y - this.scroll, this.ICON_SIZE, this.ICON_SIZE);

        this.game.strokeText(
            buildings[this.id].cost.wood,
            iconX + this.ICON_SIZE + this.TEXT_SPACING,
            this.RESOURCE_Y - this.scroll + this.ICON_SIZE / 2,
            this.TEXT_SIZE,
            "#000",
            "left"
        );

        let woodSize = this.game.writeText(
            buildings[this.id].cost.wood,
            iconX + this.ICON_SIZE + this.TEXT_SPACING,
            this.RESOURCE_Y - this.scroll + this.ICON_SIZE / 2,
            this.TEXT_SIZE,
            player.wood >= buildings[this.id].cost.wood ? "#0f0" : "#f00",
            "left"
        );

        iconX += woodSize.sizes[0].width + this.ICON_SPACING + this.ICON_SIZE;

        this.game.ctx.drawImage(this.game.assetsManager.images.stoneIcon, iconX, this.RESOURCE_Y - this.scroll, this.ICON_SIZE, this.ICON_SIZE);

        this.game.strokeText(
            buildings[this.id].cost.stone,
            iconX + this.ICON_SIZE + this.TEXT_SPACING,
            this.RESOURCE_Y - this.scroll + this.ICON_SIZE / 2,
            this.TEXT_SIZE,
            "#000",
            "left"
        );
        let stoneSize = this.game.writeText(
            buildings[this.id].cost.stone,
            iconX + this.ICON_SIZE + this.TEXT_SPACING,
            this.RESOURCE_Y - this.scroll + this.ICON_SIZE / 2,
            this.TEXT_SIZE,
            player.stone >= buildings[this.id].cost.stone ? "#0f0" : "#f00",
            "left"
        );

        iconX += stoneSize.sizes[0].width + this.ICON_SPACING + this.ICON_SIZE;

        this.game.ctx.drawImage(this.game.assetsManager.images.goldIcon, iconX, this.RESOURCE_Y - this.scroll, this.ICON_SIZE, this.ICON_SIZE);

        this.game.strokeText(
            buildings[this.id].cost.gold,
            iconX + this.ICON_SIZE + this.TEXT_SPACING,
            this.RESOURCE_Y - this.scroll + this.ICON_SIZE / 2,
            this.TEXT_SIZE,
            "#00",
            "left"
        );
        this.game.writeText(
            buildings[this.id].cost.gold,
            iconX + this.ICON_SIZE + this.TEXT_SPACING,
            this.RESOURCE_Y - this.scroll + this.ICON_SIZE / 2,
            this.TEXT_SIZE,
            player.gold >= buildings[this.id].cost.gold ? "#0f0" : "#f00",
            "left"
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
        this.IMAGE_SIZE_X = buildings[this.id].size.x * this.ICON_SIZE;
        this.IMAGE_SIZE_Y = buildings[this.id].size.y * this.ICON_SIZE;
        this.TEXT_SPACING = this.game.canvas.height / 100;
        this.ICON_SPACING = this.game.canvas.height / 50;
    }

    updatePosition() {
        this.y = this.parent.rows.slice(0, this.row).reduce((a, b) => a + b + 200, 200);
        this.HEADER_Y = this.y + this.MAX_IMAGE_SIZE;
        this.DESCRIPTION_Y = this.HEADER_Y + this.TEXT_HEADING_SIZE + this.TEXT_SPACING;
        this.RESOURCE_Y = this.y + this.parent.rows[this.row] - this.size / 5;
        this.buyButton.iY = this.y + this.parent.rows[this.row] - this.size / 12;

        this.updateScroll(this.scroll);
    }
}

export { ShopBuilding };
