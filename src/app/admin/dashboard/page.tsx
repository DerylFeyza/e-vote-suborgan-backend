import React from "react";
import { User } from "@prisma/client";
import { findAllUser } from "@/utils/database/user.query";
import UserTable from "./_components/Table";
import OngoingVote from "./_components/OngoingVote";
import { getAllOngoingVotingSession } from "@/utils/database/vote.query";

export default async function Dashboard() {
	const ongoingVoteSession = await getAllOngoingVotingSession();
	const admin: User[] = await findAllUser();
	return (
		<main className="h-full overflow-x-hidden">
			<OngoingVote votes={ongoingVoteSession} />
			<UserTable
				roles="Admin"
				desc="Bertugas Untuk Mengontrol dan Mengawasi Sepenuhnya atas Sistem yang sudah di buat"
				data={admin}
			/>
			<div className="my-10"></div>
		</main>
	);
}
