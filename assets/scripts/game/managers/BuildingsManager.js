import { Element } from "../element/Element.js";
import { database as db, ref, set, get } from "../../firebase.js";
import { buildings } from "../data/buildings.js";
import { cards } from "../data/cards.js";
import { offers } from "../data/offers.js";

class Building extends Element {
    constructor(game, buildingId, posX, posY) {
        super(game);

        this.buildingId = buildingId;
        this.posX = posX;
        this.posY = posY;
        this.lvl = 1;
        this.clickable = true;
        this.upgrading = false;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            return true;
        }
    }
}

class SawmillBuilding extends Building {
    static stats = {};
    static statsCost = {};

    constructor(game, buildingId, posX, posY, workers = null, workersCost = null, workersSpeed = null, workersSpeedCost = null) {
        super(game, buildingId, posX, posY);

        if (workers === null && workersSpeed === null) {
            let pStats = JSON.parse(JSON.stringify(buildings[buildingId].stats));
            let pStatsCost = JSON.parse(JSON.stringify(buildings[buildingId].statsCost));

            this.workers = pStats.workers;
            this.workersCost = pStatsCost.workers;
            this.workersSpeed = pStats.workersSpeed;
            this.workersSpeedCost = pStatsCost.workersSpeed;

            this.setType();
        } else {
            this.workers = workers;
            this.workersCost = workersCost;
            this.workersSpeed = workersSpeed;
            this.workersSpeedCost = workersSpeedCost;

            get(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/SawmillBuilding`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let value = snapshot.val();
                        SawmillBuilding.stats = JSON.parse(JSON.stringify(value.stats));
                        SawmillBuilding.statsCost = JSON.parse(JSON.stringify(value.statsCost));

                        offers[0].upgrades = SawmillBuilding.stats.gatheringPower;
                    } else {
                        this.setType();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        this.workersTimer = setInterval(() => {
            this.game.playerManager.wood += this.workers;
        }, this.workersSpeed * 1000);
    }

    setType() {
        if (Object.keys(SawmillBuilding.stats).length === 0 || Object.keys(SawmillBuilding.statsCost).length === 0) {
            SawmillBuilding.stats = JSON.parse(JSON.stringify(buildings[this.buildingId].stats));
            delete SawmillBuilding.stats.workers;
            delete SawmillBuilding.stats.workersSpeed;

            SawmillBuilding.statsCost = JSON.parse(JSON.stringify(buildings[this.buildingId].statsCost));
            delete SawmillBuilding.statsCost.workers;
            delete SawmillBuilding.statsCost.workersSpeed;

            set(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/SawmillBuilding`), {
                stats: SawmillBuilding.stats,
                statsCost: SawmillBuilding.statsCost,
            });

            offers[0].upgrades = SawmillBuilding.stats.gatheringPower;
        }
    }

    saveType() {
        set(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/SawmillBuilding`), {
            stats: SawmillBuilding.stats,
            statsCost: SawmillBuilding.statsCost,
        });
    }
}

class QuarryBuilding extends Building {
    static stats = {};
    static statsCost = {};

    constructor(game, buildingId, posX, posY, workers = null, workersCost = null, workersSpeed = null, workersSpeedCost = null) {
        super(game, buildingId, posX, posY);

        if (workers === null && workersSpeed === null) {
            let pStats = JSON.parse(JSON.stringify(buildings[buildingId].stats));
            let pStatsCost = JSON.parse(JSON.stringify(buildings[buildingId].statsCost));

            this.workers = pStats.workers;
            this.workersCost = pStatsCost.workers;
            this.workersSpeed = pStats.workersSpeed;
            this.workersSpeedCost = pStatsCost.workersSpeed;

            this.setType();
        } else {
            this.workers = workers;
            this.workersCost = workersCost;
            this.workersSpeed = workersSpeed;
            this.workersSpeedCost = workersSpeedCost;

            get(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/QuarryBuilding`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let value = snapshot.val();
                        QuarryBuilding.stats = JSON.parse(JSON.stringify(value.stats));
                        QuarryBuilding.statsCost = JSON.parse(JSON.stringify(value.statsCost));

                        offers[1].upgrades = QuarryBuilding.stats.gatheringPower;
                    } else {
                        this.setType();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        this.workersTimer = setInterval(() => {
            this.game.playerManager.stone += this.workers;
        }, this.workersSpeed * 1000);
    }

    setType() {
        if (Object.keys(QuarryBuilding.stats).length === 0 || Object.keys(QuarryBuilding.statsCost).length === 0) {
            QuarryBuilding.stats = JSON.parse(JSON.stringify(buildings[this.buildingId].stats));
            delete QuarryBuilding.stats.workers;
            delete QuarryBuilding.stats.workersSpeed;

            QuarryBuilding.statsCost = JSON.parse(JSON.stringify(buildings[this.buildingId].statsCost));
            delete QuarryBuilding.statsCost.workers;
            delete QuarryBuilding.statsCost.workersSpeed;

            set(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/QuarryBuilding`), {
                stats: QuarryBuilding.stats,
                statsCost: QuarryBuilding.statsCost,
            });

            offers[1].upgrades = QuarryBuilding.stats.gatheringPower;
        }
    }

    saveType() {
        set(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/QuarryBuilding`), {
            stats: QuarryBuilding.stats,
            statsCost: QuarryBuilding.statsCost,
        });
    }
}

