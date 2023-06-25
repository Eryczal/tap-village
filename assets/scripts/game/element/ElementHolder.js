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

	addElement(id, element) {
		this.elements[id] = element;
	}

	removeElement(id) {
		delete this.elements[id];
	}
}

export { ElementHolder };
