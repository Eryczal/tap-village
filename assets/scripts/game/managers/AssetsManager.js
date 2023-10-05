const imagesPath = {
	grassTile: "assets/images/tiles/grass.png",
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
	sawmill: "assets/images/buildings/sawmill.png",
	quarry: "assets/images/buildings/quarry.png",
	mine: "assets/images/buildings/mine.png",
	workshop: "assets/images/buildings/workshop.png",
	vault: "assets/images/buildings/vault.png",
	trader: "assets/images/buildings/trader.png",

	menu: "assets/images/ui/menu.png",
	shopButton: "assets/images/ui/shop-button.png",
	shop: "assets/images/ui/shop.png",
	building: "assets/images/ui/building.png",
	buyButton: "assets/images/ui/buy-button.png",
	upgradeButton: "assets/images/ui/upgrade-button.png",
	redButton: "assets/images/ui/red-button.png",
	buildingClick: "assets/images/ui/building-click.png",

	commonChest: "assets/images/chests/common.png",
	rareChest: "assets/images/chests/rare.png",
	epicChest: "assets/images/chests/epic.png",
	legendaryChest: "assets/images/chests/legendary.png",
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
