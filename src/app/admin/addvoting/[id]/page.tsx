import { getAllSuborganName } from "@/utils/database/suborgan.query";
import { suborganName } from "@/types/suborgan";
import { redirect } from "next/navigation"; // Import redirect for server-side redirects
import {
	getVoteSession,
	checkIfSuborganVoteSessionIsOngoing,
} from "@/utils/database/vote.query";
import AddVoteForm from "../_components/AddVoteForm";
import { Vote_Session } from "@prisma/client";
export default async function AddVotePage({
	params,
}: {
	params: { id?: string };
}) {
	const suborganData: suborganName[] = await getAllSuborganName();
	let status = "available";
	const { id } = params;
	if (!id || typeof id !== "string") {
		redirect("/admin/jadwalvoting");
		return null;
	}

	const voteData: Vote_Session = await getVoteSession({ id });
	const isOngoing = await checkIfSuborganVoteSessionIsOngoing({
		suborgan_id: voteData.suborgan_id,
	});

	if (isOngoing) {
		status = "ongoing";
	}

	return (
		<>
			<AddVoteForm
				suborgan={suborganData}
				updateData={voteData}
				status={status}
			/>
		</>
	);
}
