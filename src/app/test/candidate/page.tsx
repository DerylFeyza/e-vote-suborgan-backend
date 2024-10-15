// app/candidate/create/page.tsx
"use client"; // Convert to client component

import { useState, useEffect } from "react";
import { handleCreateCandidate } from "@/utils/actions/candidates";
import CandidateForm from "./CandidateForm";
import {
	findAllCandidates,
	deleteCandidate,
} from "@/utils/database/candidates.query";
import { Candidates } from "@prisma/client"; // Adjust import based on your actual model location

export default function CreateCandidatePage() {
	const [candidates, setCandidates] = useState<Candidates[]>([]);

	// Fetch candidates when component mounts
	useEffect(() => {
		async function fetchCandidates() {
			const data = await findAllCandidates();
			setCandidates(data);
		}
		fetchCandidates();
	}, []);

	const handleDeleteCandidate = async (id: string) => {
		await deleteCandidate({ id });
		// Refresh candidates list after deletion
		const data = await findAllCandidates();
		setCandidates(data);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
			<div className="max-w-lg w-full mb-8">
				<h1 className="text-2xl font-bold text-center mb-4">
					Create Candidate
				</h1>
				<CandidateForm onSubmit={handleCreateCandidate} />
			</div>

			<div className="max-w-lg w-full">
				<h2 className="text-xl font-semibold text-center mb-4">
					All Candidates
				</h2>
				<ul className="space-y-4">
					{candidates.map((candidate) => (
						<li
							key={candidate.id}
							className="bg-white p-4 shadow-md rounded-md flex items-center justify-between"
						>
							<div>
								<h3 className="text-lg font-bold">{candidate.name}</h3>
								<p>Kelas: {candidate.kelas}</p>
								<p>Visi: {candidate.visi}</p>
								<p>Misi: {candidate.misi}</p>
								<p>motto: {candidate.motto}</p>
								<p>Progja: {candidate.progja}</p>
								<p>
									Video Profil:{" "}
									<a
										href={candidate.video_profil}
										target="_blank"
										className="text-blue-500 hover:underline"
									>
										{candidate.video_profil}
									</a>
								</p>
								<p>Suborgan ID: {candidate.suborgan_id}</p>
							</div>
							<button
								onClick={() => handleDeleteCandidate(candidate.id)}
								className="text-red-600 hover:text-red-800"
								aria-label="Delete candidate"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
