import { BuyButton } from "../../../_elements/BuyButton.js";

class ChangePositionButton extends BuyButton {
    constructor(game, menu) {
        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 + menu.MENU_SIZE - game.canvas.width / 8,
            game.canvas.height / 4,
            game.canvas.width / 4,
            game.canvas.width / 24,
            "",
            "Przenieś budynek"
        );

        this.color = "#fff";
        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.sceneManager.changeScene("main", { changePosition: true, progress: 0 });
            this.game.assetsManager.playAudio("click2", true);
        }
    }
}

class RemoveObjectButton extends BuyButton {
    constructor(game, menu) {
        super(
            game,
            (game.canvas.width - menu.MENU_SIZE) / 2 + menu.MENU_SIZE - game.canvas.width / 8,
            game.canvas.height / 4 + (game.canvas.width / 24) * 1.5,
            game.canvas.width / 4,
            game.canvas.width / 24,
            "",
            "Usuń obiekty"
        );

        this.color = "#fff";
        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.sceneManager.changeScene("main", { removeObject: true, progress: 0 });
            this.game.assetsManager.playAudio("click2", true);
        }
    }
}

export { ChangePositionButton, RemoveObjectButton };
