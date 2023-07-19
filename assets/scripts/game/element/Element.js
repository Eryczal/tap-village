class Element {
	constructor(game) {
		this.game = game;
		this.clickable = false;
	}

	init() {}

	draw() {}

	update() {}

	unload() {}

	onResize() {}

	onHover(mouseX, mouseY) {
		if (this.clickable) {
			if (this.isMouseOver(mouseX, mouseY)) {
				this.game.canvas.style.cursor = "pointer";
				return true;
			}
		}
	}

	onClick(mouseX, mouseY) {}

	isMouseOver(mouseX, mouseY) {
		return !(this.y + this.height < mouseY || this.y > mouseY || this.x + this.width < mouseX || this.x > mouseX);
	}
}

export { Element };
