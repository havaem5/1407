import { useEffect, useState } from "react";
import { pokemonApi } from "../apis/pokemonApi";
import PokemonItem from "../components/Home/PokemonItem";
import useDebounce from "../hooks/useDebounce";
import InfiniteScroll from "react-infinite-scroll-component";
const LIMIT = 40;

export default function Home() {
	const [isEnd, setIsEnd] = useState(false);
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState("");
	const [pokemon, setPokemon] = useState([]);
	const checkDebounce = useDebounce(search, 1000);
	const handleChange = (e) => {
		setSearch(e.target.value);
	};
	const handleFetch = () => {
		setPage(page + 1);
	};

	useEffect(() => {
		async function fetchData() {
			const pokemonData = await pokemonApi.getPokemon(page * LIMIT, LIMIT);
			if (!pokemonData.next) {
				setIsEnd(true);
			}
			setPokemon((pre) => [...pre, ...pokemonData.results]);
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		if (search === checkDebounce) {
			console.log("search");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkDebounce]);
	return (
		<>
			<h1 className="font-bold text-center text-2xl py-2">POKEMON - GROUP 1</h1>
			<div className="flex-col-center mt-4 py-2 space-y-4 container">
				{/* 	<input
					className="min-w-[300px] px-4 py-2 rounded-md shadow-md focus:outline-none border border-slate-200"
					type="text"
					name="search"
					id="search"
					value={search}
					onChange={handleChange}
					placeholder="Search for a pokemon"
				/> */}
				<InfiniteScroll
					dataLength={pokemon.length}
					next={handleFetch}
					hasMore={!isEnd}
					loader={<h4 className="text-center">Loading...</h4>}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
					className="flex gap-8 flex-wrap justify-center"
				>
					{pokemon.map((pokemon, index) => (
						<PokemonItem key={pokemon.name + index} data={pokemon} />
					))}
				</InfiniteScroll>
			</div>
		</>
	);
}
