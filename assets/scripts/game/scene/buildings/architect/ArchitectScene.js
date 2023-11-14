import { BuildingScene } from "../BuildingScene.js";
import { ArchitectShop } from "./_elements/ArchitectShop.js";

class ArchitectScene extends BuildingScene {
    constructor(game) {
        super(game);
    }

    initChild(menu) {
        this.elementsHolder.addElement("ArchitectShop", new ArchitectShop(this.game, menu));
    }

    init() {
        super.init();
    }
}

export { ArchitectScene };
