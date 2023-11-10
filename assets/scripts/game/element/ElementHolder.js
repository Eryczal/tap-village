class ElementHolder {
    constructor(game) {
        this.game = game;
        this.elements = {};
    }

    get list() {
        return this.elements;
    }

    init() {
        for (let elem in this.elements) {
            this.elements[elem]?.init();
        }
    }

    update() {
        for (let elem in this.elements) {
            this.elements[elem]?.update();
        }
    }

    draw() {
        for (let elem in this.elements) {
            this.elements[elem]?.draw();
        }
    }

    unload() {
        for (let elem in this.elements) {
            this.elements[elem]?.unload();
        }
    }

    onResize() {
        for (let elem in this.elements) {
            this.elements[elem]?.onResize();
        }
    }

    onHover(mouseX, mouseY) {
        for (let elem in this.elements) {
            this.elements[elem]?.onHover(mouseX, mouseY);
        }
    }

    onClick(mouseX, mouseY) {
        for (let elem in this.elements) {
            this.elements[elem]?.onClick(mouseX, mouseY);
        }
    }

    onRightClick(mouseX, mouseY) {
        for (let elem in this.elements) {
            this.elements[elem]?.onRightClick(mouseX, mouseY);
        }
    }

    onScroll(event) {
        for (let elem in this.elements) {
            this.elements[elem]?.onScroll(event);
        }
    }

    addElement(id, element, init = false) {
        this.elements[id] = element;
        if (init) {
            this.elements[id].init();
        }
    }

    removeElement(id) {
        delete this.elements[id];
    }
}

export { ElementHolder };
