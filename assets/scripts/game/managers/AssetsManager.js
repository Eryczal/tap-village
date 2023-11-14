const imagesPath = {
    grassTile: "assets/images/tiles/grass.png",
    grassTile2: "assets/images/tiles/grass2.png",
    grassTile3: "assets/images/tiles/grass3.png",

    woodIcon: "assets/images/icons/wood.png",
    stoneIcon: "assets/images/icons/stone.png",
    goldIcon: "assets/images/icons/gold.png",
    gemIcon: "assets/images/icons/gem.png",
    coinIcon: "assets/images/icons/coin.png",

    castle: "assets/images/buildings/castle.png",
    castleBackground: "assets/images/buildings/castle-bg.png",
    sawmill: "assets/images/buildings/sawmill.png",
    sawmillBackground: "assets/images/buildings/sawmill-bg.png",
    quarry: "assets/images/buildings/quarry.png",
    quarryBackground: "assets/images/buildings/quarry-bg.png",
    mine: "assets/images/buildings/mine.png",
    mineBackground: "assets/images/buildings/mine-bg.png",
    workshop: "assets/images/buildings/workshop.png",
    workshopBackground: "assets/images/buildings/workshop-bg.png",
    vault: "assets/images/buildings/vault.png",
    vaultBackground: "assets/images/buildings/vault-bg.png",
    trader: "assets/images/buildings/trader.png",
    traderBackground: "assets/images/buildings/trader-bg.png",
    craftsman: "assets/images/buildings/craftsman.png",
    craftsmanBackground: "assets/images/buildings/craftsman-bg.png",
    architect: "assets/images/buildings/architect.png",
    architectBackground: "assets/images/buildings/architect-bg.png",
    monument: "assets/images/buildings/monument.png",
    monumentBackground: "assets/images/buildings/monument-bg.png",

    menu: "assets/images/ui/menu.png",
    shopButton: "assets/images/ui/shop-button.png",
    shop: "assets/images/ui/shop.png",
    buyButton: "assets/images/ui/buy-button.png",
    upgradeButton: "assets/images/ui/upgrade-button.png",
    redButton: "assets/images/ui/red-button.png",
    buildingClick: "assets/images/ui/building-click.png",
    buildingSelect: "assets/images/ui/building-select.png",

    tree: "assets/images/objects/tree.png",
    tree2: "assets/images/objects/tree2.png",
    water: "assets/images/objects/water.png",
    water2: "assets/images/objects/water2.png",
    stone: "assets/images/objects/stone.png",
    stone2: "assets/images/objects/stone2.png",
    td1: "assets/images/objects/td1.png",
    td2: "assets/images/objects/td2.png",
    td3: "assets/images/objects/td3.png",
    td4: "assets/images/objects/td4.png",
    td5: "assets/images/objects/td5.png",
    td6: "assets/images/objects/td6.png",
    td7: "assets/images/objects/td7.png",
    td8: "assets/images/objects/td8.png",
    td9: "assets/images/objects/td9.png",
    td10: "assets/images/objects/td10.png",
    td11: "assets/images/objects/td11.png",
    td12: "assets/images/objects/td12.png",

    commonChest: "assets/images/chests/common.png",
    rareChest: "assets/images/chests/rare.png",
    epicChest: "assets/images/chests/epic.png",
    legendaryChest: "assets/images/chests/legendary.png",

    woodChanceCard: "assets/images/cards/wood-chance.png",
    stoneChanceCard: "assets/images/cards/stone-chance.png",
    goldChanceCard: "assets/images/cards/gold-chance.png",
    workersCard: "assets/images/cards/workers.png",
    woodPowerCard: "assets/images/cards/wood-power.png",
    stonePowerCard: "assets/images/cards/stone-power.png",
    goldPowerCard: "assets/images/cards/gold-power.png",
    gemsChanceCard: "assets/images/cards/gems-chance.png",
    woodCostCard: "assets/images/cards/wood-cost.png",
    stoneCostCard: "assets/images/cards/stone-cost.png",
    goldCostCard: "assets/images/cards/gold-cost.png",
    rareCardsCard: "assets/images/cards/rare-cards.png",
    clickReduceCard: "assets/images/cards/click-reduce.png",

    cardBack: "assets/images/cards/back.png",
};

const audioPath = {
    click: "assets/audio/sound/click.mp3",
    click2: "assets/audio/sound/click2.mp3",

    treeDestroy: "assets/audio/sound/tree-destroy.mp3",
    stoneDestroy: "assets/audio/sound/stone-destroy.mp3",

    build1: "assets/audio/sound/build.mp3",
    build2: "assets/audio/sound/build2.mp3",
    build3: "assets/audio/sound/build3.mp3",
    build4: "assets/audio/sound/build4.mp3",

    treeHit1: "assets/audio/sound/tree-hit.mp3",
    treeHit2: "assets/audio/sound/tree-hit2.mp3",
    treeHit3: "assets/audio/sound/tree-hit3.mp3",
    treeHit4: "assets/audio/sound/tree-hit4.mp3",
    stoneHit1: "assets/audio/sound/stone-hit.mp3",
    stoneHit2: "assets/audio/sound/stone-hit2.mp3",

    miss1: "assets/audio/sound/miss.mp3",
    miss2: "assets/audio/sound/miss2.mp3",
    gather1: "assets/audio/sound/gather.mp3",
    gather2: "assets/audio/sound/gather2.mp3",
    gather3: "assets/audio/sound/gather3.mp3",

    trade: "assets/audio/sound/trade.mp3",
    card: "assets/audio/sound/card.mp3",
    upgrade: "assets/audio/sound/upgrade.mp3",
    water: "assets/audio/sound/water.mp3",

    constructionStart: "assets/audio/sound/construction-start.mp3",

    crickets: "assets/audio/crickets.mp3",
    birds: "assets/audio/birds.mp3",

    dawnMusic1: "assets/audio/dawn-music.mp3",
    dawnMusic2: "assets/audio/dawn-music2.mp3",
    dayMusic1: "assets/audio/day-music.mp3",
    dayMusic2: "assets/audio/day-music2.mp3",
    duskMusic1: "assets/audio/dusk-music.mp3",
    duskMusic2: "assets/audio/dusk-music2.mp3",
    nightMusic1: "assets/audio/night-music.mp3",
};

