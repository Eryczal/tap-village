import { Element } from "../../../element/Element.js";
import { buildings } from "../../../data/buildings.js";
import { MineBuilding, QuarryBuilding, SawmillBuilding, WorkshopBuilding } from "../../../managers/BuildingsManager.js";

class BuildingButton extends Element {
	constructor(game, menu, text, stat, y = 0) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;

		this.width = this.game.canvas.width / 6;
		this.height = this.game.canvas.width / 36;

		this.x = (this.game.canvas.width - this.MENU_SIZE) / 2 - this.width / 2 + this.MENU_SIZE;
		this.y = this.game.canvas.height / 6 + y * this.height;

		this.offset = canvas.width / 200;
		this.iconY = this.y + this.height / 2 - this.height / 4;

		this.clickable = true;

		this.text = text;
		this.stat = stat;
		this.building = this.game.buildingsManager.clickedBuilding;

		if (this.building.lvl > 1) {
			this.maxStat = buildings[this.building.buildingId].upgrades[this.building.lvl - 2].maxStats[stat];
		} else {
			this.maxStat = buildings[this.building.buildingId].maxStats[stat];
		}

		if (stat !== "workers" && stat !== "workersSpeed") {
			switch (this.building.buildingId) {
				case 1:
					this[stat] = SawmillBuilding.stats[stat];
					this.cost = SawmillBuilding.statsCost[stat];
					break;

				case 2:
					this[stat] = QuarryBuilding.stats[stat];
					this.cost = QuarryBuilding.statsCost[stat];
					break;

				case 3:
					this[stat] = MineBuilding.stats[stat];
					this.cost = MineBuilding.statsCost[stat];
					break;

				case 4:
					this[stat] = WorkshopBuilding.stats[stat];
					this.cost = WorkshopBuilding.statsCost[stat];
					break;
			}
		} else {
			this[stat] = this.building[stat];
			this.cost = this.building[stat + "Cost"];
		}

		this.state = 0;
	}

	updateMaxStats() {
		if (this.building.lvl > 1) {
			this.maxStat = buildings[this.building.buildingId].upgrades[this.building.lvl - 2].maxStats[this.stat];
		}
	}

	updateValues(mouseX, mouseY) {
		if (this.stat !== "workers" && this.stat !== "workersSpeed") {
			switch (this.building.buildingId) {
				case 1:
					this[this.stat] = SawmillBuilding.stats[this.stat];
					this.cost = SawmillBuilding.statsCost[this.stat];
					break;

				case 2:
					this[this.stat] = QuarryBuilding.stats[this.stat];
					this.cost = QuarryBuilding.statsCost[this.stat];
					break;

				case 3:
					this[this.stat] = MineBuilding.stats[this.stat];
					this.cost = MineBuilding.statsCost[this.stat];
					break;

				case 4:
					this[this.stat] = WorkshopBuilding.stats[this.stat];
					this.cost = WorkshopBuilding.statsCost[this.stat];
					break;
			}
		} else {
			this[this.stat] = this.building[this.stat];
			this.cost = this.building[this.stat + "Cost"];
		}

		this.onHover(mouseX, mouseY);
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
		if (this.state === 0) {
			this.game.writeText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
		} else if (this.state === 1) {
			let textX = this.x + this.offset;

			this.game.ctx.drawImage(this.game.assetsManager.images.woodIcon, textX, this.iconY, this.height / 2, this.height / 2);
			textX += this.height / 2 + this.offset;

			let woodSize = this.game.writeText(this.cost.wood, textX, this.y + this.height / 2, this.height / 2);
			textX += woodSize.sizes[0].width + this.offset * 2;

			this.game.ctx.drawImage(this.game.assetsManager.images.stoneIcon, textX, this.iconY, this.height / 2, this.height / 2);
			textX += this.height / 2 + this.offset;

			let stoneSize = this.game.writeText(this.cost.stone, textX, this.y + this.height / 2, this.height / 2);
			textX += stoneSize.sizes[0].width + this.offset * 2;

			this.game.ctx.drawImage(this.game.assetsManager.images.goldIcon, textX, this.iconY, this.height / 2, this.height / 2);
			textX += this.height / 2 + this.offset;

			let goldSize = this.game.writeText(this.cost.gold, textX, this.y + this.height / 2, this.height / 2);
			textX += goldSize.sizes[0].width + this.offset * 2;
		} else {
			this.game.writeText("Wymaga ulepszenia budynku", this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
		}
	}

	onHover(mouseX, mouseY) {
		return super.onHover(mouseX, mouseY);
	}
}

