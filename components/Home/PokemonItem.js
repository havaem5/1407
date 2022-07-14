import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { pokemonApi } from "../../apis/pokemonApi";

export default function PokemonItem({ data }) {
	const router = useRouter();
	// const pokemonRef = React.useRef();
	const [pokemon, setPokemon] = useState(null);
	// const [isHover, setIsHover] = useState(false);
	useEffect(() => {
		async function fetchData() {
			const pokemonData = await pokemonApi.getOnePokemon(data.url);
			setPokemon(pokemonData);
		}
		fetchData();
	}, [data.url]);
	/* useEffect(() => {
		function handleHover() {
			setIsHover((pre) => !pre);
		}
		const pokemon = pokemonRef.current;
		if (pokemon) {
			pokemon.addEventListener("mouseenter", handleHover);
			pokemon.addEventListener("mouseleave", handleHover);
		}
		return () => {
			if (pokemon) {
				pokemon.removeEventListener("mouseenter", handleHover);
				pokemon.addEventListener("mouseleave", handleHover);
			}
		};
	}, [pokemonRef]); */

	return (
		<div
			className="bg-white border border-slate-200 rounded-md shadow-md p-4 relative hover:shadow-lg cursor-pointer transition-all flex-1 min-w-[200px] max-w-[300px] flex flex-col"
			key={data.name}
			onClick={() => router.push(`/pokemon/${pokemon.id || 1}`)}
			// ref={pokemonRef}
		>
			<div className="image-container flex-1">
				{pokemon && (
					<Image
						// src={!isHover ? pokemon.sprites.front_default : pokemon.sprites.back_default}
						src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default}
						alt={data.name}
						layout="fill"
						className="image"
						priority
					/>
				)}
			</div>
			<p className="text-center mt-auto">{data.name}</p>
		</div>
	);
}
