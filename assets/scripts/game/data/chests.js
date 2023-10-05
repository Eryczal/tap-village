const chests = [
	{
		id: 1,
		image: "common",
		name: "Zwykła skrzynia",
		description: "Umożliwia zdobycie zwykłych i rzadkich kart.",
		cost: 10,
	},
	{
		id: 2,
		image: "rare",
		name: "Rzadka skrzynia",
		description: "Umożliwia zdobycie zwykłych, rzadkich i epickich kart. Karty wyższej rzadkości mają większe szanse na wylosowanie.",
		cost: 25,
	},
	{
		id: 3,
		image: "epic",
		name: "Epicka skrzynia",
		description: "Umożliwia zdobycie zwykłych, rzadkich, epickich i legendarnych kart. Karty wyższej rzadkości mają większe szanse na wylosowanie.",
		cost: 75,
	},
	{
		id: 4,
		image: "legendary",
		name: "Legendarna skrzynia",
		description: "Umożliwia zdobycie zwykłych, rzadkich, epickich i legendarnych kart. Karty wyższej rzadkości mają większe szanse na wylosowanie.",
		cost: 125,
	},
];

export { chests };