class GatheringPower extends BuildingButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz", "gatheringPower");
	}

	draw() {
		super.draw();
		this.game.writeText(
			`Moc zbierania ${this.gatheringPower} -> ${this.gatheringPower + 1}`,
			this.x,
			this.y - this.height / 4,
			this.height / 2,
			"#000",
			"left"
		);
	}

	onHover(mouseX, mouseY) {
		if (super.onHover(mouseX, mouseY)) {
			if (this.gatheringPower < this.maxStat) {
				this.state = 1;
			} else {
				this.state = 2;
			}
		} else {
			this.state = 0;
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.gatheringPower < this.maxStat) {
				if (
					this.game.playerManager.wood >= this.cost.wood &&
					this.game.playerManager.stone >= this.cost.stone &&
					this.game.playerManager.gold >= this.cost.gold
				) {
					this.game.playerManager.wood -= this.cost.wood;
					this.game.playerManager.stone -= this.cost.stone;
					this.game.playerManager.gold -= this.cost.gold;

					switch (this.building.buildingId) {
						case 1:
							SawmillBuilding.stats.gatheringPower += 1;
							break;

						case 2:
							QuarryBuilding.stats.gatheringPower += 1;
							break;

						case 3:
							MineBuilding.stats.gatheringPower += 1;
							break;
					}

					this.cost.wood = Math.round(this.cost.wood * 1.3);
					this.cost.stone = Math.round(this.cost.stone * 1.3);
					this.cost.gold = Math.round(this.cost.gold * 1.3);

					this.updateValues(mouseX, mouseY);
				}
			}
		}
	}
}

class GatheringChance extends BuildingButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz", "gatheringChance", 2);
	}

	draw() {
		super.draw();
		this.game.writeText(
			`Szansa zebrania ${this.gatheringChance}% -> ${this.gatheringChance + 1}%`,
			this.x,
			this.y - this.height / 4,
			this.height / 2,
			"#000",
			"left"
		);
	}

	onHover(mouseX, mouseY) {
		if (super.onHover(mouseX, mouseY)) {
			if (this.gatheringChance < this.maxStat) {
				this.state = 1;
			} else {
				this.state = 2;
			}
		} else {
			this.state = 0;
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.gatheringChance < this.maxStat) {
				if (
					this.game.playerManager.wood >= this.cost.wood &&
					this.game.playerManager.stone >= this.cost.stone &&
					this.game.playerManager.gold >= this.cost.gold
				) {
					this.game.playerManager.wood -= this.cost.wood;
					this.game.playerManager.stone -= this.cost.stone;
					this.game.playerManager.gold -= this.cost.gold;

					switch (this.building.buildingId) {
						case 1:
							SawmillBuilding.stats.gatheringChance += 1;
							break;

						case 2:
							QuarryBuilding.stats.gatheringChance += 1;
							break;

						case 3:
							MineBuilding.stats.gatheringChance += 1;
							break;
					}

					this.cost.wood = Math.round(this.cost.wood * 1.2);
					this.cost.stone = Math.round(this.cost.stone * 1.2);
					this.cost.gold = Math.round(this.cost.gold * 1.2);

					this.updateValues();
				}
			}
		}
	}
}

