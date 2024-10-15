import React from "react";

import { CandidatesWithSuborgan } from "@/utils/database/candidates.query";

const CandidatesModal = ({
	candidates,
}: {
	candidates: CandidatesWithSuborgan;
}) => {
	return (
		<article className="w-screen h-screen fixed top-0 left-0 z-[999] backdrop-brightness-50">
			<main>p</main>
		</article>
	);
};

export default CandidatesModal;
