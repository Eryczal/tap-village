import { Element } from "../../../element/Element.js";
import { ShopBuilding } from "./ShopBuilding.js";
import { buildings } from "../../../data/buildings.js";

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
			this[buildings[i].image] = new ShopBuilding(
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
		this.scroll = Math.min(Math.floor((buildings.length - 1) / 2) * 700, Math.max(0, this.scroll)); //zmienić 700 na dynamiczne
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

export { BuildingsShop };
