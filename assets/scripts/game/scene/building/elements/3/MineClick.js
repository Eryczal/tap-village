import { Element } from "../../../../element/Element.js";
import { MineBuilding } from "../../../../managers/BuildingsManager.js";
import { ResourceClick as Click } from "../ResourceClick.js";

class MineClick extends Element {
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

	addClick(critic, amount, x, y) {
		this.clicks.push(new Click(this.game, this.clicks.length, x, y, critic, amount, this.clicks));
	}

	draw() {
		let diff = (this.iconSize - this.cIconSize) / 2;
		this.game.writeText("Zdobądź złoto", this.x + this.width / 2, this.y - this.game.canvas.height / 24, this.game.canvas.height / 24);
		this.game.ctx.drawImage(this.game.assetsManager.images.buildingClick, this.x, this.y, this.width, this.height);
		this.game.ctx.drawImage(this.game.assetsManager.images.goldIcon, this.iconX + diff, this.iconY + diff, this.cIconSize, this.cIconSize);

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
			if (Math.random() < MineBuilding.stats.gatheringChance / 100) {
				let critic = Math.random() < MineBuilding.stats.criticalChance / 100;
				let amount = critic ? MineBuilding.stats.criticalPower : MineBuilding.stats.gatheringPower;
				this.game.playerManager.gold += amount;
				this.addClick(critic, amount, mouseX, mouseY);
			}
			this.cIconSize = this.game.canvas.width / 20;
		}
	}
}

export { MineClick };
