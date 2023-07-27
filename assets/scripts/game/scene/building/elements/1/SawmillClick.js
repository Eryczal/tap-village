import { Element } from "../../../../element/Element.js";
import { SawmillBuilding } from "../../../../managers/BuildingsManager.js";

class SawmillClick extends Element {
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
		this.game.writeText("Zdobądź drewno", this.x + this.width / 2, this.y - this.game.canvas.height / 24, this.game.canvas.height / 24);
		this.game.ctx.drawImage(this.game.assetsManager.images.buildingClick, this.x, this.y, this.width, this.height);
		this.game.ctx.drawImage(this.game.assetsManager.images.woodIcon, this.iconX + diff, this.iconY + diff, this.cIconSize, this.cIconSize);

		for (let i = this.clicks.length - 1; i >= 0; i--) {
			this.clicks[i].draw();
			this.clicks[i].updatePos();
		}

		this.cIconSize += 5;
		if (this.cIconSize >= this.iconSize) {
			this.cIconSize = this.iconSize;
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (Math.random() < SawmillBuilding.stats.gatheringChance / 100) {
				let critic = Math.random() < SawmillBuilding.stats.criticalChance / 100;
				let amount = critic ? SawmillBuilding.stats.criticalPower : SawmillBuilding.stats.gatheringPower;
				this.game.playerManager.wood += amount;
				this.addClick(critic, amount, mouseX, mouseY);
			}
			this.cIconSize = this.game.canvas.width / 20;
		}
	}
}

class Click {
	constructor(game, index, x, y, critic, amount, clicks) {
		this.game = game;
		this.index = index;
		this.x = x;
		this.y = y;
		this.critic = critic;
		this.amount = amount;
		this.clicks = clicks;
		this.time = 80;
		this.timeBetween = 5;
		this.directionX = Math.round(Math.random());
		this.directionY = Math.round(Math.random());
		this.speedX = Math.floor(Math.random() * 4) + 2;
		this.speedY = Math.floor(Math.random() * 4) + 2;
		this.size = this.game.canvas.height / 30;
	}

	updatePos() {
		this.timeBetween--;
		this.time--;
		if (this.time <= 0) {
			this.clicks.splice(this.index, 1);
			for (let i = this.index; i < this.clicks.length; i++) {
				this.clicks[i].index--;
			}
			return;
		}
		if (this.timeBetween <= 0) {
			this.x += this.directionX ? this.speedX : -this.speedX;
			this.y += this.directionY ? this.speedY : -this.speedY;
			this.size++;
			this.timeBetween = 5;
		}
	}

	draw() {
		this.game.writeText(this.amount, this.x, this.y, this.size, this.critic ? "#f00" : "#000");
	}
}

export { SawmillClick };
