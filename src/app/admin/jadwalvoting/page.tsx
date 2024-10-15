import JadwalVoting from "./JadwalVotingPage";
import { getAllUpcomingVoteSession } from "@/utils/database/vote.query";
export default async function JadwalVotingPage() {
	const upcomingVoteData = await getAllUpcomingVoteSession();
	return <JadwalVoting voteData={upcomingVoteData} />;
}
