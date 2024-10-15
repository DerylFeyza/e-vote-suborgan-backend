import AddVoteForm from "./_components/AddVoteForm";
import { getAllSuborganName } from "@/utils/database/suborgan.query";
import { suborganName } from "@/types/suborgan";

export default async function AddVotePage() {
	const suborganData: suborganName[] = await getAllSuborganName();

	return (
		<>
			<AddVoteForm suborgan={suborganData} />
		</>
	);
}
