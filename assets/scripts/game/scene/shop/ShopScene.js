import { Scene } from "../Scene.js";
import { Menu } from "../_elements/Menu.js";
import { BuildingsShop } from "./_elements/BuildingsShop.js";
import { Wood, Stone, Gold, Coin, Gem } from "../_elements/Resources.js";

class ShopScene extends Scene {
    constructor(game) {
        super(game);
    }

    init() {
        let menu = new Menu(this.game, "open");

        this.elementsHolder.addElement("menu", menu);
        this.elementsHolder.addElement("buildingsShop", new BuildingsShop(this.game, menu));
        this.elementsHolder.addElement("wood", new Wood(this.game));
        this.elementsHolder.addElement("stone", new Stone(this.game));
        this.elementsHolder.addElement("gold", new Gold(this.game));
        this.elementsHolder.addElement("coin", new Coin(this.game));
        this.elementsHolder.addElement("gem", new Gem(this.game));

        super.init();
    }

    onScroll(event) {
        this.elementsHolder.elements.buildingsShop.onScroll(event);
    }
}

export { ShopScene };