class MineBuilding extends Building {
    static stats = {};
    static statsCost = {};

    constructor(game, buildingId, posX, posY, workers = null, workersCost = null, workersSpeed = null, workersSpeedCost = null) {
        super(game, buildingId, posX, posY);

        if (workers === null && workersSpeed === null) {
            let pStats = JSON.parse(JSON.stringify(buildings[buildingId].stats));
            let pStatsCost = JSON.parse(JSON.stringify(buildings[buildingId].statsCost));

            this.workers = pStats.workers;
            this.workersCost = pStatsCost.workers;
            this.workersSpeed = pStats.workersSpeed;
            this.workersSpeedCost = pStatsCost.workersSpeed;

            this.setType();
        } else {
            this.workers = workers;
            this.workersCost = workersCost;
            this.workersSpeed = workersSpeed;
            this.workersSpeedCost = workersSpeedCost;

            get(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/MineBuilding`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let value = snapshot.val();
                        MineBuilding.stats = JSON.parse(JSON.stringify(value.stats));
                        MineBuilding.statsCost = JSON.parse(JSON.stringify(value.statsCost));

                        offers[2].upgrades = MineBuilding.stats.gatheringPower;
                    } else {
                        this.setType();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        this.workersTimer = setInterval(() => {
            this.game.playerManager.gold += this.workers;
        }, this.workersSpeed * 1000);
    }

    setType() {
        if (Object.keys(MineBuilding.stats).length === 0 || Object.keys(MineBuilding.statsCost).length === 0) {
            MineBuilding.stats = JSON.parse(JSON.stringify(buildings[this.buildingId].stats));
            delete MineBuilding.stats.workers;
            delete MineBuilding.stats.workersSpeed;

            MineBuilding.statsCost = JSON.parse(JSON.stringify(buildings[this.buildingId].statsCost));
            delete MineBuilding.statsCost.workers;
            delete MineBuilding.statsCost.workersSpeed;

            set(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/MineBuilding`), {
                stats: MineBuilding.stats,
                statsCost: MineBuilding.statsCost,
            });

            offers[2].upgrades = MineBuilding.stats.gatheringPower;
        }
    }

    saveType() {
        set(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/MineBuilding`), {
            stats: MineBuilding.stats,
            statsCost: MineBuilding.statsCost,
        });
    }
}

class WorkshopBuilding extends Building {
    static stats = {};
    static statsCost = {};

    constructor(game, buildingId, posX, posY, workers = null, workersCost = null, workersSpeed = null, workersSpeedCost = null) {
        super(game, buildingId, posX, posY);

        if (workers === null && workersSpeed === null) {
            let pStats = JSON.parse(JSON.stringify(buildings[buildingId].stats));
            let pStatsCost = JSON.parse(JSON.stringify(buildings[buildingId].statsCost));

            this.workers = pStats.workers;
            this.workersCost = pStatsCost.workers;
            this.workersSpeed = pStats.workersSpeed;
            this.workersSpeedCost = pStatsCost.workersSpeed;

            this.setType();
        } else {
            this.workers = workers;
            this.workersCost = workersCost;
            this.workersSpeed = workersSpeed;
            this.workersSpeedCost = workersSpeedCost;

            get(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/WorkshopBuilding`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let value = snapshot.val();
                        WorkshopBuilding.stats = JSON.parse(JSON.stringify(value.stats));
                        WorkshopBuilding.statsCost = JSON.parse(JSON.stringify(value.statsCost));
                    } else {
                        this.setType();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        this.workersTimer = setInterval(() => {
            if (this.game.constructionManager.constructionState === 1) {
                let critic = Math.random() < cards[3].upgrades[this.game.playerManager.cards[3].lvl] / 100;
                let amount = critic ? this.workers * 2 : this.workers;
                this.game.constructionManager.addProgress("worker", amount);
                this.game.sceneManager.currentScene?.elementsHolder?.elements?.map?.addWorkerClick(critic, amount);
            }
        }, this.workersSpeed * 1000);
    }

    setType() {
        if (Object.keys(WorkshopBuilding.stats).length === 0 || Object.keys(WorkshopBuilding.statsCost).length === 0) {
            WorkshopBuilding.stats = JSON.parse(JSON.stringify(buildings[this.buildingId].stats));
            delete WorkshopBuilding.stats.workers;
            delete WorkshopBuilding.stats.workersSpeed;

            WorkshopBuilding.statsCost = JSON.parse(JSON.stringify(buildings[this.buildingId].statsCost));
            delete WorkshopBuilding.statsCost.workers;
            delete WorkshopBuilding.statsCost.workersSpeed;
        }
    }

    saveType() {
        set(ref(db, `players/${this.game.playerManager.playerId}/buildingTypes/WorkshopBuilding`), {
            stats: WorkshopBuilding.stats,
            statsCost: WorkshopBuilding.statsCost,
        });
    }
}

