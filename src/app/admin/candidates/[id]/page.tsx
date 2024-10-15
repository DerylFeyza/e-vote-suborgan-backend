import React from "react";

import CandidatesCard from "./_components/CandidatesCard";

const Kandidat = ({ params }: { params: { id: string } }) => {
	return (
		<main>
			<CandidatesCard />
		</main>
	);
};

export default Kandidat;
