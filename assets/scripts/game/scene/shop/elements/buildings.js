const buildings = [
	{
		id: 0,
		image: "castle",
		name: "Zamek",
		description: "Budynek główny. Pozwala rozbudowywać\npozostałe budynki do poziomu zamku.",
		size: {
			x: 5,
			y: 5,
		},
		cost: {
			wood: 30,
			stone: 0,
			gold: 0,
		},
		clicks: 100,
		maxOnMap: 1,
		upgrades: [
			{
				cost: {
					wood: 70,
					stone: 30,
					gold: 0,
				},
				clicks: 300,
			},
		],
	},
	{
		id: 1,
		image: "sawmill",
		name: "Tartak",
		description: "Pozwala zbierać drewno potrzebne do budowy.",
		size: {
			x: 3,
			y: 2,
		},
		cost: {
			wood: 50,
			stone: 10,
			gold: 0,
		},
		clicks: 200,
		maxOnMap: 3,
		upgrades: [],
	},
	{
		id: 2,
		image: "mine",
		name: "Kopalnia",
		description: "Pozwala zbierać kamień potrzebny do budowy.",
		size: {
			x: 3,
			y: 3,
		},
		cost: {
			wood: 300,
			stone: 50,
			gold: 0,
		},
		clicks: 300,
		maxOnMap: 3,
		upgrades: [],
	},
];

export { buildings };
