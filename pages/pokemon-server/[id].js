import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { pokemonApi } from "../../apis/pokemonApi";

export default function PokemonDetail({ data }) {
	console.log("data: ", data);
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Head>
				<title>{data.name}</title>
				<link rel="icon" href={data.sprites.front_default} />
			</Head>
			<div className="container flex-col-center gap-16">
				<h2 className="text-center font-bold text-2xl">POKEMON DETAIL</h2>
				<table className="table-auto min-w-[300px]">
					<tbody>
						<tr className="text-left border-y border-x border-slate-200">
							<th className="border-r border-slate-200 p-2">Image:</th>
							<td className="font-medium text-gray-600 p-2">
								<div className="image-container">
									<Image
										// src={data.sprites.front_default}
										src={data.sprites.other.dream_world.front_default}
										alt={data.name}
										layout="fill"
										className="image"
										priority
									/>
								</div>
							</td>
						</tr>
						<tr className="text-left border-b border-x border-slate-200">
							<th className="border-r border-slate-200 p-2">Name:</th>
							<td className="font-medium text-gray-600 p-2">{data.name}</td>
						</tr>
						<tr className="text-left border-b border-x border-slate-200">
							<th className="border-r border-slate-200 p-2">Weight:</th>
							<td className="font-medium text-gray-600 p-2">{data.weight}kg</td>
						</tr>
						<tr className="text-left border-b border-x border-slate-200">
							<th className="border-r border-slate-200 p-2">Type:</th>
							<td className="font-medium text-gray-600 p-2">
								{data.types.map((item) => (
									<span
										key={item.slot}
										className="rounded-md inline-block bg-slate-200 px-2 py-1 text-sm text-gray-600 mr-2"
									>
										{item.type.name}
									</span>
								))}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button
				className="my-2 block mx-auto p-2 bg-red-500 rounded-md text-white"
				onClick={() => router.push("/")}
			>
				Back to Home
			</button>
		</>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.params;
	const data = await pokemonApi.getOnePokemonFromId(id);

	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: { data },
	};
}
