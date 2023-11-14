import { Element } from "../../../element/Element.js";
import { SawmillBuilding, QuarryBuilding } from "../../../managers/BuildingsManager.js";

class MapObject extends Element {
    constructor(game, parent, x, y, sizeX, sizeY, image) {
        super(game);

        this.parent = parent;

        this.id = y + "_" + x;

        this.tileX = x;
        this.tileY = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.image = image;

        this.TILE_SIZE = this.parent.TILE_SIZE;
        this.MENU_SIZE = this.parent.MENU_SIZE;

        this.x = x * this.TILE_SIZE + this.MENU_SIZE + this.parent.mapScroll.x;
        this.y = y * this.TILE_SIZE + this.parent.mapScroll.y;

        this.width = this.TILE_SIZE * this.sizeX;
        this.height = this.TILE_SIZE * this.sizeY;

        this.clickable = false;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            return true;
        }
    }

    draw() {
        this.game.ctx.drawImage(this.game.assetsManager.images[this.image], this.x, this.y, this.width, this.height);
    }

    updatePos(MENU_SIZE, TILE_SIZE, mapScrollX, mapScrollY) {
        this.TILE_SIZE = TILE_SIZE;
        this.MENU_SIZE = MENU_SIZE;

        this.x = this.tileX * this.TILE_SIZE + this.MENU_SIZE + mapScrollX;
        this.y = this.tileY * this.TILE_SIZE + mapScrollY;

        this.width = this.TILE_SIZE * this.sizeX;
        this.height = this.TILE_SIZE * this.sizeY;
    }
}

class TreeObject extends MapObject {
    constructor(game, parent, x, y, sizeX, sizeY, image, clicks) {
        super(game, parent, x, y, sizeX, sizeY, image);

        this.clicks = clicks;
        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            let attack = 1;
            if (SawmillBuilding.stats.gatheringPower) {
                attack = SawmillBuilding.stats.gatheringPower;
            }

            this.clicks -= attack;

            if (this.clicks <= 0) {
                this.game.assetsManager.playAudio("treeDestroy", true);
                this.game.playerManager.wood += 1;

                this.parent.handleDestroyedObject(this.tileX, this.tileY, this.sizeX, this.sizeY);
            } else {
                let audio = Math.floor(Math.random() * 4) + 1;
                this.game.assetsManager.playAudio("treeHit" + audio, true);
            }

            return true;
        }
    }
}

class StoneObject extends MapObject {
    constructor(game, parent, x, y, sizeX, sizeY, image, clicks) {
        super(game, parent, x, y, sizeX, sizeY, image);

        this.clicks = clicks;
        this.clickable = true;
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            let attack = 1;
            if (QuarryBuilding.stats.gatheringPower) {
                attack = QuarryBuilding.stats.gatheringPower;
            }

            this.clicks -= attack;

            if (this.clicks <= 0) {
                this.game.assetsManager.playAudio("stoneDestroy", true);
                this.game.playerManager.stone += 1;

                this.parent.handleDestroyedObject(this.tileX, this.tileY, this.sizeX, this.sizeY);
            } else {
                let audio = Math.floor(Math.random() * 2) + 1;
                this.game.assetsManager.playAudio("stoneHit" + audio, true);
            }

            return true;
        }
    }
}

class WaterObject extends MapObject {
    constructor(game, parent, type, x, y, sizeX, sizeY, image) {
        super(game, parent, type, x, y, sizeX, sizeY, image);
    }

    onClick(mouseX, mouseY) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.game.assetsManager.playAudio("water", true);
            return true;
        }
    }

    draw() {
        this.game.ctx.drawImage(
            this.game.assetsManager.images[this.parent.waterState === 0 ? this.image : this.image + "2"],
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

export { MapObject, TreeObject, StoneObject, WaterObject };
