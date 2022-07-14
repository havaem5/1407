import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Test() {
	const [items, setItems] = useState(Array.from({ length: 20 }));
	const [hasMore, setHasMore] = useState(true);
	const fetchMoreData = () => {
		if (items.length >= 500) {
			setHasMore(false);
			return;
		}
		setTimeout(() => {
			setItems([...items, Array.from({ length: 20 })]);
		}, 500);
	};
	return (
		<InfiniteScroll
			dataLength={items.length}
			next={fetchMoreData}
			hasMore={hasMore}
			loader={<h4>Loading...</h4>}
			endMessage={
				<p style={{ textAlign: "center" }}>
					<b>Yay! You have seen it all</b>
				</p>
			}
		>
			{items.map((i, index) => (
				<div key={index}>div - #{index}</div>
			))}
		</InfiniteScroll>
	);
}
