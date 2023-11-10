import { Element } from "../../element/Element.js";

class Resource extends Element {
    constructor(game, num, text, image) {
        super(game);

        this.num = num;
        this.width = this.game.canvas.width / 40;
        this.height = this.game.canvas.width / 40;
        this.x = this.game.canvas.width / 200;
        this.y = this.height * 1.2 * num + this.game.canvas.height / 100;
        this.text = text;
        this.image = image;
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        this.game.writeText(this.text, this.x + this.width * 1.1, this.y + this.height / 2, this.height, "#000", "left");
    }

    onResize() {
        this.width = this.game.canvas.width / 40;
        this.height = this.game.canvas.width / 40;
        this.x = this.game.canvas.width / 200;
        this.y = this.height * 1.2 * this.num + this.game.canvas.height / 100;
    }
}

class Wood extends Resource {
    constructor(game) {
        super(game, 0, game.playerManager.wood, game.assetsManager.images.woodIcon);
    }

    update() {
        this.text = this.game.playerManager.wood;
    }
}

class Stone extends Resource {
    constructor(game) {
        super(game, 1, game.playerManager.stone, game.assetsManager.images.stoneIcon);
    }

    update() {
        this.text = this.game.playerManager.stone;
    }
}

class Gold extends Resource {
    constructor(game) {
        super(game, 2, game.playerManager.gold, game.assetsManager.images.goldIcon);
    }

    update() {
        this.text = this.game.playerManager.gold;
    }
}

class Coin extends Resource {
    constructor(game) {
        super(game, 3, game.playerManager.coin, game.assetsManager.images.coinIcon);
    }

    update() {
        this.text = this.game.playerManager.coin;
    }
}

class Gem extends Resource {
    constructor(game) {
        super(game, 4, game.playerManager.gem, game.assetsManager.images.gemIcon);
    }

    update() {
        this.text = this.game.playerManager.gem;
    }
}

export { Wood, Stone, Gold, Coin, Gem };
