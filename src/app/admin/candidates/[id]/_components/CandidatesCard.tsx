"use client";

import React, { useState } from "react";
import Image from "next/image";

import { CandidatesWithSuborgan } from "@/utils/database/candidates.query";
import { Large_Text, H2, H5 } from "@/app/components/general/Text";
import { FormButton } from "@/app/components/general/button";
import CandidatesModal from "./CandidatesModal";
import EmptyCandidates from "./EmptyCandidates";

const CandidatesCard = () => {
	const [candidates, setCandidates] = useState<CandidatesWithSuborgan>();
	const [modal, setModal] = useState<false | "new" | "edit">(false);

	return (
		<>
			{modal && (
				<CandidatesModal
					candidates={candidates}
					closeModal={() => setModal(false)}
				/>
			)}
			<section className="flex flex-col gap-y-5 items-center sm:items-start">
				<header className="flex justify-end w-full">
					<FormButton variant="PRIMARY" onClick={() => setModal("new")}>
						Tambah Kandidat
					</FormButton>
				</header>
				{/* CHECK IS THERE ANY CANDIDATES? */}
				{false ? (
					<main className="py-7">
						<ul className="grid grid-cols-1 xl:grid-cols-2 gap-4">
							{/* MAP ARRAY CANDIDATES HERE */}
							{[...Array(5)].fill(null).map((_, i) => (
								<li
									key={i}
									className="flex flex-col sm:flex-row items-center sm:items-start px-[15.5px] py-7 bg-white shadow-md rounded-2xl gap-[18px]"
								>
									<Image
										className="object-cover w-[170px] h-[210px]"
										src={"/logo-mpk.png"}
										alt={`Kandidat ${"nama"}`}
										width={170}
										height={210}
									/>
									<article className="flex flex-col gap-y-[28px] w-full">
										<header className="px-4 flex items-center gap-[18px]">
											<H2 className="text-primary-color">0{i + 1}</H2>
											<div>
												<H5>Nama Kandidat</H5>
												<Large_Text variant="SEMIBOLD">
													Kelas Kandidat
												</Large_Text>
											</div>
										</header>
										<main className="flex flex-col gap-y-[18px]">
											<FormButton variant="BLACK" className="w-full">
												Edit Kandidat
											</FormButton>
											<FormButton variant="PRIMARY" className="w-full">
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
