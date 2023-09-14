class PlayerManager {
	constructor(game) {
		this.game = game;

		this.wood = 5550;
		this.stone = 5550;
		this.gold = 5550;
		this.gem = 0;

		this.preferedZoom = 1;
	}

	get wood() {
		return this._wood;
	}

	set wood(wood) {
		this._wood = wood;

		this.game.update();
	}

	get stone() {
		return this._stone;
	}

	set stone(stone) {
		this._stone = stone;

		this.game.update();
	}

	get gold() {
		return this._gold;
	}

	set gold(gold) {
		this._gold = gold;

		this.game.update();
	}

	get gem() {
		return this._gem;
	}

	set gem(gem) {
		this._gem = gem;

		this.game.update();
	}
}

export { PlayerManager };
