import { Scene } from "../../../Scene.js";
import { Menu } from "../../../_elements/Menu.js";
import { Wood, Stone, Gold, Gem } from "../../../_elements/Resources.js";
import { OpeningChest } from "./_elements/OpeningChest.js";

class ChestScene extends Scene {
	constructor(game) {
		super(game);
	}

	init() {
		let menu = new Menu(this.game, "open");
		this.elementsHolder.addElement("menu", menu);
		this.elementsHolder.addElement("wood", new Wood(this.game));
		this.elementsHolder.addElement("stone", new Stone(this.game));
		this.elementsHolder.addElement("gold", new Gold(this.game));
		this.elementsHolder.addElement("gem", new Gem(this.game));
		this.elementsHolder.addElement("OpeningChest", new OpeningChest(this.game, menu));
	}
}

export { ChestScene };
