import { BuildingScene } from "../BuildingScene.js";
import { Stats } from "./_elements/Stats.js";
import { RemoveProgress, RemoveAccount } from "./_elements/RemoveButtons.js";

class CastleScene extends BuildingScene {
    constructor(game) {
        super(game);
    }

    initChild(menu) {
        this.elementsHolder.addElement("Stats", new Stats(this.game));
        this.elementsHolder.addElement("RemoveProgress", new RemoveProgress(this.game));
        this.elementsHolder.addElement("RemoveAccount", new RemoveAccount(this.game));
    }

    init() {
        super.init();
    }
}

export { CastleScene };
