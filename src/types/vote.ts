type suborganNameForVote = {
	id: string;
	name: string;
};
export type voteData = {
	id: string;
	title: string;
	isPublic: boolean;
	max_vote: number;
	openedAt: Date;
	closedAt: Date;
	suborgan_id: string;
	suborgan: suborganNameForVote;
};
