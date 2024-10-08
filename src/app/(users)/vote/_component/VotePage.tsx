"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { H1, H5, Large_Text, Medium_Text } from "@/app/components/general/Text";
import { FormButton } from "@/app/components/general/button";
import { ModalDialog, VoteModal } from "@/app/components/general/Modal";
import { handleUserVote } from "@/utils/actions/vote";
import { CandidateWithPengalaman } from "@/types/entityRelations";
import { useSession } from "next-auth/react";
import { hasUserVoted } from "@/utils/database/vote.query";
import { useRouter } from "next/navigation";
export default function VotePage({
	candidates,
	voteId,
}: {
	candidates: CandidateWithPengalaman[];
	voteId: string;
}) {
	const [modal, setModal] = useState(null);
	const [selected, setIsSelected] = useState<string[]>([]);
	const [dialouge, setDialouge] = useState(false);
	const maxVote = 1;
	const session = useSession();
	const selectedCandidates = (candidateId: string) => {
		if (selected.length >= maxVote && !selected.includes(candidateId))
			return alert("Batas memilih adalah " + maxVote + " kandidat");

		setIsSelected((prev) =>
			prev.includes(candidateId)
				? prev.filter((candidate) => candidate !== candidateId)
				: [...prev, candidateId]
		);
	};

	const router = useRouter();

	useEffect(() => {
		const checkUserVote = async () => {
			if (!session || !session.data || !session.data.user) return;
			const userHasVoted = await hasUserVoted(voteId, session.data.user.id);
			if (userHasVoted) {
				router.push("/aftervote");
			}
		};

		checkUserVote();
	}, [voteId, session, router]);

	const openDetailModal = (candidates: any) => {
		setModal((prev) => (prev === candidates ? null : candidates));
	};

	const handleDialouge = () => {
		if (selected.length < maxVote)
			return alert("Anda harus memilih " + maxVote + " kandidat");

		setDialouge(!dialouge);
	};

	const handleSubmit = async () => {
		if (selected.length === 1) {
			await handleUserVote(voteId, session!.data!.user!.id, selected[0]);
			alert("Voting submitted!");
		}
		setDialouge(false);
	};

	return (
		<div className="max-w-full w-full mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 mt-20 mb-20 min-h-[60vh]">
			{candidates &&
				candidates.map((candidate, indexCandidate) => (
					<div key={indexCandidate} className={`relative mx-5 lg:mx-0 `}>
						<div className="max-w-full bg-white rounded-2xl z-20 mx-auto transition-all">
							{selected.includes(candidate.id) && (
								<div className="px-8 pt-8 w-full mx-auto">
									<div className="bg-primary-color flex justify-center gap-x-3 rounded-lg py-3">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
												fill="white"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M16.6402 8.2318C17.0645 8.58537 17.1218 9.21593 16.7682 9.64021L11.7682 15.6402C11.5937 15.8497 11.3411 15.9788 11.0691 15.9976C10.797 16.0165 10.5291 15.9234 10.3273 15.74L7.32733 13.0127C6.91868 12.6412 6.88856 12.0087 7.26007 11.6001C7.63157 11.1914 8.26402 11.1613 8.67268 11.5328L10.9002 13.5578L15.2318 8.35984C15.5854 7.93556 16.2159 7.87824 16.6402 8.2318Z"
												fill="white"
											/>
										</svg>
										<Medium_Text variant="MEDIUM" className="text-white">
											Kandidat Dipilih
										</Medium_Text>
									</div>
								</div>
							)}
							<div className="p-8 lg:flex gap-x-[28px] w-fit h-auto mx-auto">
								<div>
									<Image
										src={candidate.img}
										alt="Foto Kandidat"
										className="mx-auto mb-4 lg:mb-0 h-auto"
										width={200}
										height={300}
									/>
								</div>
								<div className="">
									<div className="flex gap-x-3 mb-4 w-full justify-between">
										<H1 className="text-primary-color">{indexCandidate + 1}</H1>
										<div>
											<H5 className="">{candidate.name}</H5>
											<Large_Text variant="SEMIBOLD">
												{candidate.kelas}
											</Large_Text>
										</div>
									</div>
									<div className="flex flex-col gap-y-4">
										{selected.includes(candidate.id) ? (
											<FormButton
												onClick={() => selectedCandidates(candidate.id)}
												variant="SECONDARY"
												className="w-full"
											>
												<Large_Text variant="BOLD">Batalkan Pilihan</Large_Text>
											</FormButton>
										) : (
											<FormButton
												onClick={() => selectedCandidates(candidate.id)}
												variant="PRIMARY"
												className="w-full"
											>
												<Large_Text variant="BOLD">Pilih Kandidat</Large_Text>
											</FormButton>
										)}
										<FormButton
											onClick={() => openDetailModal(indexCandidate)}
											variant="BLACK"
											className="w-full"
										>
											<Large_Text variant="BOLD">Lihat Detail</Large_Text>
										</FormButton>
									</div>
								</div>
							</div>
							<div className="z-40">
								{modal === indexCandidate && (
									<VoteModal onClose={() => setModal(null)}>
										<div className="my-3">
											<Large_Text
												variant="BOLD"
												className="mb-2 p-2 text-center"
											>
												Visi
											</Large_Text>
											<Medium_Text
												variant="REGULAR"
												className="text-center my-3 bg-dark-8 py-2 rounded-md"
											>
												{candidate.visi}
											</Medium_Text>
										</div>
										<div className="my-3">
											<Large_Text variant="BOLD" className="mb-2 text-center">
												Misi
											</Large_Text>
											<Medium_Text
												variant="REGULAR"
												className="text-center my-3 bg-dark-8 py-2 rounded-md"
											>
												{candidate.misi}
											</Medium_Text>
										</div>
										<div className="my-3">
											<Large_Text variant="BOLD" className="mb-2 text-center">
												Motto
											</Large_Text>
											<Medium_Text
												variant="REGULAR"
												className="text-center my-3 bg-dark-8 py-2 rounded-md"
											>
												{candidate.motto}
											</Medium_Text>
										</div>
										<Large_Text variant="BOLD" className="mb-2 text-center">
											Pengalaman
										</Large_Text>
										{candidate.Pengalaman.map((pengalaman, indexPengalaman) => (
											<div
												key={indexPengalaman}
												className="my-3 bg-dark-8 py-2 rounded-md"
											>
												<Medium_Text variant="REGULAR" className="text-center">
													{pengalaman.description}
												</Medium_Text>
											</div>
										))}
										<div className="my-3">
											<Large_Text variant="BOLD" className="mb-2 text-center">
												Program Kerja
											</Large_Text>
											<Medium_Text
												variant="REGULAR"
												className="text-center my-3 bg-dark-8 py-2 rounded-md"
											>
												{candidate.progja}
											</Medium_Text>
										</div>
										{candidate.video_profil && (
											<div className="mb-3 mt-6">
												<Large_Text variant="BOLD" className="mb-2 text-center">
													Video Profil Kandidat
												</Large_Text>
												<iframe
													src={candidate.video_profil}
													title="YouTube video player"
													className="rounded-[15px] w-full h-[320px] mx-auto duration-500 ease-in-out"
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													referrerPolicy="strict-origin-when-cross-origin"
													allowFullScreen
												></iframe>
											</div>
										)}
									</VoteModal>
								)}
							</div>
						</div>
					</div>
				))}
			{selected.length > 0 && (
				<div className="fixed bottom-6 right-6 z-50">
					<FormButton onClick={handleDialouge} variant="PRIMARY">
						Submit Pilihanmu
					</FormButton>
				</div>
			)}
			{dialouge && (
				<ModalDialog
					isOpen={dialouge}
					onClose={() => setDialouge(false)}
					handleSubmit={handleSubmit}
				>
					<div className="flex flex-col justify-center items-center">
						<Large_Text variant="BOLD" className="text-[18px] font-[700]">
							Apakah Anda yakin ingin mengirim suara?
						</Large_Text>
					</div>
				</ModalDialog>
			)}
		</div>
	);
}
