const buildings = [
	{
		id: 0,
		image: "castle",
		name: "Zamek",
		description:
			"Zamek jest budynkiem głównym. Odpowiada za maksymalny możliwy poziom budynków w grze. Każdy budynek może być ulepszony maksymalnie do poziomu zamku. Zamek umożliwia resetowanie postępu.",
		size: {
			x: 5,
			y: 5,
		},
		cost: {
			wood: 10,
			stone: 0,
			gold: 0,
		},
		clicks: 25,
		maxOnMap: 1,
		upgrades: [
			{
				cost: {
					wood: 25,
					stone: 10,
					gold: 0,
				},
				clicks: 75,
			},
			{
				cost: {
					wood: 75,
					stone: 35,
					gold: 10,
				},
				clicks: 150,
			},
			{
				cost: {
					wood: 125,
					stone: 100,
					gold: 50,
				},
				clicks: 250,
			},
			{
				cost: {
					wood: 175,
					stone: 150,
					gold: 75,
				},
				clicks: 350,
			},
		],
	},
	{
		id: 1,
		image: "sawmill",
		name: "Tartak",
		description:
			"Tartak pozwala na zbieranie drewna z budynku. Budynek umożliwia ulepszanie wydobycia drewna oraz zatrudnienie pracowników, którzy będą zbierali drewno automatycznie.",
		size: {
			x: 3,
			y: 2,
		},
		cost: {
			wood: 20,
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
				wood: 10,
				stone: 0,
				gold: 0,
			},
			gatheringChance: {
				wood: 4,
				stone: 0,
				gold: 0,
			},
			criticalPower: {
				wood: 7,
				stone: 0,
				gold: 0,
			},
			criticalChance: {
				wood: 3,
				stone: 0,
				gold: 0,
			},
			workers: {
				wood: 15,
				stone: 7,
				gold: 0,
			},
			workersSpeed: {
				wood: 7,
				stone: 3,
				gold: 0,
			},
		},
		clicks: 50,
		maxOnMap: 3,
		upgrades: [
			{
				cost: {
					wood: 35,
					stone: 15,
					gold: 0,
				},
				clicks: 125,
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
					wood: 75,
					stone: 35,
					gold: 0,
				},
				clicks: 200,
				maxStats: {
					gatheringPower: 5,
					gatheringChance: 20,
					criticalPower: 15,
					criticalChance: 15,
					workers: 3,
					workersSpeed: 7,
				},
			},
			{
				cost: {
					wood: 100,
					stone: 50,
					gold: 15,
				},
				clicks: 375,
				maxStats: {
					gatheringPower: 5,
					gatheringChance: 30,
					criticalPower: 20,
					criticalChance: 20,
					workers: 4,
					workersSpeed: 6,
				},
			},
		],
	},
	{
		id: 2,
		image: "quarry",
		name: "Kamieniołom",
		description:
			"Kamieniołom pozwala na zbieranie kamienia z budynku. Budynek umożliwia ulepszanie wydobycia kamienia oraz zatrudnienie pracowników, którzy będą zbierali kamień automatycznie.",
		size: {
			x: 3,
			y: 3,
		},
		cost: {
			wood: 15,
			stone: 15,
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
				wood: 10,
				stone: 5,
				gold: 0,
			},
			gatheringChance: {
				wood: 3,
				stone: 3,
				gold: 0,
			},
			criticalPower: {
				wood: 5,
				stone: 3,
				gold: 0,
			},
			criticalChance: {
				wood: 3,
				stone: 4,
				gold: 0,
			},
			workers: {
				wood: 7,
				stone: 17,
				gold: 0,
			},
			workersSpeed: {
				wood: 5,
				stone: 10,
				gold: 0,
			},
		},
		clicks: 50,
		maxOnMap: 3,
		upgrades: [
			{
				cost: {
					wood: 30,
					stone: 30,
					gold: 0,
				},
				clicks: 150,
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
					wood: 50,
					stone: 50,
					gold: 0,
				},
				clicks: 250,
				maxStats: {
					gatheringPower: 3,
					gatheringChance: 15,
					criticalPower: 7,
					criticalChance: 10,
					workers: 3,
					workersSpeed: 9,
				},
			},
			{
				cost: {
					wood: 100,
					stone: 100,
					gold: 50,
				},
				clicks: 400,
				maxStats: {
					gatheringPower: 4,
					gatheringChance: 20,
					criticalPower: 10,
					criticalChance: 15,
					workers: 4,
					workersSpeed: 8,
				},
			},
		],
	},
	{
		id: 3,
		image: "mine",
		name: "Kopalnia",
		description:
			"Kopalnia pozwala na zbieranie złota z budynku. Budynek umożliwia ulepszanie wydobycia złota oraz zatrudnienie pracowników, którzy będą zbierali złoto automatycznie.",
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
				wood: 15,
				stone: 7,
				gold: 3,
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
				wood: 15,
				stone: 25,
				gold: 5,
			},
			workersSpeed: {
				wood: 10,
				stone: 20,
				gold: 3,
			},
		},
		clicks: 100,
		maxOnMap: 3,
		upgrades: [
			{
				cost: {
					wood: 30,
					stone: 30,
					gold: 10,
				},
				clicks: 200,
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
					wood: 50,
					stone: 50,
					gold: 20,
				},
				clicks: 300,
				maxStats: {
					gatheringPower: 3,
					gatheringChance: 10,
					criticalPower: 7,
					criticalChance: 13,
					workers: 3,
					workersSpeed: 15,
				},
			},
			{
				cost: {
					wood: 75,
					stone: 75,
					gold: 35,
				},
				clicks: 450,
				maxStats: {
					gatheringPower: 4,
					gatheringChance: 15,
					criticalPower: 10,
					criticalChance: 20,
					workers: 4,
					workersSpeed: 14,
				},
			},
		],
	},
	{
		id: 4,
		image: "workshop",
		name: "Warsztat",
		description:
			"Warsztat umożliwia ulepszanie efektywności podczas budowania i ulepszania budynków. W warsztacie można zatrudnić pracowników do automatycznej budowy.",
		size: {
			x: 2,
			y: 2,
		},
		cost: {
			wood: 25,
			stone: 25,
			gold: 25,
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
				wood: 20,
				stone: 15,
				gold: 7,
			},
			criticalPower: {
				wood: 15,
				stone: 10,
				gold: 3,
			},
			criticalChance: {
				wood: 5,
				stone: 5,
				gold: 3,
			},
			workers: {
				wood: 15,
				stone: 15,
				gold: 15,
			},
			workersSpeed: {
				wood: 10,
				stone: 10,
				gold: 7,
			},
		},
		clicks: 50,
		maxOnMap: 2,
		upgrades: [
			{
				cost: {
					wood: 30,
					stone: 50,
					gold: 25,
				},
				clicks: 125,
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
					wood: 50,
					stone: 75,
					gold: 30,
				},
				clicks: 250,
				maxStats: {
					buildingPower: 5,
					criticalPower: 10,
					criticalChance: 15,
					workers: 3,
					workersSpeed: 14,
				},
			},
			{
				cost: {
					wood: 75,
					stone: 125,
					gold: 50,
				},
				clicks: 350,
				maxStats: {
					buildingPower: 7,
					criticalPower: 15,
					criticalChance: 20,
					workers: 4,
					workersSpeed: 12,
				},
			},
		],
	},
	{
		id: 5,
		image: "vault",
		name: "Skarbiec",
		description:
			"Skarbiec przechowywuje wszystkie wylosowane karty oraz umożliwia kupowanie nowych skrzynek za monety. W skrzynkach znajdują się losowe karty, które ulepszają statystyki.",
		size: {
			x: 3,
			y: 3,
		},
		cost: {
			wood: 30,
			stone: 40,
			gold: 25,
		},
		cards: {},
		clicks: 125,
		maxOnMap: 1,
		upgrades: [
			{
				cost: {
					wood: 60,
					stone: 60,
					gold: 60,
				},
				clicks: 250,
			},
			{
				cost: {
					wood: 125,
					stone: 125,
					gold: 125,
				},
				clicks: 450,
			},
		],
	},
	{
		id: 6,
		image: "trader",
		name: "Handlarz",
		description:
			"Handlarz wymienia swoje monety na losowe zasoby, których potrzebuje. U handlarza są trzy oferty, które nagradzają monetami. Monety są potrzebne do losowania kart.",
		size: {
			x: 2,
			y: 2,
		},
		cost: {
			wood: 30,
			stone: 25,
			gold: 5,
		},
		cards: {},
		clicks: 75,
		maxOnMap: 1,
		upgrades: [
			{
				cost: {
					wood: 50,
					stone: 30,
					gold: 15,
				},
				clicks: 175,
			},
			{
				cost: {
					wood: 100,
					stone: 75,
					gold: 50,
				},
				clicks: 275,
			},
		],
	},

	//budynek dekoracyjny pozwala stawiać dekoracje na mapie
	//budynek ekploracyjny - pozwala na eksplorację po różnych proceduralnie generowanych światach
	//lochy - mini gra 2d, gdzie jakiś potwór atakuje. gracz musi unikać strzałów potwora i strzelać do potworów
	//labolatorium - pozwala stale ulepszać niektóre umiejętności gracza za pomocą monet
	//muzeum - pokazuje osiągnięcia i postępy gracza
	//budynek z eliksirami - dają one tymczasowe bonusy dla gracza, np. do zbierania drewna
];

export { buildings };
