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
	// gemsChanceCard: "assets/images/cards/gems-chance.png",
	// woodCostCard: "assets/images/cards/wood-cost.png",
	// stoneCostCard: "assets/images/cards/stone-cost.png",
	// goldCostCard: "assets/images/cards/gold-cost.png",
	// rareCardsCard: "assets/images/cards/rare-cards.png",
};

class AssetsManager {
	constructor() {
		this.images = {};
	}

	async loadAssets() {
		for (let image in imagesPath) {
			let loadedImage = await this.loadImage(image);

			this.images[image] = loadedImage;
		}

		if (Object.keys(imagesPath).length !== Object.keys(this.images).length) {
			throw new Error("Błąd przy wczytywaniu.");
		}
	}

	loadImage(image) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = imagesPath[image];
		});
	}
}

export { AssetsManager };
