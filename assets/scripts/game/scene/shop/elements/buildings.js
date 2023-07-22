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
		stats: {
			gatheringPower: 1,
			gatheringChance: 5,
			criticalPower: 3,
			criticalChance: 0,
			workers: 0,
			workersSpeed: 10,
		},
		maxStats: {
			gatheringPower: 2,
			gatheringChance: 10,
			criticalPower: 5,
			criticalChance: 5,
			workers: 1,
			workersSpeed: 9,
		},
		statsCost: {
			gatheringPower: {
				wood: 30,
				stone: 0,
				gold: 0,
			},
			gatheringChance: {
				wood: 5,
				stone: 0,
				gold: 0,
			},
			criticalPower: {
				wood: 10,
				stone: 0,
				gold: 0,
			},
			criticalChance: {
				wood: 5,
				stone: 0,
				gold: 0,
			},
			workers: {
				wood: 30,
				stone: 10,
				gold: 0,
			},
			workersSpeed: {
				wood: 15,
				stone: 3,
				gold: 0,
			},
		},
		clicks: 200,
		maxOnMap: 3,
		upgrades: [
			{
				cost: {
					wood: 100,
					stone: 50,
					gold: 0,
				},
				clicks: 300,
				maxStats: {
					gatheringPower: 3,
					gatheringChance: 15,
					criticalPower: 10,
					criticalChance: 10,
					workers: 2,
					workersSpeed: 8,
				},
			},
		],
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
