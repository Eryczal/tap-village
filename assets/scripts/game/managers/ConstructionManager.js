class ConstructionManager {
	constructor(game) {
		this.game = game;
	}

	init() {}

	setConstruction(buildingId) {
		this.buildingId = buildingId;
		this.constructionState = 0;
	}

	setBuild(buildingId) {}
}

export { ConstructionManager };
