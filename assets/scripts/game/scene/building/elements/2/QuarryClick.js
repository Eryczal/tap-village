import { QuarryBuilding } from "../../../../managers/BuildingsManager.js";
import { GatheringClick } from "../gatheringClick.js";

class QuarryClick extends GatheringClick {
	constructor(game, menu) {
		super(game, menu);

		this.text = "Zdobądź kamień";
		this.buildingClass = QuarryBuilding;
		this.resource = "stone";
	}
}

export { QuarryClick };
