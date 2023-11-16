import { Element } from "../../../../element/Element.js";

class PrestigeStats extends Element {
    constructor(game, menu) {
        super(game);

        this.MENU_SIZE = menu.MENU_SIZE;
        this.ICON_SIZE = this.game.canvas.height / 2;

        this.x = this.MENU_SIZE;
        this.y = 0;
        this.width = this.game.canvas.width - this.MENU_SIZE;
        this.height = this.game.canvas.height;

        this.GRADIENT_X = this.x + this.width / 40;
        this.GRADIENT_Y = (this.game.canvas.height / 16) * 6;
        this.GRADIENT_WIDTH = this.width - this.width / 20;
        this.GRADIENT_HEIGHT = this.game.canvas.height / 16;

        this.building = this.game.buildingsManager.clickedBuilding;
    }

    draw() {
        this.game.strokeText(
            `Poziom prestiżu: ${this.building.prestigeLvl}`,
            this.width / 2 + this.MENU_SIZE,
            (this.game.canvas.height / 16) * 4,
            this.game.canvas.height / 16
        );
        this.game.writeText(
            `Poziom prestiżu: ${this.building.prestigeLvl}`,
            this.width / 2 + this.MENU_SIZE,
            (this.game.canvas.height / 16) * 4,
            this.game.canvas.height / 16
        );

        this.game.strokeText(`Postęp:`, this.width / 2 + this.MENU_SIZE, (this.game.canvas.height / 16) * 5, this.game.canvas.height / 24);
        this.game.writeText(`Postęp:`, this.width / 2 + this.MENU_SIZE, (this.game.canvas.height / 16) * 5, this.game.canvas.height / 24);

        let gradient = this.game.ctx.createLinearGradient(this.GRADIENT_X, this.GRADIENT_Y, this.GRADIENT_X + this.GRADIENT_WIDTH, this.GRADIENT_Y);

        gradient.addColorStop(0, "#eebb33");
        gradient.addColorStop(this.building.prestigeProgress / this.building.prestigeObject.amountNeeded, "#eebb33");
        gradient.addColorStop(this.building.prestigeProgress / this.building.prestigeObject.amountNeeded, "#eebb3366");
        gradient.addColorStop(1, "#eebb3366");

        this.game.ctx.fillStyle = gradient;
        this.game.ctx.strokeStyle = "rgba(34, 34, 34, 0.6)";
        this.game.ctx.fillRect(this.GRADIENT_X, this.GRADIENT_Y, this.GRADIENT_WIDTH, this.GRADIENT_HEIGHT);
        this.game.ctx.strokeRect(this.GRADIENT_X, this.GRADIENT_Y, this.GRADIENT_WIDTH, this.GRADIENT_HEIGHT);

        this.game.strokeText(
            `${this.building.prestigeProgress} / ${this.building.prestigeObject.amountNeeded}`,
            this.GRADIENT_X + this.GRADIENT_WIDTH / 2,
            this.GRADIENT_Y + this.GRADIENT_HEIGHT / 2,
            this.game.canvas.height / 16
        );
        this.game.writeText(
            `${this.building.prestigeProgress} / ${this.building.prestigeObject.amountNeeded}`,
            this.GRADIENT_X + this.GRADIENT_WIDTH / 2,
            this.GRADIENT_Y + this.GRADIENT_HEIGHT / 2,
            this.game.canvas.height / 16
        );
    }
}

export { PrestigeStats };
