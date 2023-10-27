import { Element } from "../../../../element/Element.js";
import { database as db, remove, ref, signOut, auth } from "../../../../../firebase.js";

class RemoveAccount extends Element {
	constructor(game) {
		super(game);

		let canvas = this.game.canvas;

		this.width = canvas.width / 8;
		this.height = canvas.width / 48;

		this.x = canvas.width - this.width * 1.2;
		this.y = canvas.height - canvas.height / 12;
		this.text = "Usuń konto";

		this.clickable = true;
		this.state = 0;
	}

	draw() {
		this.game.ctx.drawImage(this.game.assetsManager.images.redButton, this.x, this.y, this.width, this.height);
		this.game.writeText(this.text, this.x + this.width / 2, this.y + this.height / 2, 40, "#fff");
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.state === 0) {
				this.text = "Na pewno?";
				this.state = 1;
			} else if (this.state === 1) {
				remove(ref(db, `players/${this.game.playerManager.playerId}`));
				auth.currentUser.delete().then(() => {
					signOut(auth);
					location.reload();
				});
			}
		}
	}
}

class RemoveProgress extends RemoveAccount {
	constructor(game) {
		super(game);

		this.y -= this.height * 1.5;
		this.text = "Zresetuj postęp";
	}

	onClick(mouseX, mouseY) {
		if (this.isMouseOver(mouseX, mouseY)) {
			if (this.state === 0) {
				this.text = "Na pewno?";
				this.state = 1;
			} else if (this.state === 1) {
				remove(ref(db, `players/${this.game.playerManager.playerId}`));
				location.reload();
			}
		}
	}
}

export { RemoveAccount, RemoveProgress };
