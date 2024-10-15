import React from "react";
import Image from "next/image";

import { Medium_Text, H5 } from "@/app/components/general/Text";
import { voteData } from "@/types/vote";
const OngoingVote = ({ votes }: { votes: voteData[] }) => {
	return (
		<section className="py-6">
			<article className="py-7 px-[52px] bg-white rounded-2xl shadow-md flex flex-col gap-[25px]">
				<header>
					<Medium_Text variant="BOLD">Ongoing Vote</Medium_Text>
					<Medium_Text variant="REGULAR" className="text-secondary-text-color">
						{"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
					</Medium_Text>
				</header>
				<ul className="flex flex-col gap-y-4">
					{votes.map((vote) => (
						<li key={vote.id} className="flex flex-wrap gap-7">
							<Image
								src={"/logo-mpk.png"}
								alt={`Logo ${vote.suborgan.name}`}
								width={60}
								height={60}
							/>
							<H5>{vote.suborgan.name}</H5>
						</li>
					))}
				</ul>
			</article>
		</section>
	);
};

export default OngoingVote;
