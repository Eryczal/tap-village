import { MineBuilding } from "../../../../managers/BuildingsManager.js";
import { GatheringClick } from "../gatheringClick.js";

class MineClick extends GatheringClick {
	constructor(game, menu) {
		super(game, menu);

		this.text = "Zdobądź złoto";
		this.buildingClass = MineBuilding;
		this.resource = "gold";
	}
}

export { MineClick };
