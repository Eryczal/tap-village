class MouseManager {
    constructor(game) {
        this.game = game;

        this.mouseLastPos = null;
        this.firstClick = true;
        this.touch = false;
        this.scaling = false;
        this.pinchValues = {
            x0: 0,
            x1: 0,
            y0: 0,
            y1: 0,
        };
    }

    init() {
        this.mouseDelta = 5 * this.game.pixelRatio;
        if ("ontouchstart" in window) {
            this.touch = true;
            window.addEventListener("touchstart", (event) => this.onTouchStart(event), { passive: false });
            window.addEventListener("touchmove", (event) => this.onTouchMove(event), { passive: false });
            window.addEventListener("touchend", (event) => this.onTouchEnd(event), { passive: false });
        } else {
            window.addEventListener("mousedown", (event) => this.onMouseDown(event));
            window.addEventListener("mousemove", (event) => this.onMouseMove(event));
            window.addEventListener("mouseup", (event) => this.onMouseUp(event));
            window.addEventListener("wheel", (event) => this.onScroll(event));
        }
        window.addEventListener("contextmenu", (event) => this.onContextMenu(event));
    }

    onTouchStart(event) {
        event.preventDefault();
        if (event.touches.length === 2) {
            this.scaling = true;
            this.updatePinch(event);
            this.game.sceneManager.onPinchStart(this.pinchValues);
            return;
        }
        for (let i = 0; i < event.touches.length; i++) {
            if (event) {
                this.mouseLastPos = {
                    x: event.touches[0].clientX * this.game.pixelRatio,
                    y: event.touches[0].clientY * this.game.pixelRatio,
                };

                this.game.sceneManager.onMouseDown(event.touches[i].clientX * this.game.pixelRatio, event.touches[i].clientY * this.game.pixelRatio);
            }
        }
    }

    onTouchMove(event) {
        event.preventDefault();
        if (this.scaling) {
            this.updatePinch(event);
            this.game.sceneManager.onPinch(this.pinchValues);
            return;
        }
        for (let i = 0; i < event.touches.length; i++) {
            if (this.mouseLastPos !== null) {
                if (i === 0) {
                    this.game.sceneManager.onMouseDrag(this.mouseLastPos, {
                        clientX: event.touches[0].clientX * this.game.pixelRatio,
                        clientY: event.touches[0].clientY * this.game.pixelRatio,
                    });
                }
            } else {
                this.game.canvas.style.cursor = "default";
                this.game.sceneManager.onMouseMove(this.mouseLastPos, {
                    clientX: event.touches[i].clientX * this.game.pixelRatio,
                    clientY: event.touches[i].clientY * this.game.pixelRatio,
                });
                this.game.sceneManager.onHover(event.touches[i].clientX * this.game.pixelRatio, event.touches[i].clientY * this.game.pixelRatio);
            }
        }
    }

    onTouchEnd(event) {
        event.preventDefault();
        if (this.scaling) {
            this.game.sceneManager.onPinchEnd(this.pinchValues);
            this.scaling = false;
        }
        for (let i = 0; i < event.changedTouches.length; i++) {
            if (event) {
                let diff = {
                    x: Math.abs(event.changedTouches[i].clientX * this.game.pixelRatio - this.mouseLastPos.x),
                    y: Math.abs(event.changedTouches[i].clientY * this.game.pixelRatio - this.mouseLastPos.y),
                };

                if (diff.x < this.mouseDelta && diff.y < this.mouseDelta) {
                    this.onClick({
                        clientX: event.changedTouches[i].clientX * this.game.pixelRatio,
                        clientY: event.changedTouches[i].clientY * this.game.pixelRatio,
                    });
                }

                this.game.sceneManager.onMouseUp(
                    event.changedTouches[i].clientX * this.game.pixelRatio,
                    event.changedTouches[i].clientY * this.game.pixelRatio
                );

                this.mouseLastPos = null;
            }
        }
    }

    updatePinch(event) {
        this.pinchValues = {
            x0: event.touches[0].clientX,
            x1: event.touches[1].clientX,
            y0: event.touches[0].clientY,
            y1: event.touches[1].clientY,
        };
    }

    onMouseDown(event) {
        if (event.button === 0) {
            this.mouseLastPos = {
                x: event.clientX,
                y: event.clientY,
            };

            this.game.sceneManager.onMouseDown(event.clientX, event.clientY);
        }
    }

    onMouseUp(event) {
        if (event.button === 0) {
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
    }

    onMouseMove(event) {
        if (this.mouseLastPos !== null) {
            if (event.buttons === 1) {
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

            if (this.touch) {
                document.documentElement.requestFullscreen();
                this.game.mobile = true;
            }
        }

        this.game.sceneManager.onClick(event.clientX, event.clientY);
    }

    onContextMenu(event) {
        event.preventDefault();
        this.game.sceneManager.onRightClick(event.clientX * this.game.pixelRatio, event.clientY * this.game.pixelRatio);
    }

    onScroll(event) {
        this.game.sceneManager.onScroll(event);
    }
}

export { MouseManager };
