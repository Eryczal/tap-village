import { GlobalElementsHolder } from "./element/GlobalElementsHolder.js";
import { AssetsManager, ResizeManager, MouseManager, SceneManager, PlayerManager, ConstructionManager, BuildingsManager } from "./managers/index.js";

class Game {
	constructor() {
		this.canvas = document.getElementById("canvas");

		this.assetsManager = new AssetsManager();
		this.globalElements = new GlobalElementsHolder(this);
		this.sceneManager = new SceneManager(this);
		this.resizeManager = new ResizeManager(this);
		this.mouseManager = new MouseManager(this);
		this.playerManager = new PlayerManager(this);
		this.constructionManager = new ConstructionManager(this);
		this.buildingsManager = new BuildingsManager(this);
	}

	get ctx() {
		return this.canvas.getContext("2d");
	}

	get elements() {
		return this.globalElements?.list;
	}

	get RESOURCES_SIZE() {
		return 25;
	}

	get height() {
		return this.canvas.height;
	}

	get width() {
		return this.canvas.width;
	}

	async init() {
		this.canvas.style.display = "block";
		try {
			await this.assetsManager.loadAssets();

			this.resizeManager.init();

			//init global elements
			for (let element in this.elements) {
				element?.init();
			}

			//init currentScene elements
			this.sceneManager.init();

			this.mouseManager.init();

			this.draw();
		} catch (err) {
			console.error(err);
		}
	}

	draw() {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.ctx.imageSmoothingEnabled = false;

		//draw global elements
		for (let element in this.elements) {
			element?.init();
		}

		//draw currentScene elements
		this.sceneManager.draw();

		requestAnimationFrame(() => this.draw());
	}

	update() {
		//update global elements
		for (let element in this.elements) {
			element?.update();
		}

		//update scene elements
		this.sceneManager.update();
	}

	writeText(text, x, y, size, color = "#000", align = "center", baseline = "middle", font = "VT323") {
		let lines = text.toString().split("\n");
		let sizes = [];

		this.ctx.font = size + "px " + font;
		this.ctx.textBaseline = baseline;
		this.ctx.fillStyle = color;
		this.ctx.textAlign = align;

		for (let i = 0; i < lines.length; i++) {
			this.ctx.fillText(lines[i], x, y + i * size);
			sizes[i] = this.ctx.measureText(lines[i]);
		}

		return { sizes, lines: lines.length };
	}
}

var game = new Game();

export function initGame() {
	game.init();
}
