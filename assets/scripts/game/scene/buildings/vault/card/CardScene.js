import { Scene } from "../../../Scene.js";
import { Menu } from "../../../_elements/Menu.js";
import { Wood, Stone, Gold, Coin, Gem } from "../../../_elements/Resources.js";
import { CardStats } from "./_elements/CardStats.js";

class CardScene extends Scene {
    constructor(game) {
        super(game);
    }

    init() {
        let menu = new Menu(this.game, "open");
        this.elementsHolder.addElement("menu", menu);
        this.elementsHolder.addElement("wood", new Wood(this.game));
        this.elementsHolder.addElement("stone", new Stone(this.game));
        this.elementsHolder.addElement("gold", new Gold(this.game));
        this.elementsHolder.addElement("coin", new Coin(this.game));
        this.elementsHolder.addElement("gem", new Gem(this.game));
        this.elementsHolder.addElement("CardStats", new CardStats(this.game, menu));
    }
}

export { CardScene };
