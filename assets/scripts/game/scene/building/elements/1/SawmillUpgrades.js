import { Element } from "../../../../element/Element.js";

class SawmillButton extends Element {
	constructor(game, menu, text) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;

		this.width = this.game.canvas.width / 6;
		this.height = this.game.canvas.width / 36;

		this.x = (this.game.canvas.width - this.MENU_SIZE) / 2 - this.width / 2 + this.MENU_SIZE;
		this.y = this.game.canvas.height / 6;

		this.clickable = true;
		this.text = text;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.buyButton, this.x, this.y, this.width, this.height);
		this.game.writeText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.height / 2);
	}
}

//gathering strenght, gathering chance, gathering critic

//workers, workers speed

class GatheringPower extends SawmillButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz moc zbierania");
	}
}

class GatheringChance extends SawmillButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz szansę zbierania");

		this.y += this.height * 1.5;
	}
}

class CriticPower extends SawmillButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz moc krytycznego ciosu");

		this.y += this.height * 3;
	}
}

class CriticChance extends SawmillButton {
	constructor(game, menu) {
		super(game, menu, "Ulepsz szansę krytycznego ciosu");

		this.y += this.height * 4.5;
	}
}

class SawmillWorkers extends SawmillButton {
	constructor(game, menu) {
		super(game, menu, "Zatrudnij pracownika");

		this.x += this.width * 1.2;
	}
}

class SawmillWorkersSpeed extends SawmillButton {
	constructor(game, menu) {
		super(game, menu, "Zwiększ prędkość pracowników");

		this.x += this.width * 1.2;
		this.y += this.height * 1.5;
	}
}

export { GatheringPower, GatheringChance, CriticPower, CriticChance, SawmillWorkers, SawmillWorkersSpeed };
