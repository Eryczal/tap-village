import { ElementHolder } from "../element/ElementHolder.js";

class Scene {
	constructor(game) {
		this.game = game;
		this.elementsHolder = new ElementHolder(game);
	}

	get elements() {
		return this.elementsHolder?.list;
	}

	init() {
		this.elementsHolder.init();
	}

	draw() {
		this.elementsHolder.draw();
	}

	update() {
		this.elementsHolder.update();
	}

	unload() {
		this.elementsHolder.unload();
	}

	onResize() {
		this.elementsHolder.onResize();
	}

	onHover(mouseX, mouseY) {
		this.elementsHolder.onHover(mouseX, mouseY);
	}

	onClick(mouseX, mouseY) {
		this.elementsHolder.onClick(mouseX, mouseY);
	}

	onMouseDrag() {}

	onMouseMove() {}

	onMouseDown() {}

	onMouseUp() {}

	onRightClick() {}

	onScroll() {}
}

export { Scene };
