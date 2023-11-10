import { MineBuilding } from "../../../../managers/BuildingsManager.js";
import { GatheringClick } from "../GatheringClick.js";

class MineClick extends GatheringClick {
    constructor(game, menu) {
        super(game, menu);

        this.text = "Zdobądź złoto";
        this.buildingClass = MineBuilding;
        this.resource = "gold";
        this.chanceCardId = 2;
        this.powerCardId = 6;
    }
}

export { MineClick };
