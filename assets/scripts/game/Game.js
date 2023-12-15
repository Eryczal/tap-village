import { AssetsManager, ResizeManager, MouseManager, SceneManager, PlayerManager, ConstructionManager, BuildingsManager } from "./managers/index.js";

class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");

        this.assetsManager = new AssetsManager(this);
        this.sceneManager = new SceneManager(this);
        this.playerManager = new PlayerManager(this);
        this.resizeManager = new ResizeManager(this);
        this.mouseManager = new MouseManager(this);
        this.constructionManager = new ConstructionManager(this);
        this.buildingsManager = new BuildingsManager(this);

        this.time = 600;
        this.timeTimer = setInterval(() => this.changeTime(), 60);

        this.music = true;
        this.sound = true;
        this.mobile = false;
    }

    get ctx() {
        return this.canvas.getContext("2d");
    }

    get RESOURCES_SIZE() {
        return 25;
    }

    get height() {
        return this.canvas.height;
    }

    get width() {
        return this.canvas.width;
    }

    async init(userUid) {
        this.canvas.style.display = "block";

        try {
            await this.assetsManager.loadAssets();

            this.resizeManager.init();

            for (let element in this.elements) {
                element?.init();
            }

            this.playerManager.init(userUid);

            this.sceneManager.init();

            this.mouseManager.init();

            this.buildingsManager.init(userUid);

            this.draw();
        } catch (err) {
            console.error(err);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.imageSmoothingEnabled = false;

        for (let element in this.elements) {
            element?.init();
        }

        this.sceneManager.draw();

        requestAnimationFrame(() => this.draw());
    }

    update() {
        for (let element in this.elements) {
            element?.update();
        }

        this.sceneManager.update();
    }

    writeText(text, x, y, size, color = "#fff", align = "center", baseline = "middle", font = "VT323") {
        let lines = text.toString().split("\n");
        let sizes = [];

        this.ctx.font = size + "px " + font;
        this.ctx.textBaseline = baseline;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;

        for (let i = 0; i < lines.length; i++) {
            this.ctx.fillText(lines[i], x, y + i * size);
            sizes[i] = this.ctx.measureText(lines[i]);
        }

        return { sizes, lines: lines.length };
    }

    strokeText(text, x, y, size, color = "#000", align = "center", baseline = "middle", font = "VT323") {
        let lines = text.toString().split("\n");

        this.ctx.font = size + "px " + font;
        this.ctx.textBaseline = baseline;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = size / 8;
        this.ctx.textAlign = align;

        for (let i = 0; i < lines.length; i++) {
            this.ctx.strokeText(lines[i], x, y + i * size);
        }
    }

    wrapText(text, maxWidth, size, font = "VT323") {
        this.ctx.font = size + "px " + font;

        return text
            .split(" ")
            .reduce((lines, word) => {
                let lastLine = lines.pop() || "";
                let testLine = lastLine + (lastLine ? " " : "") + word;
                let lineWidth = this.ctx.measureText(testLine).width;

                if (lineWidth < maxWidth) {
                    lines.push(testLine);
                } else {
                    lines.push(lastLine);
                    lines.push(word);
                }
                return lines;
            }, [])
            .join("\n");
    }

    setMaxGems() {
        this.playerManager.gem = "max";
    }

    setZeroGems() {
        this.playerManager.gem = 0;
    }

    changeTime() {
        this.time += 0.1;

        if (this.time >= 1440) {
            this.time = 0;
            this.playerManager.gem++;

            for (let building of this.buildingsManager.buildings) {
                if (building.buildingId === 9) {
                    building.storedGems += building.prestigeLvl;
                    this.buildingsManager.saveBuilding(building.position);
                }
            }
        }
    }
}

const game = new Game();

//DEBUG
window.smg = () => game.setMaxGems();
window.szg = () => game.setZeroGems();

export function initGame(userUid) {
    game.init(userUid);
}
