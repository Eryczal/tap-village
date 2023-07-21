import { Element } from "../../../../element/Element.js";

class SawmillClick extends Element {
	constructor(game, menu) {
		super(game);

		this.MENU_SIZE = menu.MENU_SIZE;

		this.width = canvas.width / 6;
		this.height = canvas.width / 6;

		this.x = this.MENU_SIZE + this.width / 4;
		this.y = this.game.canvas.height / 2 - this.height / 2;

		this.iconSize = canvas.width / 18;
		this.iconX = this.x + this.width / 2 - this.iconSize / 2;
		this.iconY = this.y + this.height / 2 - this.iconSize / 2;

		this.clickable = true;
	}

	draw() {
		this.game.writeText("Zdobądź drewno", this.x + this.width / 2, this.y - canvas.height / 24, canvas.height / 24);
		this.game.ctx.drawImage(this.game.assetsManager.images.buildingClick, this.x, this.y, this.width, this.height);
		this.game.ctx.drawImage(this.game.assetsManager.images.woodIcon, this.iconX, this.iconY, this.iconSize, this.iconSize);
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			this.game.playerManager.wood += 30; // zmienić!!!!
		}
	}
}

export { SawmillClick };
