"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { suborgan } from "@/types/suborgan";

export const findAllSuborgan = async () => {
	const suborganizations = await prisma.suborgan.findMany({
		include: {
			Vote_Session: true,
		},
	});

	const currentDate = new Date();

	return suborganizations.map((suborgan) => {
		const hasOpenSession = suborgan.Vote_Session.some((session) =>
			session.openedAt && session.closedAt && session.isPublic
				? currentDate >= session.openedAt && currentDate <= session.closedAt
				: false
		);

		const openSession = hasOpenSession
			? suborgan.Vote_Session.find(
					(session) =>
						currentDate >= session.openedAt &&
						currentDate <= session.closedAt &&
						session.isPublic
			  )
			: undefined;

		return {
			...suborgan,
			status: hasOpenSession ? "Buka" : "Tutup",
			Vote_Session: hasOpenSession ? openSession : undefined,
		};
	}) as suborgan[];
};

export const findSuborgan = async (where: Prisma.SuborganWhereUniqueInput) => {
	return await prisma.suborgan.findUnique({ where });
};
export const createSuborgan = async (data: Prisma.SuborganCreateInput) => {
	return await prisma.suborgan.create({ data });
};

export const updateSuborgan = async (
	where: Prisma.SuborganWhereUniqueInput,
	data: Prisma.SuborganUpdateInput
) => {
	return await prisma.suborgan.update({
		where,
		data,
	});
};

export const deleteSuborgan = async (
	where: Prisma.SuborganWhereUniqueInput
) => {
	return await prisma.suborgan.delete({ where });
};
