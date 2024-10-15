// app/suborgan/create/page.tsx
"use client";

import { useState, useEffect } from "react";
import SuborganForm from "./SuborganForm";
import { handleCreateSuborgan } from "@/utils/actions/suborgan";
import {
	findAllSuborganVote,
	deleteSuborgan,
} from "@/utils/database/suborgan.query";
import { Suborgan } from "@prisma/client"; // Adjust import based on your actual model location

export default function CreateSuborganPage() {
	const [suborgans, setSuborgans] = useState<Suborgan[]>([]);

	// Fetch all Suborgan records
	const fetchSuborgans = async () => {
		const data = await findAllSuborganVote();
		setSuborgans(data);
	};

	// Initial fetch
	useEffect(() => {
		fetchSuborgans();
	}, []);

	const handleDeleteSuborgan = async (id: string) => {
		await deleteSuborgan({ id: id });
		// Refresh the list after deletion
		fetchSuborgans();
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="max-w-lg w-full mb-8">
				<h1 className="text-2xl font-bold text-center mb-4">Create Suborgan</h1>
				<SuborganForm onSubmit={handleCreateSuborgan} />
			</div>
			<div className="max-w-lg w-full">
				<h2 className="text-xl font-bold mb-4">All Suborgans</h2>
				<ul className="bg-white shadow-md rounded p-4">
					{suborgans.length > 0 ? (
						suborgans.map((suborgan) => (
							<li
								key={suborgan.id}
								className="mb-2 p-2 border-b last:border-none flex justify-between items-center"
							>
								<div className="flex items-center">
									<span className="text-gray-700 font-medium mr-4">
										{suborgan.name}
									</span>
									<span className="text-gray-700 font-medium">
										{suborgan.logo}
									</span>
								</div>
								<button
									onClick={() => handleDeleteSuborgan(suborgan.id)}
									className="text-red-500 hover:text-red-700 transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</li>
						))
					) : (
						<li className="text-gray-500">No suborgans found.</li>
					)}
				</ul>
			</div>
		</div>
	);
}