class AssetsManager {
    constructor(game) {
        this.game = game;

        this.images = {};
        this.audio = {};
        this.audioAllowed = false;
        this.playingMusic = false;
        this.musicCheckTimeout = null;
        this.playingAmbience = "";
    }

    async loadAssets() {
        let loadPromises = [];

        for (let image in imagesPath) {
            let loadedImage = await this.loadImage(image);

            this.images[image] = loadedImage;
        }

        if (Object.keys(imagesPath).length !== Object.keys(this.images).length) {
            throw new Error("Błąd przy wczytywaniu obrazów.");
        }

        for (let audio in audioPath) {
            let loadPromise = this.loadAudio(audio).then((loadedAudio) => {
                this.audio[audio] = loadedAudio;
            });
            loadPromises.push(loadPromise);
        }

        Promise.all(loadPromises).then(() => {
            if (Object.keys(audioPath).length !== Object.keys(this.audio).length) {
                throw new Error("Błąd przy wczytywaniu dźwięków.");
            } else {
                this.audio.crickets.volume = 0.6;
                this.audio.stoneDestroy.volume = 0.6;
            }
        });
    }

    loadImage(image) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = imagesPath[image];
        });
    }

    loadAudio(audioName) {
        return new Promise((resolve, reject) => {
            let audio = new Audio();
            audio.oncanplaythrough = () => resolve(audio);
            audio.onerror = reject;
            audio.src = audioPath[audioName];
        });
    }

    playAudio(audio, reset = false, callback) {
        if (this.audioAllowed === true && typeof this.audio[audio] !== "undefined") {
            if (reset === true) {
                this.audio[audio].currentTime = 0;
            }
            this.audio[audio].play();

            if (typeof callback === "function") {
                this.audio[audio].onended = callback;
            } else {
                this.audio[audio].onended = null;
            }
        }
    }

    playAmbience() {
        let time = this.game.time;
        if (time >= 600 && time < 1080) {
            this.selectAmbience("birds");
        } else if (time >= 1320 || time < 360) {
            this.selectAmbience("crickets");
        } else {
            setTimeout(() => this.playAmbience(), 5000);
        }
    }

    selectAmbience(name) {
        this.audio[name].play().then(() => (this.playingAmbience = name));
        this.audio[name].onended = () => {
            this.playingAmbience = "";
            this.playAmbience();
        };
    }

    playRandomMusic() {
        let time = this.game.time;
        if (!this.playingMusic) {
            if (time >= 480 && time < 1200) {
                this.selectRandomMusic(2, "dayMusic");
            } else if (time >= 1320 || time < 360) {
                this.selectRandomMusic(1, "nightMusic");
            } else if (time >= 360 && time < 480) {
                this.selectRandomMusic(2, "dawnMusic");
            } else if (time >= 1200 && time < 1320) {
                this.selectRandomMusic(2, "duskMusic");
            } else {
                setTimeout(() => this.playRandomMusic(), 5000);
            }
        }
    }

    selectRandomMusic(max, name) {
        let randomNumber = Math.floor(Math.random() * max) + 1;
        let music = this.audio[name + randomNumber];
        music.play().then(() => (this.playingMusic = true));
        music.onended = () => {
            //ending before checkMusicTime?
            this.playingMusic = false;
            this.playRandomMusic();
        };

        this.musicCheckTimeout = setTimeout(() => this.checkMusicTime(name, music), 10000);
    }

    checkMusicTime(name, music) {
        let time = this.game.time;
        clearTimeout(this.musicCheckTimeout);
        if (
            (time >= 480 && time < 1200 && name !== "dayMusic") ||
            ((time >= 1320 || time < 360) && name !== "nightMusic") ||
            (time >= 360 && time < 480 && name !== "dawnMusic") ||
            (time >= 1200 && time < 1320 && name !== "duskMusic")
        ) {
            music.volume -= 0.01;
            music.onended = null;
            this.playingMusic = false;
            this.playRandomMusic();
            setTimeout(() => this.turnDownVolume(music), 200);
        } else {
            this.musicCheckTimeout = setTimeout(() => this.checkMusicTime(name, music), 10000);
        }
    }

    turnDownVolume(music) {
        music.volume -= 0.01;

        if (music.volume <= 0.01) {
            music.pause();
            music.currentTime = 0;
            music.volume = 1;
        } else {
            setTimeout(() => this.turnDownVolume(music), 200);
        }
    }
}

export { AssetsManager };
