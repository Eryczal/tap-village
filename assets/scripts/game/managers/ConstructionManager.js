import { buildings } from "../data/buildings.js";
import { cards } from "../data/cards.js";
import { WorkshopBuilding } from "./BuildingsManager.js";
import { Element } from "../element/Element.js";
import { map } from "../scene/main/_elements/Map.js";

class ConstructionManager extends Element {
    constructor(game) {
        super(game);

        this.constructionState = null;
    }

    init() {}

    setConstruction(buildingId, type = "build", building) {
        this.buildingId = buildingId;
        this.constructionType = type;
        this.constructionState = 0;
        if (building) {
            this.building = building;
            this.building.upgrading = true;
            this.building.clickable = false;
        }
    }

    setBuild(posX, posY) {
        this.constructionState = 1;
        this.constructionX = posX === undefined ? this.building.posX : posX;
        this.constructionY = posY === undefined ? this.building.posY : posY;
        this.clickProgress = 0;
        this.neededClicks =
            this.constructionType === "build" ? buildings[this.buildingId].clicks : buildings[this.buildingId].upgrades[this.building.lvl - 1].clicks;
        this.neededClicks = Math.ceil(this.neededClicks - (this.neededClicks * cards[12].upgrades[this.game.playerManager.cards[12].lvl]) / 100);
        this.clickable = true;

        for (let y = posY; y < posY + buildings[this.buildingId].size.y; y++) {
            for (let x = posX; x < posX + buildings[this.buildingId].size.x; x++) {
                map[y][x] = 5;
            }
        }

        this.game.assetsManager.playAudio("constructionStart", true);
        this.saveConstruction();
    }

    saveConstruction() {
        let constructionData = {
            buildingId: this.buildingId,
            constructionType: this.constructionType,
            constructionState: this.constructionState,
            constructionX: this.constructionX,
            constructionY: this.constructionY,
            clickProgress: this.clickProgress,
            neededClicks: this.neededClicks,
        };

        if (this.constructionType === "upgrade") {
            this.game.buildingsManager.saveBuilding(this.building.position);
        }

        this.game.playerManager.updatePlayerData("player");
        this.game.playerManager.updatePlayerData("construction", constructionData);
    }

    loadConstruction(data) {
        this.buildingId = data.buildingId;
        this.constructionType = data.constructionType;
        this.constructionState = data.constructionState;
        this.constructionX = data.constructionX;
        this.constructionY = data.constructionY;
        this.clickProgress = data.clickProgress;
        this.neededClicks = data.neededClicks;

        this.clickable = true;
    }

    addProgress(type, workers) {
        let audio = Math.floor(Math.random() * 4) + 1;
        let critic = false;
        let amount = 1;

        if (type === "click" && typeof WorkshopBuilding.stats.criticalChance !== "undefined") {
            critic = Math.random() < WorkshopBuilding.stats.criticalChance / 100;
            amount = critic ? WorkshopBuilding.stats.criticalPower : WorkshopBuilding.stats.buildingPower;
        }

        if (type === "click") {
            this.clickProgress += amount;
            this.game.assetsManager.playAudio("build" + audio, true);
        } else if (type === "worker" && workers > 0) {
            this.clickProgress += workers;
        }

        if (this.clickProgress >= this.neededClicks) {
            if (this.constructionType === "build") {
                this.game.buildingsManager.addBuilding(this.buildingId, this.constructionX, this.constructionY);
            } else if (this.constructionType === "upgrade") {
                this.building.lvl++;
                this.building.upgrading = false;
                this.building.clickable = true;
                this.game.buildingsManager.saveBuilding(this.building.position);
            }
            this.constructionState = null;
            this.clickable = false;
            this.game.playerManager.updatePlayerData("construction", null);
        }

        return {
            critic: critic,
            amount: amount,
        };
    }
}

export { ConstructionManager };
