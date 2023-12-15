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
        let pixelRatio = Math.ceil(window.devicePixelRatio) || 1;

        canvas.height = window.innerHeight * pixelRatio;
        canvas.width = window.innerWidth * pixelRatio;

        canvas.style.height = window.innerHeight;
        canvas.style.width = window.innerWidth;

        this.game.pixelRatio = pixelRatio;

        this.game.sceneManager.onResize();
    }
}

export { ResizeManager };
