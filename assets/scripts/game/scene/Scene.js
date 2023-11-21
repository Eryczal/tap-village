import { ElementHolder } from "../element/ElementHolder.js";

class Scene {
    constructor(game) {
        this.game = game;
        this.elementsHolder = new ElementHolder(game);
        this.data = {};
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

    onMouseDrag(mouseLastPos, event) {
        this.elementsHolder.onMouseDrag(mouseLastPos, event);
    }

    onMouseMove() {}

    onMouseDown(mouseX, mouseY) {
        this.elementsHolder.onMouseDown(mouseX, mouseY);
    }

    onMouseUp(mouseX, mouseY) {
        this.elementsHolder.onMouseUp(mouseX, mouseY);
    }

    onRightClick(mouseX, mouseY) {
        this.elementsHolder.onRightClick(mouseX, mouseY);
    }

    onScroll(event) {
        this.elementsHolder.onScroll(event);
    }

    onPinchStart(values) {
        this.elementsHolder.onPinchStart(values);
    }

    onPinch(values) {
        this.elementsHolder.onPinch(values);
    }

    onPinchEnd(values) {
        this.elementsHolder.onPinchEnd(values);
    }
}

export { Scene };