class BuildingPower extends BuildingButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz", "buildingPower", 2);
	}

	draw() {
		super.draw();
		this.game.writeText(`Moc budowania ${this.buildingPower} -> ${this.buildingPower + 1}`, this.x, this.y - this.height / 4, this.height / 2, "#000", "left");
	}

	onHover(mouseX, mouseY) {
		if (super.onHover(mouseX, mouseY)) {
			if (this.buildingPower < this.maxStat) {
				this.state = 1;
			} else {
				this.state = 2;
			}
		} else {
			this.state = 0;
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.buildingPower < this.maxStat) {
				if (
					this.game.playerManager.wood >= this.cost.wood &&
					this.game.playerManager.stone >= this.cost.stone &&
					this.game.playerManager.gold >= this.cost.gold
				) {
					this.game.playerManager.wood -= this.cost.wood;
					this.game.playerManager.stone -= this.cost.stone;
					this.game.playerManager.gold -= this.cost.gold;

					WorkshopBuilding.stats.buildingPower += 1;

					this.cost.wood = Math.round(this.cost.wood * 1.3);
					this.cost.stone = Math.round(this.cost.stone * 1.3);
					this.cost.gold = Math.round(this.cost.gold * 1.3);

					this.updateValues(mouseX, mouseY);
				}
			}
		}
	}
}

class CriticPower extends BuildingButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz", "criticalPower", 4);
	}

	draw() {
		super.draw();
		this.game.writeText(
			`Moc ciosu kryt. ${this.criticalPower} -> ${this.criticalPower + 1}`,
			this.x,
			this.y - this.height / 4,
			this.height / 2,
			"#000",
			"left"
		);
	}

	onHover(mouseX, mouseY) {
		if (super.onHover(mouseX, mouseY)) {
			if (this.criticalPower < this.maxStat) {
				this.state = 1;
			} else {
				this.state = 2;
			}
		} else {
			this.state = 0;
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.criticalPower < this.maxStat) {
				if (
					this.game.playerManager.wood >= this.cost.wood &&
					this.game.playerManager.stone >= this.cost.stone &&
					this.game.playerManager.gold >= this.cost.gold
				) {
					this.game.playerManager.wood -= this.cost.wood;
					this.game.playerManager.stone -= this.cost.stone;
					this.game.playerManager.gold -= this.cost.gold;

					switch (this.building.buildingId) {
						case 1:
							SawmillBuilding.stats.criticalPower += 1;
							break;

						case 2:
							QuarryBuilding.stats.criticalPower += 1;
							break;

						case 3:
							MineBuilding.stats.criticalPower += 1;
							break;

						case 4:
							WorkshopBuilding.stats.criticalPower += 1;
							break;
					}

					this.cost.wood = Math.round(this.cost.wood * 1.1);
					this.cost.stone = Math.round(this.cost.stone * 1.1);
					this.cost.gold = Math.round(this.cost.gold * 1.1);

					this.updateValues();
				}
			}
		}
	}
}

class CriticChance extends BuildingButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz", "criticalChance", 6);
	}

	draw() {
		super.draw();
		this.game.writeText(
			`Szansa ciosu kryt. ${this.criticalChance}% -> ${this.criticalChance + 1}%`,
			this.x,
			this.y - this.height / 4,
			this.height / 2,
			"#000",
			"left"
		);
	}

	onHover(mouseX, mouseY) {
		if (super.onHover(mouseX, mouseY)) {
			if (this.criticalChance < this.maxStat) {
				this.state = 1;
			} else {
				this.state = 2;
			}
		} else {
			this.state = 0;
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.criticalChance < this.maxStat) {
				if (
					this.game.playerManager.wood >= this.cost.wood &&
					this.game.playerManager.stone >= this.cost.stone &&
					this.game.playerManager.gold >= this.cost.gold
				) {
					this.game.playerManager.wood -= this.cost.wood;
					this.game.playerManager.stone -= this.cost.stone;
					this.game.playerManager.gold -= this.cost.gold;

					switch (this.building.buildingId) {
						case 1:
							SawmillBuilding.stats.criticalChance += 1;
							break;

						case 2:
							QuarryBuilding.stats.criticalChance += 1;
							break;

						case 3:
							MineBuilding.stats.criticalChance += 1;
							break;

						case 4:
							WorkshopBuilding.stats.criticalChance += 1;
							break;
					}

					this.cost.wood = Math.round(this.cost.wood * 1.3);
					this.cost.stone = Math.round(this.cost.stone * 1.3);
					this.cost.gold = Math.round(this.cost.gold * 1.3);

					this.updateValues();
				}
			}
		}
	}
}

