import { Scene } from "../Scene.js";
import { Map } from "./_elements/Map.js";
import { Menu } from "../_elements/Menu.js";
import { Wood, Stone, Gold, Gem } from "../_elements/Resources.js";

class MainScene extends Scene {
    constructor(game) {
        super(game);
    }

    init() {
        let menu = new Menu(this.game);

        this.elementsHolder.addElement("menu", menu);
        this.elementsHolder.addElement("map", new Map(this.game, menu));
        this.elementsHolder.addElement("wood", new Wood(this.game));
        this.elementsHolder.addElement("stone", new Stone(this.game));
        this.elementsHolder.addElement("gold", new Gold(this.game));
        this.elementsHolder.addElement("gem", new Gem(this.game));

        super.init();
    }

    onMouseDrag(mouseLastPos, event) {
        this.elementsHolder.elements.map?.onMouseDrag(mouseLastPos, event);
    }

    onMouseMove(mouseLastPos, event) {
        this.elementsHolder.elements.map?.onMouseMove(mouseLastPos, event);
    }

    onMouseDown(mouseX, mouseY) {
        this.elementsHolder.elements.map?.onMouseDown(mouseX);
    }

    onMouseUp(mouseX, mouseY) {
        this.elementsHolder.elements.map?.onMouseUp();
    }

    onRightClick(mouseX, mouseY) {
        this.elementsHolder.elements.map?.onRightClick(mouseX, mouseY);
    }

    onScroll(event) {
        this.elementsHolder.elements.map?.onScroll(event);
    }
}

export { MainScene };
