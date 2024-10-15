"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const createVoteSession = async (
	data: Prisma.Vote_SessionCreateInput
) => {
	return await prisma.vote_Session.create({ data });
};

export const updateVoteSession = async (
	where: Prisma.Vote_SessionWhereUniqueInput,
	data: Prisma.Vote_SessionUpdateInput
) => {
	return await prisma.vote_Session.update({
		where,
		data,
	});
};
export const getAllOngoingVotingSession = async () => {
	const today = new Date();

	return await prisma.vote_Session.findMany({
		where: {
			AND: [
				{
					openedAt: {
						lt: today,
					},
				},
				{
					closedAt: {
						gt: today,
					},
				},
			],
			isPublic: true,
		},
		include: {
			suborgan: {
				select: {
					name: true,
				},
			},
		},
		orderBy: {
			openedAt: "asc",
		},
	});
};

export const checkIfSuborganVoteSessionIsOngoing = async (
	where: Prisma.Vote_SessionWhereInput
) => {
	const today = new Date();
	return await prisma.vote_Session.findFirst({
		where: {
			AND: [
				{
					openedAt: {
						lt: today,
					},
				},
				{
					closedAt: {
						gt: today,
					},
				},
			],
			isPublic: true,
			suborgan_id: where.suborgan_id,
		},
		include: {
			suborgan: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
};

export const checkSuborganUpcomingVotingSession = async (
	where: Prisma.Vote_SessionWhereInput
) => {
	const today = new Date();

	return await prisma.vote_Session.findFirst({
		where: {
			OR: [
				{
					openedAt: {
						gt: today,
					},
				},
				{
					AND: [
						{
							openedAt: {
								lt: today,
							},
						},
						{
							closedAt: {
								gt: today,
							},
						},
					],
				},
			],
			isPublic: true,
			suborgan_id: where.suborgan_id,
		},
		include: {
			suborgan: {
				select: {
					name: true,
				},
			},
		},
	});
};

export const getAllUpcomingVoteSession = async () => {
	const today = new Date();

	return await prisma.vote_Session.findMany({
		where: {
			OR: [
				{
					openedAt: {
						gt: today,
					},
				},
				{
					AND: [
						{
							openedAt: {
								lt: today,
							},
						},
						{
							closedAt: {
								gt: today,
							},
						},
					],
				},
			],
			isPublic: true,
		},
		include: {
			suborgan: {
				select: {
					name: true,
					id: true,
				},
			},
		},
		orderBy: {
			openedAt: "asc",
		},
	});
};

export const userVote = async (
	vote_session_id: string,
	user_id: string,
	candidate_id: string
) => {
	return await prisma.user_Vote.create({
		data: {
			vote_session_id,
			user_id,
			candidate_id,
		},
	});
};

export const hasUserVoted = async (
	vote_session_id: string,
	user_id: string
) => {
	return await prisma.user_Vote.findFirst({
		where: {
			vote_session_id,
			user_id,
		},
	});
};

export const findVoteSession = async (
	where: Prisma.Vote_SessionWhereUniqueInput
) => {
	return await prisma.vote_Session.findUnique({ where });
};

export const createVoteSessionCandidate = async (
	data: Prisma.Vote_Session_CandidateCreateInput
) => {
	return await prisma.vote_Session_Candidate.create({ data });
};
export const createVoteUserAccess = async (
	data: Prisma.Vote_Session_AccessCreateManyInput[]
) => {
	return await prisma.vote_Session_Access.createMany({ data });
};
export const getVoteSession = async (
	where: Prisma.Vote_SessionWhereUniqueInput
) => {
	return await prisma.vote_Session.findUnique({
		where,
		include: {
			Vote_Session_Candidate: true,
		},
	});
};

export const getUserVoteResult = async (vote_session_id: string) => {
	return await prisma.user_Vote.groupBy({
		by: ["candidate_id"],
		where: { vote_session_id },
		_count: {
			candidate_id: true,
		},
		orderBy: {
			_count: {
				candidate_id: "desc",
			},
		},
	});
};