class Workers extends BuildingButton {
	constructor(game, menu) {
		super(game, menu, "Zatrudnij", "workers");

		this.x += this.width * 1.2;
	}

	draw() {
		super.draw();
		this.game.writeText(`Liczba pracowników ${this.workers} -> ${this.workers + 1}`, this.x, this.y - this.height / 4, this.height / 2, "#000", "left");
	}

	onHover(mouseX, mouseY) {
		if (super.onHover(mouseX, mouseY)) {
			if (this.workers < this.maxStat) {
				this.state = 1;
			} else {
				this.state = 2;
			}
		} else {
			this.state = 0;
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.workers < this.maxStat) {
				if (
					this.game.playerManager.wood >= this.cost.wood &&
					this.game.playerManager.stone >= this.cost.stone &&
					this.game.playerManager.gold >= this.cost.gold
				) {
					this.game.playerManager.wood -= this.cost.wood;
					this.game.playerManager.stone -= this.cost.stone;
					this.game.playerManager.gold -= this.cost.gold;
					this.building.workers += 1;
					this.cost.wood = Math.round(this.cost.wood * 2.2);
					this.cost.stone = Math.round(this.cost.stone * 2.2);
					this.cost.gold = Math.round(this.cost.gold * 2.2);

					this.updateValues();
				}
			}
		}
	}
}

class WorkersSpeed extends BuildingButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz", "workersSpeed", 2);

		this.workersSpeedUpgrade = Math.round((this.workersSpeed - 0.5) * 10) / 10;

		this.x += this.width * 1.2;
	}

	updateValues() {
		super.updateValues();

		this.workersSpeedUpgrade = Math.round((this.workersSpeed - 0.5) * 10) / 10;
	}

	draw() {
		super.draw();
		this.game.writeText(
			`Prędkość pracowników ${this.workersSpeed}s -> ${this.workersSpeedUpgrade}s`,
			this.x,
			this.y - this.height / 4,
			this.height / 2,
			"#000",
			"left"
		);
	}

	onHover(mouseX, mouseY) {
		if (super.onHover(mouseX, mouseY)) {
			if (this.workersSpeed > this.maxStat) {
				this.state = 1;
			} else {
				this.state = 2;
			}
		} else {
			this.state = 0;
		}
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.workersSpeed > this.maxStat) {
				if (
					this.game.playerManager.wood >= this.cost.wood &&
					this.game.playerManager.stone >= this.cost.stone &&
					this.game.playerManager.gold >= this.cost.gold
				) {
					this.game.playerManager.wood -= this.cost.wood;
					this.game.playerManager.stone -= this.cost.stone;
					this.game.playerManager.gold -= this.cost.gold;

					this.building.workersSpeed = this.workersSpeedUpgrade;

					clearInterval(this.building.workersTimer);

					this.building.workersTimer = setInterval(() => {
						switch (this.building.buildingId) {
							case 1:
								this.game.playerManager.wood += this.building.workers;
								break;

							case 2:
								this.game.playerManager.stone += this.building.workers;
								break;

							case 3:
								this.game.playerManager.gold += this.building.workers;
								break;

							case 4:
								if (this.game.constructionManager.constructionState === 1) {
									this.game.constructionManager.addProgress(this.building.workers);
								}
								break;
						}
					}, this.building.workersSpeed * 1000);

					this.cost.wood = Math.round(this.cost.wood * 1.2);
					this.cost.stone = Math.round(this.cost.stone * 1.2);
					this.cost.gold = Math.round(this.cost.gold * 1.2);

					this.updateValues();
				}
			}
		}
	}
}

export { GatheringPower, GatheringChance, BuildingPower, CriticPower, CriticChance, Workers, WorkersSpeed };
