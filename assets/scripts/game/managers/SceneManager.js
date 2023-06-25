import { MainScene } from "../scene/main/MainScene.js";
import { ShopScene } from "../scene/shop/ShopScene.js";

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

	changeScene(scene) {
		this.currentScene?.unload();

		switch (scene) {
			case "main":
				this.currentScene = new MainScene(this.game);
				break;

			case "shop":
				this.currentScene = new ShopScene(this.game);
				break;
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
