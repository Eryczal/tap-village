const chests = [
	{
		id: 1,
		image: "common",
		name: "Zwykła skrzynia",
		description: "Umożliwia zdobycie zwykłych i rzadkich kart.",
		chances: [800, 1000, 1001, 1001],
		cost: 10,
	},
	{
		id: 2,
		image: "rare",
		name: "Rzadka skrzynia",
		description: "Umożliwia zdobycie zwykłych, rzadkich i epickich kart. Karty wyższej rzadkości mają większe szanse na wylosowanie.",
		chances: [700, 975, 1000, 1001],
		cost: 25,
	},
	{
		id: 3,
		image: "epic",
		name: "Epicka skrzynia",
		description: "Umożliwia zdobycie zwykłych, rzadkich, epickich i legendarnych kart. Karty wyższej rzadkości mają większe szanse na wylosowanie.",
		chances: [500, 900, 995, 1000],
		cost: 75,
	},
	{
		id: 4,
		image: "legendary",
		name: "Legendarna skrzynia",
		description: "Umożliwia zdobycie zwykłych, rzadkich, epickich i legendarnych kart. Karty wyższej rzadkości mają większe szanse na wylosowanie.",
		chances: [350, 850, 975, 1000],
		cost: 125,
	},
];

export { chests };
