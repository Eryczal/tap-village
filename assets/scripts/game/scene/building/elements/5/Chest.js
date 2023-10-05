class Chest extends Element {
	constructor(game, menu, id) {
		super(game);

		this.menu = menu;
		this.MENU_SIZE = menu.MENU_SIZE;
		this.id = id;
	}

	draw() {}
}

export { Chest };
