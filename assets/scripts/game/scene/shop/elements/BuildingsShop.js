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
			wood: 100,
			stone: 100,
			gold: 0,
		},
		clicks: 100,
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
			wood: 100,
			stone: 100,
			gold: 0,
		},
		clicks: 200,
		upgrades: [],
	},
];

class BuildingsShop extends Element {
	constructor(game, menu) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;
		this.MAX_PER_ROW = 2;
		this.SIZE = canvas.width - this.MENU_SIZE;
	}

	init() {
		let column = 0;
		let row = 0;

		for (let i = 0; i < buildings.length; i++) {
			console.log(column);
			this[buildings[i].image] = new Building(
				this.game,
				i,
				(this.SIZE / this.MAX_PER_ROW) * column + this.MENU_SIZE,
				row * 500 + 150,
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
	constructor(game, id, x, y, size) {
		super(game);

		this.id = id;
		this.x = x;
		this.y = y;
		this.size = size;
		this.MAX_IMAGE_SIZE = 250;
		this.IMAGE_SIZE_X = buildings[id].size.x * 50;
		this.IMAGE_SIZE_Y = buildings[id].size.y * 50;
		this.ICON_SIZE = 50;

		console.log(x + size / 2 - size / 4, y + this.MAX_IMAGE_SIZE + 240, size / 2, size / 12);

		this.buyButton = new BuyButton(game, x + size / 2 - size / 4, y + this.MAX_IMAGE_SIZE + 240, size / 2, size / 12, this);
	}

	draw() {
		this.game.ctx.drawImage(
			this.game.assetsManager.images[buildings[this.id].image],
			this.x + this.size / 2 - this.IMAGE_SIZE_X / 2,
			this.y + (this.MAX_IMAGE_SIZE - this.IMAGE_SIZE_Y) / 2,
			this.IMAGE_SIZE_X,
			this.IMAGE_SIZE_Y
		);

		this.game.writeText(buildings[this.id].name, this.x + this.size / 2, this.y + this.MAX_IMAGE_SIZE, 56, "#000", "center", "top");
		this.game.writeText(buildings[this.id].description, this.x + this.size / 2, this.y + this.MAX_IMAGE_SIZE + 60, 40, "#000", "center", "top");

		this.game.ctx.drawImage(
			this.game.assetsManager.images.woodIcon,
			this.x + this.MAX_IMAGE_SIZE / 2,
			this.y + this.MAX_IMAGE_SIZE + 160,
			this.ICON_SIZE,
			this.ICON_SIZE
		);

		let woodSize = this.game.writeText(
			buildings[this.id].cost.wood,
			this.x + this.MAX_IMAGE_SIZE / 2 + this.ICON_SIZE + 10,
			this.y + this.MAX_IMAGE_SIZE + 160 + this.ICON_SIZE / 2,
			40,
			"#000",
			"left"
		);

		this.game.ctx.drawImage(
			this.game.assetsManager.images.stoneIcon,
			this.x + this.MAX_IMAGE_SIZE / 2 + woodSize[0].width + 10 + this.ICON_SIZE + 20,
			this.y + this.MAX_IMAGE_SIZE + 160,
			this.ICON_SIZE,
			this.ICON_SIZE
		);

		let stoneSize = this.game.writeText(
			buildings[this.id].cost.stone,
			this.x + this.MAX_IMAGE_SIZE / 2 + woodSize[0].width + 10 + this.ICON_SIZE * 2 + 30,
			this.y + this.MAX_IMAGE_SIZE + 160 + this.ICON_SIZE / 2,
			40,
			"#000",
			"left"
		);

		this.game.ctx.drawImage(
			this.game.assetsManager.images.goldIcon,
			this.x + this.MAX_IMAGE_SIZE / 2 + woodSize[0].width + stoneSize[0].width + 20 + (this.ICON_SIZE + 20) * 2,
			this.y + this.MAX_IMAGE_SIZE + 160,
			this.ICON_SIZE,
			this.ICON_SIZE
		);

		this.game.writeText(
			buildings[this.id].cost.gold,
			this.x + this.MAX_IMAGE_SIZE / 2 + woodSize[0].width + stoneSize[0].width + 20 + this.ICON_SIZE * 3 + 50,
			this.y + this.MAX_IMAGE_SIZE + 160 + this.ICON_SIZE / 2,
			40,
			"#000",
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
}

class BuyButton extends Element {
	constructor(game, x, y, width, height, that) {
		super(game);

		this.width = width;
		this.height = height;

		this.x = x;
		this.y = y;

		this.clickable = true;

		this.parent = that;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
		this.game.writeText("Kup", this.x + this.width / 2, this.y + this.height / 2, 56);
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
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

export { buildings, BuildingsShop };
