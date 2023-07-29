class ResourceClick {
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
	}

	updatePos() {
		this.timeBetween--;
		this.time--;
		if (this.time <= 0) {
			this.clicks.splice(this.index, 1);
			for (let i = this.index; i < this.clicks.length; i++) {
				this.clicks[i].index--;
			}
			return;
		}
		if (this.timeBetween <= 0) {
			this.x += this.directionX ? this.speedX : -this.speedX;
			this.y += this.directionY ? this.speedY : -this.speedY;
			this.size++;
			this.timeBetween = 5;
		}
	}

	draw() {
		this.game.writeText(this.amount, this.x, this.y, this.size, this.critic ? "#f00" : "#000");
	}
}

export { ResourceClick };
