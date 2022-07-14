export const pokemonApi = {
	getPokemon: async (offset, limit) => {
		const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	},
	getOnePokemon: async (url) => {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	},
	getOnePokemonFromId: async (id) => {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
		const data = await response.json();
		return data;
	},
};
