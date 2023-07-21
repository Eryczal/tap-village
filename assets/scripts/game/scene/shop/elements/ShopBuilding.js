import { Element } from "../../../element/Element.js";
import { ShopBuyButton } from "./ShopBuyButton.js";
import { buildings } from "./buildings.js";

class ShopBuilding extends Element {
	constructor(game, parent, id, x, y, size) {
		super(game);

		this.parent = parent;
		this.scroll = parent.scroll;

		this.id = id;
		this.x = x;
		this.y = y;
		this.size = size;
		this.MAX_IMAGE_SIZE = 250;
		this.IMAGE_SIZE_X = buildings[id].size.x * 50;
		this.IMAGE_SIZE_Y = buildings[id].size.y * 50;
		this.ICON_SIZE = 50;
		this.TEXT_SPACING = 10;
		this.ICON_SPACING = 20;

		this.buyButton = new ShopBuyButton(game, x + size / 2 - size / 4, y + this.MAX_IMAGE_SIZE + 240, size / 2, size / 12, this);
	}

	updateScroll(scroll) {
		this.scroll = scroll;
		this.buyButton.y = this.buyButton.iY - scroll;
	}

	draw() {
		this.game.ctx.drawImage(
			this.game.assetsManager.images[buildings[this.id].image],
			this.x + this.size / 2 - this.IMAGE_SIZE_X / 2,
			this.y + (this.MAX_IMAGE_SIZE - this.IMAGE_SIZE_Y) / 2 - this.scroll,
			this.IMAGE_SIZE_X,
			this.IMAGE_SIZE_Y
		);

		let textY = this.y + this.MAX_IMAGE_SIZE - this.scroll;

		this.game.writeText(buildings[this.id].name, this.x + this.size / 2, textY, 56, "#000", "center", "top");
		textY += 56 + this.TEXT_SPACING;

		let descSize = this.game.writeText(buildings[this.id].description, this.x + this.size / 2, textY, 40, "#000", "center", "top");
		textY += descSize.lines * 40 + this.TEXT_SPACING;

		let iconX = this.x + this.MAX_IMAGE_SIZE / 2;

		this.game.ctx.drawImage(this.game.assetsManager.images.woodIcon, iconX, textY, this.ICON_SIZE, this.ICON_SIZE);

		let woodSize = this.game.writeText(
			buildings[this.id].cost.wood,
			iconX + this.ICON_SIZE + this.TEXT_SPACING,
			textY + this.ICON_SIZE / 2,
			40,
			"#000",
			"left"
		);

		iconX += woodSize.sizes[0].width + this.ICON_SPACING + this.ICON_SIZE;

		this.game.ctx.drawImage(this.game.assetsManager.images.stoneIcon, iconX, textY, this.ICON_SIZE, this.ICON_SIZE);

		let stoneSize = this.game.writeText(
			buildings[this.id].cost.stone,
			iconX + this.ICON_SIZE + this.TEXT_SPACING,
			textY + this.ICON_SIZE / 2,
			40,
			"#000",
			"left"
		);

		iconX += stoneSize.sizes[0].width + this.ICON_SPACING + this.ICON_SIZE;

		this.game.ctx.drawImage(this.game.assetsManager.images.goldIcon, iconX, textY, this.ICON_SIZE, this.ICON_SIZE);

		this.game.writeText(buildings[this.id].cost.gold, iconX + this.ICON_SIZE + this.TEXT_SPACING, textY + this.ICON_SIZE / 2, 40, "#000", "left");

		this.buyButton.draw();
	}

	onHover(mouseX, mouseY) {
		this.buyButton.onHover(mouseX, mouseY);
	}

	onClick(mouseX, mouseY) {
		this.buyButton.onClick(mouseX, mouseY);
	}
}

export { ShopBuilding };
