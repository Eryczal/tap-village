import { SawmillBuilding } from "../../../../managers/BuildingsManager.js";
import { GatheringClick } from "../gatheringClick.js";

class SawmillClick extends GatheringClick {
	constructor(game, menu) {
		super(game, menu);

		this.text = "Zdobądź drewno";
		this.buildingClass = SawmillBuilding;
		this.resource = "wood";
	}
}

export { SawmillClick };
