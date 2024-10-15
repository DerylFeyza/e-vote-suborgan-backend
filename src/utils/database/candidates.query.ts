"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const findAllCandidates = async (
	filter?: Prisma.CandidatesWhereInput
) => {
	return await prisma.candidates.findMany({
		where: filter,
		include: { Pengalaman: true },
	});
};

export const findAllCandidatesByVoteSession = async (voteSessionId: string) => {
	return await prisma.candidates.findMany({
		where: {
			Vote_Session_Candidate: {
				some: {
					vote_session_id: voteSessionId,
				},
			},
		},
		include: { Pengalaman: true },
	});
};
export const findCandidates = async (
	where: Prisma.CandidatesWhereUniqueInput
) => {
	return await prisma.candidates.findUnique({ where });
};

export const createCandidate = async (data: Prisma.CandidatesCreateInput) => {
	return await prisma.candidates.create({ data });
};

export const updateCandidate = async (
	where: Prisma.CandidatesWhereUniqueInput,
	data: Prisma.CandidatesUpdateInput
) => {
	return await prisma.candidates.update({
		where,
		data,
	});
};

export const deleteCandidate = async (
	where: Prisma.CandidatesWhereUniqueInput
) => {
	return await prisma.candidates.delete({ where });
};

export type CandidatesWithSuborgan = Prisma.CandidatesGetPayload<{
	include: { suborgan: { select: { name: true } } };
}>;
