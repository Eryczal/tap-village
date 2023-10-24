import { cards } from "../data/cards.js";
import { database as db, ref, set, update, get } from "../../firebase.js";

class PlayerManager {
	constructor(game) {
		this.game = game;

		this.wood = 0;
		this.stone = 0;
		this.gold = 0;
		this.gem = 0;
		this.coin = 0;
		this.cards = [];

		for (let i = 0; i < cards.length; i++) {
			this.cards[i] = {
				lvl: 0,
				amount: 0,
			};
		}

		this.preferedZoom = 1;
	}

	init(playerId) {
		this.playerId = playerId;

		this.loadPlayerData()
			.then((playerData) => {
				this.wood = playerData.wood;
				this.stone = playerData.stone;
				this.gold = playerData.gold;
				this.gem = playerData.gem;
				this.coin = playerData.coin;
				this.cards = JSON.parse(JSON.stringify(playerData.cards));

				if (typeof playerData.construction !== "undefined") {
					this.game.constructionManager.loadConstruction(playerData.construction);
				}

				setTimeout(() => this.updateResources(), 10000);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	loadPlayerData() {
		return new Promise((resolve, reject) => {
			get(ref(db, `players/${this.playerId}`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						let playerData = snapshot.val();
						resolve(playerData);
					} else {
						let playerData = {
							wood: 0,
							stone: 0,
							gold: 0,
							gem: 0,
							coin: 0,
							cards: [],
						};

						for (let i = 0; i < cards.length; i++) {
							playerData.cards[i] = {
								lvl: 0,
								amount: 0,
							};
						}

						this.setPlayerData(playerData);
						resolve(playerData);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}

	setPlayerData(playerData) {
		return set(ref(db, `players/${this.playerId}`), playerData);
	}

	updatePlayerData(type, data) {
		if (type === "player") {
			let playerData = {
				wood: this.wood,
				stone: this.stone,
				gold: this.gold,
				gem: this.gem,
				coin: this.coin,
			};
			update(ref(db, `players/${this.playerId}`), playerData);
		} else if (type === "construction") {
			if (data !== null) {
				update(ref(db, `players/${this.playerId}/construction`), data);
			} else {
				set(ref(db, `players/${this.playerId}/construction`), data);
			}
		} else {
			return;
		}
	}

	updateResources() {
		this.updatePlayerData("player");
		if (this.game.constructionManager.constructionState === 1) {
			this.game.constructionManager.saveConstruction();
		}

		setTimeout(() => this.updateResources(), 5000);
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

	get coin() {
		return this._coin;
	}

	set coin(coin) {
		this._coin = coin;

		this.game.update();
	}
}

export { PlayerManager };
