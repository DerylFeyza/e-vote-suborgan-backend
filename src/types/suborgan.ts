import { Vote_Session } from "@prisma/client";
export type suborgan = {
	id: string;
	name: string;
	logo: string;
	status: string;
	Vote_Session?: Vote_Session;
};
