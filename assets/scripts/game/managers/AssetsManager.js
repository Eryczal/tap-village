const imagesPath = {
	grassTile: "assets/images/tiles/grass.png",
	grassTile2: "assets/images/tiles/grass2.png",
	grassTile3: "assets/images/tiles/grass3.png",
	waterTile: "assets/images/tiles/water.png",
	waterTile2: "assets/images/tiles/water2.png",
	treeTile: "assets/images/tiles/tree.png",
	treeTile2: "assets/images/tiles/tree2.png",
	stoneTile: "assets/images/tiles/stone.png",
	stoneTile2: "assets/images/tiles/stone2.png",

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

	menu: "assets/images/ui/menu.png",
	shopButton: "assets/images/ui/shop-button.png",
	shop: "assets/images/ui/shop.png",
	buyButton: "assets/images/ui/buy-button.png",
	upgradeButton: "assets/images/ui/upgrade-button.png",
	redButton: "assets/images/ui/red-button.png",
	buildingClick: "assets/images/ui/building-click.png",
	buildingSelect: "assets/images/ui/building-select.png",

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
	// woodCostCard: "assets/images/cards/wood-cost.png",
	// stoneCostCard: "assets/images/cards/stone-cost.png",
	// goldCostCard: "assets/images/cards/gold-cost.png",
	// rareCardsCard: "assets/images/cards/rare-cards.png",
	// clickReduceCard: "assets/images/cards/click-reduce.png",

	cardBack: "assets/images/cards/back.png",
};

const audioPath = {
	crickets: "assets/audio/crickets.mp3",
	birds: "assets/audio/birds.mp3",

	dawnMusic1: "assets/audio/dawn.mp3",
	dayMusic1: "assets/audio/day-music.mp3",
	dayMusic2: "assets/audio/pad-med.mp3",
	nightMusic1: "assets/audio/wandering.mp3",

	click: "assets/audio/sound/click.mp3",
	click2: "assets/audio/sound/click2.mp3",

	tree: "assets/audio/tree.mp3",

	build1: "assets/audio/sound/build.mp3",
	build2: "assets/audio/sound/build2.mp3",
	build3: "assets/audio/sound/build3.mp3",
	build4: "assets/audio/sound/build4.mp3",

	chop1: "assets/audio/sound/chop.mp3",
	chop2: "assets/audio/sound/chop2.mp3",
	chop3: "assets/audio/sound/chop3.mp3",
	chop4: "assets/audio/sound/chop4.mp3",

	miss1: "assets/audio/sound/miss.mp3",
	miss2: "assets/audio/sound/miss2.mp3",
};

class AssetsManager {
	constructor(game) {
		this.game = game;

		this.images = {};
		this.audio = {};
		this.audioAllowed = false;
		this.playingMusic = false;
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
			if (time >= 600 && time < 1080) {
				this.selectRandomMusic(2, "dayMusic");
			} else if (time >= 1320 || time < 360) {
				this.selectRandomMusic(1, "nightMusic");
			} else if (time >= 360 && time < 400) {
				this.selectRandomMusic(1, "dawnMusic");
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
			this.playingMusic = false;
			this.playRandomMusic();
		};
	}
}

export { AssetsManager };
