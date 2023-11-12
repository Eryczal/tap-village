class GatheredNumber {
    constructor(game, index, x, y, critic, amount, clicks) {
        this.game = game;
        this.index = index;
        this.x = x;
        this.y = y;
        this.critic = critic;
        this.amount = amount;
        this.clicks = clicks;
        this.time = 80;
        this.timeBetween = 5;
        this.directionX = Math.round(Math.random());
        this.directionY = Math.round(Math.random());
        this.speedX = Math.floor(Math.random() * 4) + 2;
        this.speedY = Math.floor(Math.random() * 4) + 2;
        this.size = this.game.canvas.height / 30;
        this.color = this.critic ? "#f33" : "#fff";
        this.removeTimer = setTimeout(() => {
            this.removeNumber();
        }, 10000);
    }

    updatePos() {
        this.timeBetween--;
        this.time--;
        if (this.time <= 0) {
            this.removeNumber();
            return;
        }
        if (this.timeBetween <= 0) {
            this.x += this.directionX ? this.speedX : -this.speedX;
            this.y += this.directionY ? this.speedY : -this.speedY;
            if (typeof this.changedX === "number" && typeof this.changedY === "number") {
                this.changedX += this.directionX ? this.speedX : -this.speedX;
                this.changedY += this.directionY ? this.speedY : -this.speedY;
            }
            this.size++;
            this.timeBetween = 5;
        }
    }

    removeNumber() {
        clearTimeout(this.removeTimer);
        this.clicks.splice(this.index, 1);
        for (let i = this.index; i < this.clicks.length; i++) {
            this.clicks[i].index--;
        }
    }

    draw() {
        this.game.strokeText(this.amount, this.x, this.y, this.size, "#000");
        this.game.writeText(this.amount, this.x, this.y, this.size, this.color);
    }
}

class MapGatheredNumber extends GatheredNumber {
    constructor(game, index, critic, amount, clicks, tileSize, type = "click") {
        super(game, index, 0, 0, critic, amount, clicks);

        this.size = tileSize / 2;
        this.x = this.game.constructionManager.x + this.game.constructionManager.width / 2;
        this.y = this.game.constructionManager.y + this.game.constructionManager.height / 4;
        this.changedX = 0;
        this.changedY = 0;
        this.iX = this.game.constructionManager.x + this.game.constructionManager.width / 2;
        this.iY = this.game.constructionManager.y + this.game.constructionManager.height / 4;
        this.time = type === "worker" ? 80 : 50;
        this.speedX = Math.floor((Math.random() * tileSize) / 32) + 1;
        this.speedY = Math.floor((Math.random() * tileSize) / 16) + 2;
        this.directionY = 0;
        if (type === "worker") {
            this.color = this.critic ? "#9f3" : "#39f";
        }
    }

    updateRelativePos(tileSize) {
        this.iX = this.game.constructionManager.x + this.game.constructionManager.width / 2;
        this.iY = this.game.constructionManager.y + this.game.constructionManager.height / 4;
        this.speedX = Math.floor((Math.random() * tileSize) / 32) + 1;
        this.speedY = Math.floor((Math.random() * tileSize) / 16) + 2;
        this.x = this.iX + this.changedX;
        this.y = this.iY + this.changedY;
    }
}

export { GatheredNumber, MapGatheredNumber };
