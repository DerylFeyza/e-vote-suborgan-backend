"use client";

import React, { useState } from "react";
import Image from "next/image";

import { CandidatesWithSuborgan } from "@/utils/database/candidates.query";
import { CandidateWithPengalaman } from "@/types/entityRelations";
import { Large_Text, H2, H5 } from "@/app/components/general/Text";
import { FormButton } from "@/app/components/general/button";
import CandidatesModal from "./CandidatesModal";
import EmptyCandidates from "./EmptyCandidates";
import { Suborgan } from "@prisma/client";
import toast from "react-hot-toast";
import { handleDeleteCandidate } from "@/utils/actions/candidates";

const CandidatesCard = ({
	vote_session,
	suborgan,
	candidatesData,
}: {
	vote_session?: any;
	suborgan: Suborgan;
	candidatesData: CandidateWithPengalaman[];
}) => {
	const [candidates, setCandidates] = useState<CandidatesWithSuborgan>();
	const [modal, setModal] = useState<false | "new" | "edit">(false);
	const [isLoading, setIsLoading] = useState(false);
	const handleDelete = async (id: string) => {
		try {
			const toastId = toast.loading("Loading...");
			const result = await handleDeleteCandidate(id);

			if (result.success) {
				toast.success(result.message, { id: toastId });
			} else {
				console.log(result);
				toast.error(result.message, { id: toastId });
			}
		} catch (error) {
			console.log((error as Error).message);
			toast.error((error as Error).message + ", Error");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{modal && (
				<CandidatesModal
					candidates={candidates}
					closeModal={() => setModal(false)}
					suborgan={suborgan}
					vote_session={vote_session}
				/>
			)}
			<section className="flex flex-col gap-y-5 items-center sm:items-start">
				<header className="flex justify-between w-full">
					<div>
						{!vote_session && <p>Belum Ada Vote Session Untuk Suborgan Ini</p>}
						{vote_session && (
							<p>
								Sesi Vote Aktif: {vote_session?.id}({vote_session?.title}){}
							</p>
						)}
					</div>
					<FormButton variant="PRIMARY" onClick={() => setModal("new")}>
						Tambah Kandidat
					</FormButton>
				</header>
				{candidatesData.length > 0 ? (
					<main className="py-7">
						<ul className="grid grid-cols-1 xl:grid-cols-2 gap-4">
							{/* MAP ARRAY CANDIDATES HERE */}
							{candidatesData.map((candidate, index) => (
								<li
									key={candidate.id}
									className="flex flex-col sm:flex-row items-center sm:items-start px-[15.5px] py-7 bg-white shadow-md rounded-2xl gap-[18px]"
								>
									<Image
										className="object-cover w-[170px] h-[210px]"
										src={`${candidate.img}`}
										alt={candidate.name}
										width={170}
										height={210}
									/>

									<article className="flex flex-col gap-y-[28px] w-full">
										<header className="px-4 flex items-center gap-[18px]">
											<H2 className="text-primary-color">{}</H2>
											<div>
												<H5>{candidate.name}</H5>
												<Large_Text variant="SEMIBOLD">
													{candidate.kelas}
												</Large_Text>
											</div>
										</header>
										<main className="flex flex-col gap-y-[18px]">
											<FormButton variant="BLACK" className="w-full">
												Edit Kandidat
											</FormButton>
											<FormButton
												variant="PRIMARY"
												className="w-full"
												onClick={() => handleDelete(candidate.id)}
											>
												Hapus Kandidat
											</FormButton>
										</main>
									</article>
								</li>
							))}
						</ul>
					</main>
				) : (
					<EmptyCandidates />
				)}
			</section>
		</>
	);
};

export default CandidatesCard;
