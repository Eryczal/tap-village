import { Scene } from "../Scene.js";
import { BuildingName } from "./elements/BuildingName.js";
import { BackButton, UpgradeButton } from "./elements/Buttons.js";
import { Menu } from "../elements/Menu.js";
import { Wood, Stone, Gold, Gem } from "../elements/Resources.js";
import { Stats } from "./elements/0/Stats.js";
import { RemoveProgress, RemoveAccount } from "./elements/0/RemoveButtons.js";
import { SawmillClick } from "./elements/1/SawmillClick.js";
import { GatheringChance, GatheringPower, BuildingPower, CriticChance, CriticPower, Workers, WorkersSpeed } from "./elements/ClickingUpgrades.js";
import { QuarryClick } from "./elements/2/QuarryClick.js";
import { MineClick } from "./elements/3/MineClick.js";

class BuildingScene extends Scene {
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

		this.elementsHolder.addElement("BuildingName", new BuildingName(this.game, menu));

		switch (this.game.buildingsManager.clickedBuilding.buildingId) {
			case 0:
				this.elementsHolder.addElement("Stats", new Stats(this.game));
				this.elementsHolder.addElement("RemoveProgress", new RemoveProgress(this.game));
				this.elementsHolder.addElement("RemoveAccount", new RemoveAccount(this.game));
				break;

			case 1:
				this.elementsHolder.addElement("BuildingClick", new SawmillClick(this.game, menu));
				this.elementsHolder.addElement("GatheringPower", new GatheringPower(this.game, menu));
				this.elementsHolder.addElement("GatheringChance", new GatheringChance(this.game, menu));
				this.elementsHolder.addElement("CriticPower", new CriticPower(this.game, menu));
				this.elementsHolder.addElement("CriticChance", new CriticChance(this.game, menu));
				this.elementsHolder.addElement("Workers", new Workers(this.game, menu));
				this.elementsHolder.addElement("WorkersSpeed", new WorkersSpeed(this.game, menu));
				break;

			case 2:
				this.elementsHolder.addElement("BuildingClick", new QuarryClick(this.game, menu));
				this.elementsHolder.addElement("GatheringPower", new GatheringPower(this.game, menu));
				this.elementsHolder.addElement("GatheringChance", new GatheringChance(this.game, menu));
				this.elementsHolder.addElement("CriticPower", new CriticPower(this.game, menu));
				this.elementsHolder.addElement("CriticChance", new CriticChance(this.game, menu));
				this.elementsHolder.addElement("Workers", new Workers(this.game, menu));
				this.elementsHolder.addElement("WorkersSpeed", new WorkersSpeed(this.game, menu));
				break;

			case 3:
				this.elementsHolder.addElement("BuildingClick", new MineClick(this.game, menu));
				this.elementsHolder.addElement("GatheringPower", new GatheringPower(this.game, menu));
				this.elementsHolder.addElement("GatheringChance", new GatheringChance(this.game, menu));
				this.elementsHolder.addElement("CriticPower", new CriticPower(this.game, menu));
				this.elementsHolder.addElement("CriticChance", new CriticChance(this.game, menu));
				this.elementsHolder.addElement("Workers", new Workers(this.game, menu));
				this.elementsHolder.addElement("WorkersSpeed", new WorkersSpeed(this.game, menu));
				break;

			case 4:
				this.elementsHolder.addElement("BuildingPower", new BuildingPower(this.game, menu));
				this.elementsHolder.addElement("CriticPower", new CriticPower(this.game, menu));
				this.elementsHolder.addElement("CriticChance", new CriticChance(this.game, menu));
				this.elementsHolder.addElement("Workers", new Workers(this.game, menu));
				this.elementsHolder.addElement("WorkersSpeed", new WorkersSpeed(this.game, menu));
				break;
		}

		this.elementsHolder.addElement("UpgradeButton", new UpgradeButton(this.game, menu));
		this.elementsHolder.addElement("BackButton", new BackButton(this.game, menu));

		super.init();
	}
}

export { BuildingScene };
