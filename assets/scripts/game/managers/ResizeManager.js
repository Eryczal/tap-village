class ResizeManager {
	constructor(game) {
		this.game = game;
	}

	init() {
		window.addEventListener("resize", () => this.handle());

		this.handle();
	}

	handle() {
		let canvas = this.game.canvas;

		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;

		canvas.style.height = window.innerHeight;
		canvas.style.width = window.innerWidth;

		this.game.sceneManager.onResize();
	}
}

export { ResizeManager };
