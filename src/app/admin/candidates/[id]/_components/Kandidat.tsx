import React from "react";

import { H2 } from "@/app/components/general/Text";

const KandidatCard = () => {
	return (
		<section className="flex flex-col gap-y-7">
			<header className="flex justify-end">tambah kandidat</header>
			<main>
				<ul className="grid grid-cols-2">
					<li>
						<article>
							<H2>1</H2>
						</article>
					</li>
				</ul>
			</main>
		</section>
	);
};

export default KandidatCard;
