class MouseManager {
    constructor(game) {
        this.game = game;

        this.mouseDelta = 5;
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
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY,
                };

                this.game.sceneManager.onMouseDown(event.touches[i].clientX, event.touches[i].clientY);
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
                    this.game.sceneManager.onMouseDrag(this.mouseLastPos, event.touches[0]);
                }
            } else {
                this.game.canvas.style.cursor = "default";
                this.game.sceneManager.onMouseMove(this.mouseLastPos, event.touches[i]);
                this.game.sceneManager.onHover(event.touches[i].clientX, event.touches[i].clientY);
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
                    x: Math.abs(event.changedTouches[i].clientX - this.mouseLastPos.x),
                    y: Math.abs(event.changedTouches[i].clientY - this.mouseLastPos.y),
                };

                if (diff.x < this.mouseDelta && diff.y < this.mouseDelta) {
                    this.onClick(event.changedTouches[i]);
                }

                this.game.sceneManager.onMouseUp(event.changedTouches[i].clientX, event.changedTouches[i].clientY);

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
                let elem = document.documentElement;
                elem.requestFullscreen();
            }
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