class VaultBuilding extends Building {
    static cards = [];

    constructor(game, buildingId, posX, posY) {
        super(game, buildingId, posX, posY);
    }

    init() {
        this.menu = 0;
    }
}

class TraderBuilding extends Building {
    constructor(game, buildingId, posX, posY, offers = null) {
        super(game, buildingId, posX, posY);

        if (offers === null) {
            this.offers = [];

            this.changeOffers("all");
        } else {
            this.offers = JSON.parse(JSON.stringify(offers));
        }
    }

    changeOffers(offer) {
        if (offer === "all") {
            for (let i = 0; i < 3; i++) {
                this.generateOffer(i);
            }
        } else {
            this.generateOffer(offer);
        }
    }

    generateOffer(id) {
        let offer = offers[Math.floor(Math.random() * offers.length)];
        let amountOffset = Math.floor(Math.random() * (offer.amountOffset * (offer.upgrades + 1) + 1));
        amountOffset = Math.random() < 0.5 ? -amountOffset : amountOffset;
        let costOffset = Math.random() < 0.5 ? -offer.costOffset : offer.costOffset;

        let traderOffer = {
            type: offer.type,
            amount: offer.amount * (offer.upgrades + 1) + amountOffset,
            reward: 1,
        };

        traderOffer.reward = Math.floor(traderOffer.amount * (offer.cost + costOffset)) + this.lvl;

        this.offers[id] = traderOffer;
    }
}

class BuildingsManager {
    constructor(game) {
        this.game = game;
        this.buildings = [];
        this.clickedBuilding;
    }

