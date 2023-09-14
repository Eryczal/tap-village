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
				clicks: 200,
			},
			{
				cost: {
					wood: 150,
					stone: 75,
					gold: 20,
				},
				clicks: 350,
			},
			{
				cost: {
					wood: 350,
					stone: 200,
					gold: 100,
				},
				clicks: 500,
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
		clicks: 150,
		maxOnMap: 3,
		upgrades: [
			{
				cost: {
					wood: 100,
					stone: 50,
					gold: 0,
				},
				clicks: 250,
				maxStats: {
					gatheringPower: 3,
					gatheringChance: 15,
					criticalPower: 10,
					criticalChance: 10,
					workers: 2,
					workersSpeed: 8,
				},
			},
			{
				cost: {
					wood: 150,
					stone: 50,
					gold: 0,
				},
				clicks: 400,
				maxStats: {
					gatheringPower: 5,
					gatheringChance: 20,
					criticalPower: 15,
					criticalChance: 15,
					workers: 3,
					workersSpeed: 7,
				},
			},
		],
	},
	{
		id: 2,
		image: "quarry",
		name: "Kamieniołom",
		description: "Pozwala zbierać kamień potrzebny do budowy.",
		size: {
			x: 3,
			y: 3,
		},
		cost: {
			wood: 30,
			stone: 30,
			gold: 0,
		},
		stats: {
			gatheringPower: 1,
			gatheringChance: 1,
			criticalPower: 3,
			criticalChance: 0,
			workers: 0,
			workersSpeed: 15,
		},
		maxStats: {
			gatheringPower: 1,
			gatheringChance: 5,
			criticalPower: 3,
			criticalChance: 5,
			workers: 1,
			workersSpeed: 13,
		},
		statsCost: {
			gatheringPower: {
				wood: 20,
				stone: 10,
				gold: 0,
			},
			gatheringChance: {
				wood: 3,
				stone: 3,
				gold: 0,
			},
			criticalPower: {
				wood: 7,
				stone: 5,
				gold: 0,
			},
			criticalChance: {
				wood: 2,
				stone: 3,
				gold: 0,
			},
			workers: {
				wood: 15,
				stone: 30,
				gold: 0,
			},
			workersSpeed: {
				wood: 7,
				stone: 20,
				gold: 0,
			},
		},
		clicks: 200,
		maxOnMap: 3,
		upgrades: [
			{
				cost: {
					wood: 100,
					stone: 100,
					gold: 0,
				},
				clicks: 250,
				maxStats: {
					gatheringPower: 2,
					gatheringChance: 10,
					criticalPower: 5,
					criticalChance: 10,
					workers: 2,
					workersSpeed: 10,
				},
			},
			{
				cost: {
					wood: 150,
					stone: 200,
					gold: 0,
				},
				clicks: 400,
				maxStats: {
					gatheringPower: 3,
					gatheringChance: 15,
					criticalPower: 7,
					criticalChance: 10,
					workers: 3,
					workersSpeed: 9,
				},
			},
		],
	},
	{
		id: 3,
		image: "mine",
		name: "Kopalnia",
		description: "Pozwala zbierać złoto potrzebne do budowy.",
		size: {
			x: 3,
			y: 3,
		},
		cost: {
			wood: 50,
			stone: 50,
			gold: 0,
		},
		stats: {
			gatheringPower: 1,
			gatheringChance: 0,
			criticalPower: 2,
			criticalChance: 0,
			workers: 0,
			workersSpeed: 20,
		},
		maxStats: {
			gatheringPower: 1,
			gatheringChance: 3,
			criticalPower: 3,
			criticalChance: 3,
			workers: 1,
			workersSpeed: 18,
		},
		statsCost: {
			gatheringPower: {
				wood: 20,
				stone: 10,
				gold: 1,
			},
			gatheringChance: {
				wood: 7,
				stone: 5,
				gold: 0,
			},
			criticalPower: {
				wood: 10,
				stone: 5,
				gold: 0,
			},
			criticalChance: {
				wood: 7,
				stone: 3,
				gold: 0,
			},
			workers: {
				wood: 20,
				stone: 35,
				gold: 5,
			},
			workersSpeed: {
				wood: 10,
				stone: 20,
				gold: 1,
			},
		},
		clicks: 300,
		maxOnMap: 3,
		upgrades: [
			{
				cost: {
					wood: 100,
					stone: 100,
					gold: 30,
				},
				clicks: 300,
				maxStats: {
					gatheringPower: 2,
					gatheringChance: 7,
					criticalPower: 5,
					criticalChance: 7,
					workers: 2,
					workersSpeed: 16,
				},
			},
			{
				cost: {
					wood: 200,
					stone: 200,
					gold: 50,
				},
				clicks: 550,
				maxStats: {
					gatheringPower: 3,
					gatheringChance: 10,
					criticalPower: 7,
					criticalChance: 13,
					workers: 3,
					workersSpeed: 15,
				},
			},
		],
	},
	{
		id: 4,
		image: "workshop",
		name: "Warsztat",
		description: "Pozwala zwiększać prędkość budowy.",
		size: {
			x: 2,
			y: 2,
		},
		cost: {
			wood: 50,
			stone: 40,
			gold: 30,
		},
		stats: {
			buildingPower: 1,
			criticalPower: 1,
			criticalChance: 0,
			workers: 0,
			workersSpeed: 20,
		},
		maxStats: {
			buildingPower: 2,
			criticalPower: 3,
			criticalChance: 3,
			workers: 1,
			workersSpeed: 18,
		},
		statsCost: {
			buildingPower: {
				wood: 30,
				stone: 20,
				gold: 10,
			},
			criticalPower: {
				wood: 25,
				stone: 15,
				gold: 5,
			},
			criticalChance: {
				wood: 2,
				stone: 2,
				gold: 2,
			},
			workers: {
				wood: 30,
				stone: 30,
				gold: 30,
			},
			workersSpeed: {
				wood: 20,
				stone: 20,
				gold: 15,
			},
		},
		clicks: 200,
		maxOnMap: 2,
		upgrades: [
			{
				cost: {
					wood: 75,
					stone: 100,
					gold: 50,
				},
				clicks: 250,
				maxStats: {
					buildingPower: 3,
					criticalPower: 5,
					criticalChance: 10,
					workers: 2,
					workersSpeed: 16,
				},
			},
			{
				cost: {
					wood: 100,
					stone: 150,
					gold: 100,
				},
				clicks: 350,
				maxStats: {
					buildingPower: 5,
					criticalPower: 10,
					criticalChance: 15,
					workers: 3,
					workersSpeed: 14,
				},
			},
		],
	},
	{
		id: 5,
		image: "vault",
		name: "Skarbiec",
		description: "Pozwala na kupowanie skrzyń z kartami.",
		size: {
			x: 3,
			y: 3,
		},
		cost: {
			wood: 70,
			stone: 50,
			gold: 40,
		},
		cards: {},
		clicks: 500,
		maxOnMap: 1,
		upgrades: [
			{
				cost: {
					wood: 100,
					stone: 100,
					gold: 100,
				},
				clicks: 500,
			},
			{
				cost: {
					wood: 250,
					stone: 200,
					gold: 200,
				},
				clicks: 750,
			},
		],
	},

	//budynek dekoracyjny pozwala stawiać dekoracje na mapie
	//budynek ze skrzynkami, kartami i ich ulepszeniami
	//handlarz - pozwala na zamienianie surowców na monety. Monety można zdobyć tylko od handlarza
	//budynek ekploracyjny - pozwala na eksplorację po różnych proceduralnie generowanych światach
	//lochy - mini gra 2d, gdzie jakiś potwór atakuje. gracz musi unikać strzałów potwora i strzelać do potworów
	//labolatorium - pozwala stale ulepszać niektóre umiejętności gracza za pomocą monet
	//muzeum - pokazuje osiągnięcia i postępy gracza
	//budynek z eliksirami - dają one tymczasowe bonusy dla gracza, np. do zbierania drewna
];

export { buildings };
