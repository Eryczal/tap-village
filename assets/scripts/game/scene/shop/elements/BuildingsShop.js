import { Element } from "../../../element/Element.js";

const buildings = [
	{
		id: 0,
		image: "castle",
		name: "Zamek",
		description: "Budynek główny. Pozwala rozbudowywać\npozostałe budynki do poziomu zamku.",
		size: {
			x: 5,
			y: 5,
		},
		cost: {
			wood: 30,
			stone: 0,
			gold: 0,
		},
		clicks: 100,
		maxOnMap: 1,
		upgrades: [],
	},
	{
		id: 1,
		image: "sawmill",
		name: "Tartak",
		description: "Pozwala zbierać drewno potrzebne do budowy.",
		size: {
			x: 3,
			y: 2,
		},
		cost: {
			wood: 50,
			stone: 10,
			gold: 0,
		},
		clicks: 200,
		maxOnMap: 3,
		upgrades: [],
	},
	{
		id: 2,
		image: "mine",
		name: "Kopalnia",
		description: "Pozwala zbierać kamień potrzebny do budowy.",
		size: {
			x: 3,
			y: 3,
		},
		cost: {
			wood: 300,
			stone: 50,
			gold: 0,
		},
		clicks: 300,
		maxOnMap: 3,
		upgrades: [],
	},
];

class BuildingsShop extends Element {
	constructor(game, menu) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;
		this.MAX_PER_ROW = 2;
		this.SIZE = canvas.width - this.MENU_SIZE;
		this.scroll = 0;
	}

	init() {
		let column = 0;
		let row = 0;

		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image] = new Building(
				this.game,
				this,
				i,
				(this.SIZE / this.MAX_PER_ROW) * column + this.MENU_SIZE,
				row * 700 + 150, //zmienić 700 na dynamiczne
				this.SIZE / this.MAX_PER_ROW
			);

			column++;

			if (column > 1) {
				column = 0;
				row++;
			}
		}
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.shop, this.MENU_SIZE, 0, this.SIZE, canvas.height);

		this.game.writeText("Budynki", this.SIZE / 2 + this.MENU_SIZE, 30, 64, "#000", "center", "top");

		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].draw();
		}
	}

	onHover(mouseX, mouseY) {
		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].onHover(mouseX, mouseY);
		}
	}

	onClick(mouseX, mouseY) {
		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].onClick(mouseX, mouseY);
		}
	}

	onScroll(event) {
		this.scroll += event.deltaY;
		this.scroll = Math.min(Math.floor(buildings.length / 2) * 700, Math.max(0, this.scroll)); //zmienić 700 na dynamiczne
		for (let i = 0; i < buildings.length; i++) {
			this[buildings[i].image].updateScroll(this.scroll);
		}
	}

	onMouseDown(mouseX) {
		// if (mouseX >= this.MENU_SIZE) {
		// 	this.scrollable = true;
		// }
	}

	onMouseMove(mouseLastPos, event) {
		// if (this.scrollable) {
		// 	let mapPosition = {
		// 		x: this.oldMapScroll.x + event.clientX - mouseLastPos.x,
		// 		y: this.oldMapScroll.y + event.clientY - mouseLastPos.y,
		// 	};
		// 	let maxScroll = {
		// 		x: (this.TILE_SIZE * map[0].length - window.innerWidth + this.MENU_SIZE) * -1,
		// 		y: (this.TILE_SIZE * map.length - window.innerHeight) * -1,
		// 	};
		// 	if (mapPosition.x <= 0 && mapPosition.x >= maxScroll.x) {
		// 		this.mapScroll.x = this.oldMapScroll.x + event.clientX - mouseLastPos.x;
		// 	}
		// 	if (mapPosition.y <= 0 && mapPosition.y >= maxScroll.y) {
		// 		this.mapScroll.y = this.oldMapScroll.y + event.clientY - mouseLastPos.y;
		// 	}
		// }
	}

	onMouseUp() {
		// this.oldMapScroll.x = this.mapScroll.x;
		// this.oldMapScroll.y = this.mapScroll.y;
		// this.scrollable = false;
	}

	onRightClick(mouseX, mouseY) {
		// if (mouseX >= this.MENU_SIZE) {
		// 	let selectedTile = {
		// 		x: Math.floor((mouseX - this.mapScroll.x - this.MENU_SIZE) / 50),
		// 		y: Math.floor((mouseY - this.mapScroll.y) / 50),
		// 	};
		// 	console.log(selectedTile);
		// }
	}
}

class Building extends Element {
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

		this.buyButton = new BuyButton(game, x + size / 2 - size / 4, y + this.MAX_IMAGE_SIZE + 240, size / 2, size / 12, this);
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

class BuyButton extends Element {
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

export { buildings, BuildingsShop };
