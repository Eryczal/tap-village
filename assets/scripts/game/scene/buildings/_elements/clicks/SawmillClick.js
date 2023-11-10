import { SawmillBuilding } from "../../../../managers/BuildingsManager.js";
import { GatheringClick } from "../GatheringClick.js";

class SawmillClick extends GatheringClick {
    constructor(game, menu) {
        super(game, menu);

        this.text = "Zdobądź drewno";
        this.buildingClass = SawmillBuilding;
        this.resource = "wood";
        this.chanceCardId = 0;
        this.powerCardId = 4;
    }
}

export { SawmillClick };
