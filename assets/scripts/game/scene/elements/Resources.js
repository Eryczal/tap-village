import { Element } from "../../element/Element.js";

class Resource extends Element {
	constructor(game, x, y, text, image) {
		super(game);

		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.text = text;
		this.image = image;
	}

	draw() {
		this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

		this.game.writeText(this.text, this.x + this.width / 2 + 30, this.y + this.height / 2, 40, "#000", "left");
	}
}

class Wood extends Resource {
	constructor(game) {
		super(game, 10, 10, game.playerManager.wood, game.assetsManager.images.woodIcon);
	}

	update() {
		this.text = this.game.playerManager.wood;
	}
}

class Stone extends Resource {
	constructor(game) {
		super(game, 10, 70, game.playerManager.stone, game.assetsManager.images.stoneIcon);
	}

	update() {
		this.text = this.game.playerManager.stone;
	}
}

class Gold extends Resource {
	constructor(game) {
		super(game, 10, 130, game.playerManager.gold, game.assetsManager.images.goldIcon);
	}

	update() {
		this.text = this.game.playerManager.gold;
	}
}

class Gem extends Resource {
	constructor(game) {
		super(game, 10, 190, game.playerManager.gem, game.assetsManager.images.gemIcon);
	}

	update() {
		this.text = this.game.playerManager.gem;
	}
}

export { Wood, Stone, Gold, Gem };
