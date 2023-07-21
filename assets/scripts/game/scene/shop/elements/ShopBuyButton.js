import { Element } from "../../../element/Element.js";
import { buildings } from "./buildings.js";

class ShopBuyButton extends Element {
	constructor(game, x, y, width, height, parent) {
		super(game);

		this.width = width;
		this.height = height;

		this.x = x;
		this.iY = y;
		this.y = y;

		this.clickable = this.game.buildingsManager.countBuilding(parent.id) < buildings[parent.id].maxOnMap;

		this.parent = parent;

		this.color = this.game.buildingsManager.countBuilding(parent.id) < buildings[parent.id].maxOnMap ? "#000" : "#999";
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
		this.game.writeText("Kup", this.x + this.width / 2, this.y + this.height / 2, 56, this.color);
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.game.constructionManager.constructionState === null) {
				let building = buildings[this.parent.id];
				if (
					this.game.playerManager.wood >= building.cost.wood &&
					this.game.playerManager.stone >= building.cost.stone &&
					this.game.playerManager.gold >= building.cost.gold
				) {
					this.game.playerManager.wood -= building.cost.wood;
					this.game.playerManager.stone -= building.cost.stone;
					this.game.playerManager.gold -= building.cost.gold;

					this.game.constructionManager.setConstruction(building.id);
					this.game.sceneManager.changeScene("main");
				}
			}
		}
	}
}

export { ShopBuyButton };
