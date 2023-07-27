import { Element } from "../../../element/Element.js";
import { buildings } from "../../shop/elements/buildings.js";

class BackButton extends Element {
	constructor(game, menu) {
		super(game);

		let canvas = this.game.canvas;

		this.MENU_SIZE = menu.MENU_SIZE;

		this.width = canvas.width / 4;
		this.height = canvas.width / 24;

		this.x = (canvas.width - this.MENU_SIZE) / 2 + this.MENU_SIZE - this.width / 2;
		this.y = canvas.height - canvas.height / 8;

		this.clickable = true;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			this.game.sceneManager.changeScene("main");
		}
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
		this.game.writeText("Powrót", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
	}
}

class UpgradeButton extends BackButton {
	constructor(game, menu) {
		super(game, menu);

		let canvas = this.game.canvas;

		this.y = canvas.height - canvas.height / 4;

		this.offset = canvas.width / 200;
		this.iconY = this.y - this.height / 3 - this.height / 4;

		this.building = this.game.buildingsManager.clickedBuilding;
		this.cost = buildings[this.building.buildingId].upgrades[this.building.lvl - 1]?.cost;
		this.clickable = this.cost !== undefined;
	}

	onClick(mouseX, mouseY) {
		let player = this.game.playerManager;
		if (this.isMouseOver(mouseX, mouseY) && this.cost !== undefined) {
			if (
				player.wood >= this.cost.wood &&
				player.stone >= this.cost.stone &&
				player.gold >= this.cost.gold &&
				(this.building.buildingId === 0 || this.game.buildingsManager.buildings[0].lvl > this.building.lvl)
			) {
				player.wood -= this.cost.wood;
				player.stone -= this.cost.stone;
				player.gold -= this.cost.gold;

				this.building.lvl++;
				this.cost = buildings[this.building.buildingId].upgrades[this.building.lvl - 1]?.cost;
				this.clickable = this.cost !== undefined;

				switch (this.building.buildingId) {
					case 1:
						this.game.sceneManager.currentScene.elementsHolder.list["GatheringPower"].updateMaxStats();
						this.game.sceneManager.currentScene.elementsHolder.list["GatheringChance"].updateMaxStats();
						this.game.sceneManager.currentScene.elementsHolder.list["CriticPower"].updateMaxStats();
						this.game.sceneManager.currentScene.elementsHolder.list["CriticChance"].updateMaxStats();
						this.game.sceneManager.currentScene.elementsHolder.list["SawmillWorkers"].updateMaxStats();
						this.game.sceneManager.currentScene.elementsHolder.list["SawmillWorkersSpeed"].updateMaxStats();
				}
			}
		}
	}

	draw() {
		let textX = this.x + this.offset;

		this.game.ctx.drawImage(this.game.assetsManager.images.upgradeButton, this.x, this.y, this.width, this.height);

		if (this.building.buildingId === 0 || this.building.lvl < this.game.buildingsManager.buildings[0].lvl) {
			if (this.cost !== undefined) {
				this.game.ctx.beginPath();
				this.game.ctx.fillStyle = "rgba(255, 255, 0, 0.2)";
				this.game.ctx.rect(this.x, this.y - this.height / 1.5, this.width, this.height / 1.5);
				this.game.ctx.fill();

				this.game.writeText("Ulepsz", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);

				this.game.ctx.drawImage(this.game.assetsManager.images.woodIcon, textX, this.iconY, this.height / 2, this.height / 2);
				textX += this.height / 2 + this.offset * 2;

				let woodSize = this.game.writeText(this.cost.wood, textX, this.y - this.height / 3, this.height / 2);
				textX += woodSize.sizes[0].width + this.offset * 2;

				this.game.ctx.drawImage(this.game.assetsManager.images.stoneIcon, textX, this.iconY, this.height / 2, this.height / 2);
				textX += this.height / 2 + this.offset * 2;

				let stoneSize = this.game.writeText(this.cost.stone, textX, this.y - this.height / 3, this.height / 2);
				textX += stoneSize.sizes[0].width + this.offset * 2;

				this.game.ctx.drawImage(this.game.assetsManager.images.goldIcon, textX, this.iconY, this.height / 2, this.height / 2);
				textX += this.height / 2 + this.offset * 2;

				let goldSize = this.game.writeText(this.cost.gold, textX, this.y - this.height / 3, this.height / 2);
				textX += goldSize.sizes[0].width + this.offset * 2;
			} else {
				this.game.writeText("Maksymalny poziom", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
			}
		} else {
			this.game.writeText("Wymaga ulepszenia zamku", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
		}
	}
}

export { BackButton, UpgradeButton };
