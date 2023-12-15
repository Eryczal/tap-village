import { Scene } from "../Scene.js";
import { Menu } from "../_elements/Menu.js";
import { Wood, Stone, Gold, Coin, Gem } from "../_elements/Resources.js";
import { SettingsBackground } from "./_elements/SettingsBackground.js";
import { ChangeMusicButton, ChangeSoundButton, FullScreenButton, LogOffButton } from "./_elements/SettingsButtons.js";

class SettingsScene extends Scene {
    constructor(game) {
        super(game);
    }

    init() {
        this.menu = new Menu(this.game, "open");

        this.elementsHolder.addElement("menu", this.menu);
        this.elementsHolder.addElement("wood", new Wood(this.game));
        this.elementsHolder.addElement("stone", new Stone(this.game));
        this.elementsHolder.addElement("gold", new Gold(this.game));
        this.elementsHolder.addElement("coin", new Coin(this.game));
        this.elementsHolder.addElement("gem", new Gem(this.game));
        this.elementsHolder.addElement("SettingsBackground", new SettingsBackground(this.game, this.menu));
        this.elementsHolder.addElement("ChangeMusicButton", new ChangeMusicButton(this.game, this.menu));
        this.elementsHolder.addElement("ChangeSoundButton", new ChangeSoundButton(this.game, this.menu));
        this.elementsHolder.addElement("FullScreenButton", new FullScreenButton(this.game, this.menu));
        this.elementsHolder.addElement("LogOffButton", new LogOffButton(this.game, this.menu));

        super.init();
    }

    onResize() {
        super.onResize();
        this.elementsHolder.removeElement("ChangeMusicButton");
        this.elementsHolder.removeElement("ChangeSoundButton");
        this.elementsHolder.removeElement("FullScreenButton");
        this.elementsHolder.removeElement("LogOffButton");
        this.elementsHolder.addElement("ChangeMusicButton", new ChangeMusicButton(this.game, this.menu));
        this.elementsHolder.addElement("ChangeSoundButton", new ChangeSoundButton(this.game, this.menu));
        this.elementsHolder.addElement("FullScreenButton", new FullScreenButton(this.game, this.menu));
        this.elementsHolder.addElement("LogOffButton", new LogOffButton(this.game, this.menu));
    }
}

export { SettingsScene };
