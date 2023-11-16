import { BuildingScene } from "../BuildingScene.js";
import { PrestigeStats } from "./_elements/PrestigeStats.js";
import { TakeGemsButton, SacrificeButton } from "./_elements/MonumentButtons.js";

class MonumentScene extends BuildingScene {
    constructor(game) {
        super(game);
    }

    initChild(menu) {
        this.elementsHolder.addElement("PrestigeStats", new PrestigeStats(this.game, menu));
        this.elementsHolder.addElement("TakeGemsButton", new TakeGemsButton(this.game, menu));
        this.elementsHolder.addElement("SacrificeButton", new SacrificeButton(this.game, menu));
    }

    init() {
        super.init();
    }
}

export { MonumentScene };
