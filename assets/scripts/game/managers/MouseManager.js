class MouseManager {
	constructor(game) {
		this.game = game;

		this.mouseDelta = 5;
		this.mouseLastPos = null;
		this.firstClick = true;
	}

	init() {
		window.addEventListener("mousemove", (event) => this.onMouseMove(event));
		window.addEventListener("mousedown", (event) => this.onMouseDown(event));
		window.addEventListener("mouseup", (event) => this.onMouseUp(event));
		window.addEventListener("contextmenu", (event) => this.onContextMenu(event));
		window.addEventListener("wheel", (event) => this.onScroll(event));
	}

	onMouseDown(event) {
		this.mouseLastPos = {
			x: event.clientX,
			y: event.clientY,
		};

		this.game.sceneManager.onMouseDown(event.clientX, event.clientY);
	}

	onMouseUp(event) {
		let diff = {
			x: Math.abs(event.clientX - this.mouseLastPos.x),
			y: Math.abs(event.clientY - this.mouseLastPos.y),
		};

		if (diff.x < this.mouseDelta && diff.y < this.mouseDelta) {
			this.onClick(event);
		}

		this.game.sceneManager.onMouseUp(event.clientX, event.clientY);

		this.mouseLastPos = null;
	}

	onMouseMove(event) {
		if (this.mouseLastPos !== null) {
			if (event.buttons == 1) {
				this.game.sceneManager.onMouseDrag(this.mouseLastPos, event);
			}
		} else {
			this.game.canvas.style.cursor = "default";
			this.game.sceneManager.onMouseMove(this.mouseLastPos, event);
			this.game.sceneManager.onHover(event.clientX, event.clientY);
		}
	}

	onClick(event) {
		if (this.firstClick) {
			this.game.assetsManager.playRandomMusic();
			this.game.assetsManager.playAmbience();
			this.game.assetsManager.audioAllowed = true;
			this.firstClick = false;
		}
		this.game.sceneManager.onClick(event.clientX, event.clientY);
	}

	onContextMenu(event) {
		event.preventDefault();
		this.game.sceneManager.onRightClick(event.clientX, event.clientY);
	}

	onScroll(event) {
		this.game.sceneManager.onScroll(event);
	}
}

export { MouseManager };
