"use server";
import {
	getUserVoteResult,
	createVoteUserAccess,
	findVoteSession,
	createVoteSession,
	userVote,
	hasUserVoted,
	checkSuborganUpcomingVotingSession,
	updateVoteSession,
} from "../database/vote.query";
import { findSuborgan } from "../database/suborgan.query";
import { findManyUser } from "../database/user.query";
import { revalidatePath } from "next/cache";

export const handleUserVote = async (
	vote_session_id: string,
	candidate_id: string,
	id_user: string
) => {
	const userHasVoted = await hasUserVoted(vote_session_id, id_user);
	if (userHasVoted) return { success: false, message: "this user has voted" };
	await userVote(vote_session_id, id_user, candidate_id);
	revalidatePath("/", "layout");
};

export const handleCreateVoteSession = async (formData: FormData) => {
	const title = formData.get("title") as string;
	const openedAt = formData.get("openedAt") as string;
	const closedAt = formData.get("closedAt") as string;
	const isPublic =
		(formData.get("isPublic") as string) === "true" ? true : false;
	const max_vote = Number(formData.get("max_vote") as string);
	const suborgan_id = formData.get("suborgan_id") as string;
	try {
		const checkUpcomingVoting = await checkSuborganUpcomingVotingSession({
			suborgan_id,
		});
		if (checkUpcomingVoting) {
			return {
				success: false,
				message: "Sub organ ini sudah memiliki sesi voting yang aktif",
				data: checkUpcomingVoting,
			};
		}
		await createVoteSession({
			title,
			max_vote,
			isPublic,
			closedAt,
			openedAt,
			suborgan: {
				connect: { id: suborgan_id },
			},
		});
		revalidatePath("/", "layout");
		return { success: true, message: "Vote session created" };
	} catch (error) {
		console.log("erm", error);

		return { success: false, message: "Error creating vote session" };
	}
};

export const handleUpdateVoteSession = async (
	id: string,
	formData: FormData
) => {
	const title = formData.get("title") as string;
	const openedAt = formData.get("openedAt") as string;
	const closedAt = formData.get("closedAt") as string;
	const isPublic =
		(formData.get("isPublic") as string) === "true" ? true : false;
	const max_vote = Number(formData.get("max_vote") as string);
	const suborgan_id = formData.get("suborgan_id") as string;

	try {
		await updateVoteSession(
			{ id },
			{
				title,
				max_vote,
				isPublic,
				closedAt,
				openedAt,
				suborgan: {
					connect: { id: suborgan_id },
				},
			}
		);
		revalidatePath("/", "layout");
		return { success: true, message: "Vote session updated" };
	} catch (error) {
		console.log("Error updating vote session:", error);
		return { success: false, message: "Error updating vote session" };
	}
};

export const handleCreateVoteSessionAccess = async (
	vote_session_id: string
) => {
	const voteSession = await findVoteSession({ id: vote_session_id });
	if (!voteSession)
		return { success: false, message: "Vote session not found" };
	const suborgan = await findSuborgan({
		id: voteSession.suborgan_id,
	});
	if (!suborgan) return { success: false, message: "Vote session not found" };
	const users = await findManyUser({ suborgan_id: suborgan.id });
	const voteUserAccessData = users.map((user) => ({
		vote_session_id: voteSession.id,
		user_id: user.id,
	}));
	await createVoteUserAccess(voteUserAccessData);
};
