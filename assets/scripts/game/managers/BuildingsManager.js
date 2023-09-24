import { Element } from "../element/Element.js";
import { buildings } from "../data/buildings.js";
import { offers } from "../data/offers.js";

class Building extends Element {
	constructor(game, buildingId, posX, posY) {
		super(game);

		this.buildingId = buildingId;
		this.posX = posX;
		this.posY = posY;
		this.lvl = 1;
		this.clickable = true;
		this.upgrading = false;
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			return true;
		}
	}
}

class SawmillBuilding extends Building {
	static stats = {};
	static statsCost = {};

	constructor(game, buildingId, posX, posY, stats, statsCost) {
		super(game, buildingId, posX, posY);

		let pStats = JSON.parse(JSON.stringify(stats));

		this.workers = pStats.workers;
		this.workersSpeed = pStats.workersSpeed;

		if (Object.keys(SawmillBuilding.stats).length === 0) {
			SawmillBuilding.stats = pStats;
			delete SawmillBuilding.stats.workers;
			delete SawmillBuilding.stats.workersSpeed;

			offers[0].upgrades = SawmillBuilding.stats.gatheringPower;
		}

		let pStatsCost = JSON.parse(JSON.stringify(statsCost));

		this.workersCost = pStatsCost.workers;
		this.workersSpeedCost = pStatsCost.workersSpeed;

		if (Object.keys(SawmillBuilding.statsCost).length === 0) {
			SawmillBuilding.statsCost = pStatsCost;
			delete SawmillBuilding.statsCost.workers;
			delete SawmillBuilding.statsCost.workersSpeed;
		}

		this.workersTimer = setInterval(() => {
			this.game.playerManager.wood += this.workers;
		}, this.workersSpeed * 1000);
	}
}

class QuarryBuilding extends Building {
	static stats = {};
	static statsCost = {};

	constructor(game, buildingId, posX, posY, stats, statsCost) {
		super(game, buildingId, posX, posY);

		let pStats = JSON.parse(JSON.stringify(stats));

		this.workers = pStats.workers;
		this.workersSpeed = pStats.workersSpeed;

		if (Object.keys(QuarryBuilding.stats).length === 0) {
			QuarryBuilding.stats = pStats;
			delete QuarryBuilding.stats.workers;
			delete QuarryBuilding.stats.workersSpeed;

			offers[1].upgrades = QuarryBuilding.stats.gatheringPower;
		}

		let pStatsCost = JSON.parse(JSON.stringify(statsCost));

		this.workersCost = pStatsCost.workers;
		this.workersSpeedCost = pStatsCost.workersSpeed;

		if (Object.keys(QuarryBuilding.statsCost).length === 0) {
			QuarryBuilding.statsCost = pStatsCost;
			delete QuarryBuilding.statsCost.workers;
			delete QuarryBuilding.statsCost.workersSpeed;
		}

		this.workersTimer = setInterval(() => {
			this.game.playerManager.stone += this.workers;
		}, this.workersSpeed * 1000);
	}
}

class MineBuilding extends Building {
	static stats = {};
	static statsCost = {};

	constructor(game, buildingId, posX, posY, stats, statsCost) {
		super(game, buildingId, posX, posY);

		let pStats = JSON.parse(JSON.stringify(stats));

		this.workers = pStats.workers;
		this.workersSpeed = pStats.workersSpeed;

		if (Object.keys(MineBuilding.stats).length === 0) {
			MineBuilding.stats = pStats;
			delete MineBuilding.stats.workers;
			delete MineBuilding.stats.workersSpeed;

			offers[2].upgrades = MineBuilding.stats.gatheringPower;
		}

		let pStatsCost = JSON.parse(JSON.stringify(statsCost));

		this.workersCost = pStatsCost.workers;
		this.workersSpeedCost = pStatsCost.workersSpeed;

		if (Object.keys(MineBuilding.statsCost).length === 0) {
			MineBuilding.statsCost = pStatsCost;
			delete MineBuilding.statsCost.workers;
			delete MineBuilding.statsCost.workersSpeed;
		}

		this.workersTimer = setInterval(() => {
			this.game.playerManager.gold += this.workers;
		}, this.workersSpeed * 1000);
	}
}

class WorkshopBuilding extends Building {
	static stats = {};
	static statsCost = {};

