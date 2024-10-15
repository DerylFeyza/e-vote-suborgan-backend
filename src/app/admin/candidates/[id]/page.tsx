import React from "react";
import CandidatesCard from "./_components/CandidatesCard";
import { checkSuborganUpcomingVotingSession } from "@/utils/database/vote.query";
import { findSuborgan } from "@/utils/database/suborgan.query";
import { findAllCandidatesByVoteSession } from "@/utils/database/candidates.query";
import { CandidateWithPengalaman } from "@/types/entityRelations";

const Kandidat = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	let vote_session: any;
	try {
		const result = await checkSuborganUpcomingVotingSession({
			suborgan_id: id,
		});
		vote_session = result ?? undefined;
	} catch (error) {
		console.error("Error fetching suborgan data:", error);
	}

	const suborgan: any = await findSuborgan({ id });
	const candidates: CandidateWithPengalaman[] =
		await findAllCandidatesByVoteSession(vote_session?.id);
	return (
		<main>
			<CandidatesCard
				vote_session={vote_session}
				suborgan={suborgan}
				candidatesData={candidates}
			/>
		</main>
	);
};

export default Kandidat;
