import { BuildingScene } from "../BuildingScene.js";
import { ChangePositionButton, RemoveObjectButton } from "./_elements/CraftsmanButtons.js";

class CraftsmanScene extends BuildingScene {
    constructor(game) {
        super(game);
    }

    initChild(menu) {
        this.menu = menu;
        this.elementsHolder.addElement("ChangePositionButton", new ChangePositionButton(this.game, menu));
        this.elementsHolder.addElement("RemoveObjectButton", new RemoveObjectButton(this.game, menu));
    }

    init() {
        super.init();
    }

    onResize() {
        super.onResize();
        this.elementsHolder.removeElement("ChangePositionButton");
        this.elementsHolder.removeElement("RemoveObjectButton");
        this.elementsHolder.addElement("ChangePositionButton", new ChangePositionButton(this.game, this.menu));
        this.elementsHolder.addElement("RemoveObjectButton", new RemoveObjectButton(this.game, this.menu));
    }
}

export { CraftsmanScene };