	constructor(game, buildingId, posX, posY, stats, statsCost) {
		super(game, buildingId, posX, posY);

		let pStats = JSON.parse(JSON.stringify(stats));

		this.workers = pStats.workers;
		this.workersSpeed = pStats.workersSpeed;

		if (Object.keys(WorkshopBuilding.stats).length === 0) {
			WorkshopBuilding.stats = pStats;
			delete WorkshopBuilding.stats.workers;
			delete WorkshopBuilding.stats.workersSpeed;
		}

		let pStatsCost = JSON.parse(JSON.stringify(statsCost));

		this.workersCost = pStatsCost.workers;
		this.workersSpeedCost = pStatsCost.workersSpeed;

		if (Object.keys(WorkshopBuilding.statsCost).length === 0) {
			WorkshopBuilding.statsCost = pStatsCost;
			delete WorkshopBuilding.statsCost.workers;
			delete WorkshopBuilding.statsCost.workersSpeed;
		}

		this.workersTimer = setInterval(() => {
			if (this.game.constructionManager.constructionState === 1) {
				this.game.constructionManager.addProgress(this.workers);
			}
		}, this.workersSpeed * 1000);
	}
}

class TraderBuilding extends Building {
	constructor(game, buildingId, posX, posY) {
		super(game, buildingId, posX, posY);

		this.offers = [];

		this.changeOffers("all");
	}

	changeOffers(offer) {
		if (offer === "all") {
			for (let i = 0; i < 3; i++) {
				this.generateOffer(i);
			}
		} else {
			this.generateOffer(offer);
		}
	}

	generateOffer(id) {
		let offer = offers[Math.floor(Math.random() * offers.length)];
		let amountOffset = Math.floor(Math.random() * (offer.amountOffset * (offer.upgrades + 1) + 1));
		amountOffset = Math.random() < 0.5 ? -amountOffset : amountOffset;
		let costOffset = Math.random() < 0.5 ? -offer.costOffset : offer.costOffset;

		let traderOffer = {
			type: offer.type,
			amount: offer.amount * (offer.upgrades + 1) + amountOffset,
			reward: 1,
		};

		traderOffer.reward = Math.floor(traderOffer.amount * (offer.cost + costOffset)) + 1;

		this.offers[id] = traderOffer;
	}
}

class BuildingsManager {
	constructor(game) {
		this.game = game;
		this.buildings = [];
		this.clickedBuilding;
	}

	init() {}

	countBuilding(id) {
		let count = 0;

		for (let building of this.buildings) {
			if (building.buildingId === id) {
				count++;
			}
		}

		if (this.game.constructionManager.constructionState === 1 && this.game.constructionManager.constructionType === "build") {
			if (this.game.constructionManager.buildingId === id) {
				count++;
			}
		}

		return count;
	}

	addBuilding(buildingId, posX, posY) {
		switch (buildingId) {
			case 1:
				this.buildings.push(new SawmillBuilding(this.game, buildingId, posX, posY, buildings[buildingId].stats, buildings[buildingId].statsCost));
				break;

			case 2:
				this.buildings.push(new QuarryBuilding(this.game, buildingId, posX, posY, buildings[buildingId].stats, buildings[buildingId].statsCost));
				break;

			case 3:
				this.buildings.push(new MineBuilding(this.game, buildingId, posX, posY, buildings[buildingId].stats, buildings[buildingId].statsCost));
				break;

			case 4:
				this.buildings.push(new WorkshopBuilding(this.game, buildingId, posX, posY, buildings[buildingId].stats, buildings[buildingId].statsCost));
				break;

			case 6:
				this.buildings.push(new TraderBuilding(this.game, buildingId, posX, posY));
				break;

			default:
				this.buildings.push(new Building(this.game, buildingId, posX, posY));
				break;
		}
	}

	onClick(mouseX, mouseY) {
		for (let i = 0; i < this.buildings.length; i++) {
			if (this.buildings[i].onClick(mouseX, mouseY)) {
				this.clickedBuilding = this.buildings[i];
				this.game.sceneManager.changeScene("building");
				return true;
			}
		}
	}
}

export { BuildingsManager, SawmillBuilding, QuarryBuilding, MineBuilding, WorkshopBuilding, TraderBuilding };
