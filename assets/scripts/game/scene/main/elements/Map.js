import { Element } from "../../../element/Element.js";
import { buildings } from "../../shop/elements/BuildingsShop.js";
import { MapObject } from "./MapObject.js";

var map = [
	[0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3],
	[2, 2, 0, 2, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0],
	[0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
	[0, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 3, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 3, 2, 0, 2, 0, 0, 2, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 2, 2, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 0, 0, 0, 3, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 0, 2, 2, 3, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 2, 0, 2, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 2, 0, 2, 2, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 3, 2, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 3, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 0, 2, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 2, 0, 2, 0, 2, 2, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0, 2, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
	[2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0],
	[2, 2, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0],
	[0, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0],
	[0, 0, 0, 2, 3, 2, 2, 0, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0],
	[0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 3, 3, 0],
	[2, 2, 2, 2, 2, 0, 2, 0, 3, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 2, 0, 2, 2, 0],
	[0, 0, 2, 2, 0, 2, 0, 0, 2, 2, 3, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0],
	[2, 2, 2, 3, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 3, 2, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0],
	[0, 0, 0, 3, 0, 3, 0, 0, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

class Map extends Element {
	constructor(game, menu) {
		super(game);

		this.TILE_SIZE = 50 * this.game.playerManager.preferedZoom;
		this.MENU_SIZE = menu.MENU_SIZE;

		this.mapObjects = [];

		this.waterAnimation = setInterval(() => {
			this.changeWater();
		}, 800);
		this.waterState = 0;

		this.scrollable = false;

		this.zoom = this.game.playerManager.preferedZoom;
		this.MAX_ZOOM = 2;
		this.MIN_ZOOM = 0.6;

		this.oldMapScroll = {
			x: 0,
			y: 0,
		};

		this.mapScroll = {
			x: 0,
			y: 0,
		};

		this.selectedTile = {
			x: 0,
			y: 0,
		};

		this.targetScroll = {};

		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (map[i][j] !== 0 && map[i][j] !== 1) {
					let min = map[i][j] * 2 - 3;
					let max = map[i][j] * map[i][j] + 1;
					this.mapObjects.push(
						new MapObject(this.game, this, map[i][j], j, i, 1, this.TILE_SIZE, this.MENU_SIZE)
						// new MapObject(this.game, this, map[i][j], j, i, Math.floor(Math.random() * (max - min + 1)) + min, this.TILE_SIZE, this.MENU_SIZE)
					);
				}
			}
		}

		this.updateSizes();
	}

	draw() {
		let overlap = 1 / this.zoom;
		let construction = this.game.constructionManager;

		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[y].length; x++) {
				let xPos = this.MENU_SIZE + x * this.TILE_SIZE + this.mapScroll.x;
				let yPos = y * this.TILE_SIZE + this.mapScroll.y;
				let size = this.TILE_SIZE + overlap;
				this.game.ctx.drawImage(this.getTileImage(map[y][x]), xPos, yPos, size, size);
			}
		}

		if (construction.constructionState === 0) {
			this.game.ctx.drawImage(
				this.game.assetsManager.images[buildings[construction.buildingId].image],
				this.MENU_SIZE + this.mapScroll.x + this.selectedTile.x * this.TILE_SIZE,
				this.mapScroll.y + this.selectedTile.y * this.TILE_SIZE,
				buildings[construction.buildingId].size.x * this.TILE_SIZE,
				buildings[construction.buildingId].size.y * this.TILE_SIZE
			);
			this.game.ctx.globalCompositeOperation = "source-atop";
			this.game.ctx.fillStyle = this.checkBuildingPos(construction.buildingId) ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)";

			this.game.ctx.fillRect(
				this.MENU_SIZE + this.mapScroll.x + this.selectedTile.x * this.TILE_SIZE,
				this.mapScroll.y + this.selectedTile.y * this.TILE_SIZE,
				buildings[construction.buildingId].size.x * this.TILE_SIZE,
				buildings[construction.buildingId].size.y * this.TILE_SIZE
			);

			this.game.ctx.globalCompositeOperation = "source-over";
		} else if (construction.constructionState === 1) {
			this.game.ctx.drawImage(
				this.game.assetsManager.images[buildings[construction.buildingId].image],
				this.MENU_SIZE + this.mapScroll.x + construction.constructionX * this.TILE_SIZE,
				this.mapScroll.y + construction.constructionY * this.TILE_SIZE,
				buildings[construction.buildingId].size.x * this.TILE_SIZE,
				buildings[construction.buildingId].size.y * this.TILE_SIZE
			);

			this.game.writeText(
				construction.clickProgress + "/" + buildings[construction.buildingId].clicks,
				this.MENU_SIZE + this.mapScroll.x + construction.constructionX * this.TILE_SIZE + (buildings[construction.buildingId].size.x * this.TILE_SIZE) / 2,
				this.mapScroll.y + construction.constructionY * this.TILE_SIZE + (buildings[construction.buildingId].size.y * this.TILE_SIZE) / 2,
				this.TILE_SIZE
			);
		}

		for (let i = 0; i < this.game.buildingsManager.buildings.length; i++) {
			let building = this.game.buildingsManager.buildings[i];

			this.game.ctx.drawImage(this.game.assetsManager.images[buildings[building.buildingId].image], building.x, building.y, building.width, building.height);

			this.game.writeText("Poziom " + building.lvl, building.x + building.width / 2, building.y + building.height / 2, this.TILE_SIZE);
		}
	}

	unload() {
		clearInterval(this.waterAnimation);
	}

	getTileImage(id) {
		switch (id) {
			case 0:
				return this.game.assetsManager.images.grassTile;
			case 1:
				if (this.waterState == 0) {
					return this.game.assetsManager.images.waterTile;
				} else {
					return this.game.assetsManager.images["waterTile" + (this.waterState + 1)];
				}
			case 2:
				return this.game.assetsManager.images.treeTile;
			case 3:
				return this.game.assetsManager.images.stoneTile;
			default:
				return this.game.assetsManager.images.grassTile;
		}
	}

	changeWater() {
		if (this.waterState > 0) {
			this.waterState = 0;
		} else {
			this.waterState++;
		}
	}

	onMouseDown(mouseX) {
		if (mouseX >= this.MENU_SIZE) {
			this.scrollable = true;

			this.oldMapScroll.x = this.mapScroll.x;
			this.oldMapScroll.y = this.mapScroll.y;
		}
	}

	onMouseDrag(mouseLastPos, event) {
		if (this.scrollable) {
			if (Math.abs(mouseLastPos.x - event.clientX) > 7 || Math.abs(mouseLastPos.y - event.clientY) > 7) {
				let mapPosition = {
					x: this.oldMapScroll.x + (event.clientX - mouseLastPos.x) * this.zoom,
					y: this.oldMapScroll.y + (event.clientY - mouseLastPos.y) * this.zoom,
				};

				let maxScroll = {
					x: (this.TILE_SIZE * map[0].length - window.innerWidth + this.MENU_SIZE) * -1,
					y: (this.TILE_SIZE * map.length - window.innerHeight) * -1,
				};
				if (mapPosition.x <= 0 && mapPosition.x >= maxScroll.x) {
					this.mapScroll.x = mapPosition.x;
				}
				if (mapPosition.y <= 0 && mapPosition.y >= maxScroll.y) {
					this.mapScroll.y = mapPosition.y;
				}
			}
		}

		this.updateSizes();
	}

	onMouseMove(mouseLastPos, event) {
		if (this.game.constructionManager.constructionState === 0) {
			if (event.clientX >= this.MENU_SIZE) {
				this.selectedTile = {
					x: Math.floor((event.clientX - this.mapScroll.x - this.MENU_SIZE) / this.TILE_SIZE),
					y: Math.floor((event.clientY - this.mapScroll.y) / this.TILE_SIZE),
				};
			}
		}
	}

	onMouseUp() {
		this.oldMapScroll.x = this.mapScroll.x;
		this.oldMapScroll.y = this.mapScroll.y;

		this.scrollable = false;

		this.updateSizes();
	}

	onClick(mouseX, mouseY) {
		if (mouseX >= this.MENU_SIZE) {
			let tileX = Math.floor((mouseX - this.mapScroll.x - this.MENU_SIZE) / this.TILE_SIZE);
			let tileY = Math.floor((mouseY - this.mapScroll.y) / this.TILE_SIZE);

			if (this.game.constructionManager.constructionState === 0) {
				this.selectedTile = {
					x: tileX,
					y: tileY,
				};
				if (this.checkBuildingPos(this.game.constructionManager.buildingId)) {
					this.game.constructionManager.setBuild(this.selectedTile.x, this.selectedTile.y);
					this.selectedTile.x = 0;
					this.selectedTile.y = 0;
					return;
				}
			} else if (this.game.constructionManager.constructionState === 1) {
				if (this.game.constructionManager.isMouseOver(mouseX, mouseY)) {
					this.game.constructionManager.addProgress(100); // -----------------------------------------------
					return;
				}
			}

			if (this.game.buildingsManager.onClick(mouseX, mouseY)) {
				return;
			}

			for (let i = 0; i < this.mapObjects.length; i++) {
				if (this.mapObjects[i].onClick(mouseX, mouseY)) {
					return;
				}
			}
		}
	}

	onRightClick(mouseX, mouseY) {
		// if (mouseX >= this.MENU_SIZE) {
		// 	let selectedTile = {
		// 		x: Math.floor((mouseX - this.mapScroll.x - this.MENU_SIZE) / 50),
		// 		y: Math.floor((mouseY - this.mapScroll.y) / 50),
		// 	};
		// }
	}

	onScroll(event) {
		if (event.clientX > this.MENU_SIZE) {
			let newZoom = this.zoom - Math.sign(event.deltaY) * 0.1;
			newZoom = Math.max(this.MIN_ZOOM, Math.min(this.MAX_ZOOM, newZoom));

			let zoomFactor = newZoom / this.zoom;

			let cursorPos = {
				x: event.clientX - this.MENU_SIZE,
				y: event.clientY,
			};

			this.mapScroll.x -= cursorPos.x * (zoomFactor - 1);
			this.mapScroll.y -= cursorPos.y * (zoomFactor - 1);

			let maxScroll = {
				x: Math.min(0, (this.TILE_SIZE * map[0].length - window.innerWidth + this.MENU_SIZE) * -1),
				y: (this.TILE_SIZE * map.length - window.innerHeight) * -1,
			};

			this.mapScroll.x = Math.max(maxScroll.x, Math.min(0, this.mapScroll.x));
			this.mapScroll.y = Math.max(maxScroll.y, Math.min(0, this.mapScroll.y));

			this.zoom = newZoom;
			this.game.playerManager.preferedZoom = this.zoom;
			this.TILE_SIZE = 50 * this.zoom;

			this.updateSizes();
		}
	}

	onHover(mouseX, mouseY) {
		this.game.constructionManager.onHover(mouseX, mouseY);

		for (let i = 0; i < this.game.buildingsManager.buildings.length; i++) {
			if (this.game.buildingsManager.buildings[i].onHover(mouseX, mouseY)) {
				return;
			}
		}

		for (let i = 0; i < this.mapObjects.length; i++) {
			if (this.mapObjects[i].onHover(mouseX, mouseY)) {
				return;
			}
		}
	}

	updateSizes() {
		let construction = this.game.constructionManager;
		if (construction.constructionState === 1) {
			construction.x = this.MENU_SIZE + this.mapScroll.x + construction.constructionX * this.TILE_SIZE;
			construction.y = this.mapScroll.y + construction.constructionY * this.TILE_SIZE;
			construction.width = buildings[construction.buildingId].size.x * this.TILE_SIZE;
			construction.height = buildings[construction.buildingId].size.y * this.TILE_SIZE;
		}

		for (let i = 0; i < this.game.buildingsManager.buildings.length; i++) {
			let building = this.game.buildingsManager.buildings[i];
			building.x = this.MENU_SIZE + this.mapScroll.x + building.posX * this.TILE_SIZE;
			building.y = this.mapScroll.y + building.posY * this.TILE_SIZE;
			building.width = buildings[building.buildingId].size.x * this.TILE_SIZE;
			building.height = buildings[building.buildingId].size.y * this.TILE_SIZE;
		}

		for (let i = 0; i < this.mapObjects.length; i++) {
			let mapObject = this.mapObjects[i];
			mapObject.x = this.MENU_SIZE + this.mapScroll.x + mapObject.tileX * this.TILE_SIZE;
			mapObject.y = this.mapScroll.y + mapObject.tileY * this.TILE_SIZE;
			mapObject.width = this.TILE_SIZE;
			mapObject.height = this.TILE_SIZE;
		}
	}

	handleDestroyedObject(type, x, y) {
		if (type === 2) {
			this.game.playerManager.wood += 30; //1
		} else {
			this.game.playerManager.stone += 30; //1 --------------------------------------------------------
		}

		this.mapObjects = this.mapObjects.filter((obj) => obj.id !== y + "_" + x);
		map[y][x] = 0;
	}

	checkBuildingPos(buildingId) {
		let buildingSize = {
			x: buildings[buildingId].size.x - 1,
			y: buildings[buildingId].size.y - 1,
		};

		let isFree = true;

		for (let y = this.selectedTile.y; y <= this.selectedTile.y + buildingSize.y; y++) {
			for (let x = this.selectedTile.x; x <= this.selectedTile.x + buildingSize.x; x++) {
				if (map[y]?.[x] !== 0) {
					isFree = false;
					break;
				}
			}
		}

		return isFree;
	}
}

export { Map, map };
