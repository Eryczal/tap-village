import { Scene } from "../Scene.js";
import { Menu } from "./elements/Menu.js";
import { BuildingsShop } from "./elements/BuildingsShop.js";
import { Wood, Stone, Gold, Gem } from "./elements/Resource.js";

class ShopScene extends Scene {
	constructor(game) {
		super(game);
	}

	init() {
		let menu = new Menu(this.game);

		this.elementsHolder.addElement("buildingsShop", new BuildingsShop(this.game, menu));
		this.elementsHolder.addElement("menu", menu);
		this.elementsHolder.addElement("wood", new Wood(this.game));
		this.elementsHolder.addElement("stone", new Stone(this.game));
		this.elementsHolder.addElement("gold", new Gold(this.game));
		this.elementsHolder.addElement("gem", new Gem(this.game));

		super.init();
	}
}

export { ShopScene };
