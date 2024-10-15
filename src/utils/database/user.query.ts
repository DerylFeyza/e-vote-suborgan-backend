"use server";

import prisma from "@/lib/prisma";
import { encrypt } from "@/utils/encrypt";
import { Prisma } from "@prisma/client";

export const findAllUser = async () => {
	return await prisma.user.findMany();
};

export const countAllUsers = async () => {
	return await prisma.user.count();
};

export const countUsersInVoteSession = async (voteSessionId: string) => {
	return await prisma.user_Vote.count({
		where: {
			vote_session_id: voteSessionId,
		},
	});
};

export const findUser = async (where: Prisma.UserWhereUniqueInput) => {
	return await prisma.user.findUnique({ where });
};

export const findManyUser = async (where: Prisma.UserWhereInput) => {
	return await prisma.user.findMany({ where });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
	return await prisma.user.create({
		data: {
			...data,
			password: data.password ? await encrypt(data.password) : undefined,
		},
	});
};

export const updateUser = async (
	where: Prisma.UserWhereUniqueInput,
	data: Prisma.UserUpdateInput
) => {
	return await prisma.user.update({
		where,
		data: {
			...data,
			password: data.password
				? await encrypt(data.password as string)
				: undefined,
		},
	});
};

export const deleteUser = async (where: Prisma.UserWhereUniqueInput) => {
	return await prisma.user.delete({ where });
};