    init(playerId) {
        this.playerId = playerId;

        this.loadBuildingData()
            .then((buildingData) => {
                for (let building of buildingData) {
                    switch (building.buildingId) {
                        case 1:
                            this.buildings[building.position] = new SawmillBuilding(
                                this.game,
                                building.buildingId,
                                building.posX,
                                building.posY,
                                building.workers,
                                building.workersCost,
                                building.workersSpeed,
                                building.workersSpeedCost
                            );
                            break;

                        case 2:
                            this.buildings[building.position] = new QuarryBuilding(
                                this.game,
                                building.buildingId,
                                building.posX,
                                building.posY,
                                building.workers,
                                building.workersCost,
                                building.workersSpeed,
                                building.workersSpeedCost
                            );
                            break;

                        case 3:
                            this.buildings[building.position] = new MineBuilding(
                                this.game,
                                building.buildingId,
                                building.posX,
                                building.posY,
                                building.workers,
                                building.workersCost,
                                building.workersSpeed,
                                building.workersSpeedCost
                            );
                            break;

                        case 4:
                            this.buildings[building.position] = new WorkshopBuilding(
                                this.game,
                                building.buildingId,
                                building.posX,
                                building.posY,
                                building.workers,
                                building.workersCost,
                                building.workersSpeed,
                                building.workersSpeedCost
                            );
                            break;

                        case 5:
                            this.buildings[building.position] = new VaultBuilding(this.game, building.buildingId, building.posX, building.posY);
                            break;

                        case 6:
                            this.buildings[building.position] = new TraderBuilding(
                                this.game,
                                building.buildingId,
                                building.posX,
                                building.posY,
                                building.offers
                            );
                            break;

                        default:
                            this.buildings[building.position] = new Building(this.game, building.buildingId, building.posX, building.posY);
                            break;
                    }

                    this.buildings[building.position].position = building.position;
                    this.buildings[building.position].lvl = building.lvl;

                    if (building.upgrading === true) {
                        this.buildings[building.position].clickable = false;
                        this.buildings[building.position].upgrading = true;
                        this.game.constructionManager.building = this.buildings[building.position];
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    loadBuildingData() {
        return new Promise((resolve, reject) => {
            get(ref(db, `players/${this.playerId}/buildings/`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let buildingData = snapshot.val();
                        resolve(buildingData);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    countBuilding(id) {
        let count = 0;

        for (let building of this.buildings) {
            if (building.buildingId === id) {
                count++;
            }
        }

        if (this.game.constructionManager.constructionState === 1 && this.game.constructionManager.constructionType === "build") {
            if (this.game.constructionManager.buildingId === id) {
                count++;
            }
        }

        return count;
    }

    addBuilding(buildingId, posX, posY) {
        switch (buildingId) {
            case 1:
                this.buildings.push(new SawmillBuilding(this.game, buildingId, posX, posY));
                break;

            case 2:
                this.buildings.push(new QuarryBuilding(this.game, buildingId, posX, posY));
                break;

            case 3:
                this.buildings.push(new MineBuilding(this.game, buildingId, posX, posY));
                break;

            case 4:
                this.buildings.push(new WorkshopBuilding(this.game, buildingId, posX, posY));
                break;

            case 5:
                this.buildings.push(new VaultBuilding(this.game, buildingId, posX, posY));
                break;

            case 6:
                this.buildings.push(new TraderBuilding(this.game, buildingId, posX, posY));
                break;

            default:
                this.buildings.push(new Building(this.game, buildingId, posX, posY));
                break;
        }

        this.buildings[this.buildings.length - 1].position = this.buildings.length - 1;
        this.saveBuilding(this.buildings.length - 1);
    }

    saveBuilding(id) {
        let building = this.buildings[id];
        let buildingStore = {
            buildingId: building.buildingId,
            position: building.position,
            lvl: building.lvl,
            posX: building.posX,
            posY: building.posY,
            upgrading: building.upgrading,
        };

        switch (building.buildingId) {
            case 1:
            case 2:
            case 3:
            case 4:
                buildingStore.workers = building.workers || 0;
                buildingStore.workersCost = building.workersCost;
                buildingStore.workersSpeed = building.workersSpeed;
                buildingStore.workersSpeedCost = building.workersSpeedCost;
                break;
            case 5:
                break;
            case 6:
                buildingStore.offers = building.offers;
                break;
        }

        set(ref(db, `players/${this.game.playerManager.playerId}/buildings/${building.position}`), buildingStore);
    }

    onClick(mouseX, mouseY) {
        for (let i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].onClick(mouseX, mouseY)) {
                this.clickedBuilding = this.buildings[i];
                this.game.sceneManager.changeScene(buildings[this.buildings[i].buildingId].image);
                return true;
            }
        }
    }
}

export { BuildingsManager, SawmillBuilding, QuarryBuilding, MineBuilding, WorkshopBuilding, VaultBuilding, TraderBuilding };
