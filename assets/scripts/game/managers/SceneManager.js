import { MainScene } from "../scene/main/MainScene.js";
import { ShopScene } from "../scene/shop/ShopScene.js";
import { CastleScene } from "../scene/buildings/castle/CastleScene.js";
import { ResourceScene } from "../scene/buildings/ResourceScene.js";
import { WorkshopScene } from "../scene/buildings/workshop/WorkshopScene.js";
import { VaultScene } from "../scene/buildings/vault/VaultScene.js";
import { TraderScene } from "../scene/buildings/trader/TraderScene.js";
import { ChestScene } from "../scene/buildings/vault/chest/ChestScene.js";
import { CardScene } from "../scene/buildings/vault/card/CardScene.js";

class SceneManager {
	constructor(game) {
		this.game = game;

		this.currentScene = new MainScene(game);
	}

	draw() {
		this.currentScene?.draw();
	}

	init() {
		this.currentScene?.init();
	}

	update() {
		this.currentScene?.update();
	}

	changeScene(scene, options = {}) {
		this.currentScene?.unload();

		switch (scene) {
			case "main":
				this.currentScene = new MainScene(this.game);
				break;

			case "shop":
				this.currentScene = new ShopScene(this.game);
				break;

			case "castle":
				this.currentScene = new CastleScene(this.game);
				break;

			case "sawmill":
			case "quarry":
			case "mine":
				this.currentScene = new ResourceScene(this.game);
				break;

			case "workshop":
				this.currentScene = new WorkshopScene(this.game);
				break;

			case "vault":
				this.currentScene = new VaultScene(this.game);
				break;

			case "trader":
				this.currentScene = new TraderScene(this.game);
				break;

			case "chest":
				this.currentScene = new ChestScene(this.game);
				break;

			case "card":
				this.currentScene = new CardScene(this.game);
				break;
		}

		for (let option in options) {
			this.currentScene.data[option] = options[option];
		}

		this.currentScene?.init();
	}

	onResize() {
		this.currentScene?.onResize();
	}

	onHover(mouseX, mouseY) {
		this.currentScene?.onHover(mouseX, mouseY);
	}

	onClick(mouseX, mouseY) {
		this.currentScene?.onClick(mouseX, mouseY);
	}

	onMouseDrag(mouseLastPos, event) {
		this.currentScene?.onMouseDrag(mouseLastPos, event);
	}

	onMouseMove(mouseLastPos, event) {
		this.currentScene?.onMouseMove(mouseLastPos, event);
	}

	onMouseDown(mouseX, mouseY) {
		this.currentScene?.onMouseDown(mouseX, mouseY);
	}

	onMouseUp(mouseX, mouseY) {
		this.currentScene?.onMouseUp(mouseX, mouseY);
	}

	onRightClick(mouseX, mouseY) {
		this.currentScene?.onRightClick(mouseX, mouseY);
	}

	onScroll(event) {
		this.currentScene?.onScroll(event);
	}
}

export { SceneManager };
