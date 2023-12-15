import { BuyButton } from "../../_elements/BuyButton.js";
import { auth, signOut } from "../../../../firebase.js";

class ChangeMusicButton extends BuyButton {
    constructor(game, menu) {
        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 + menu.MENU_SIZE - game.canvas.width / 8,
            game.canvas.height / 4,
            game.canvas.width / 4,
            game.canvas.width / 24,
            "",
            `Muzyka: ${game.music ? "włączona" : "wyłączona"}`
        );

        this.color = "#fff";
        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.assetsManager.playAudio("click2", true);
            this.game.music = !this.game.music;
            this.updateText(`Muzyka: ${this.game.music ? "włączona" : "wyłączona"}`);
            if (this.game.music === false) {
                this.game.assetsManager.turnOffMusic();
            }
        }
    }
}

class ChangeSoundButton extends BuyButton {
    constructor(game, menu) {
        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 + menu.MENU_SIZE - game.canvas.width / 8,
            game.canvas.height / 4 + (game.canvas.width / 24) * 1.5,
            game.canvas.width / 4,
            game.canvas.width / 24,
            "",
            `Dźwięki: ${game.sound ? "włączone" : "wyłączone"}`
        );

        this.color = "#fff";
        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.assetsManager.playAudio("click2", true);
            this.game.sound = !this.game.sound;
            this.updateText(`Dźwięki: ${this.game.sound ? "włączone" : "wyłączone"}`);
            if (this.game.sound === false) {
                this.game.assetsManager.turnOffAmbience();
            }
        }
    }
}

class FullScreenButton extends BuyButton {
    constructor(game, menu) {
        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 + menu.MENU_SIZE - game.canvas.width / 8,
            game.canvas.height / 4 + (game.canvas.width / 24) * 3,
            game.canvas.width / 4,
            game.canvas.width / 24,
            "",
            "Włącz pełny ekran"
        );

        this.color = "#fff";
        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.assetsManager.playAudio("click2", true);
            document.documentElement.requestFullscreen();
        }
    }
}

class LogOffButton extends BuyButton {
    constructor(game, menu) {
        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 + menu.MENU_SIZE - game.canvas.width / 8,
            game.canvas.height / 4 + (game.canvas.width / 24) * 4.5,
            game.canvas.width / 4,
            game.canvas.width / 24,
            "",
            "Wyloguj się"
        );

        this.color = "#fff";
        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.assetsManager.playAudio("click2", true);
            signOut(auth)
                .then(() => {
                    location.reload();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
}

export { ChangeMusicButton, ChangeSoundButton, FullScreenButton, LogOffButton };
