import { BuildingScene } from "./BuildingScene.js";
import { Stats } from "./elements/0/Stats.js";
import { RemoveProgress, RemoveAccount } from "./elements/0/RemoveButtons.js";

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
