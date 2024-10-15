"use client";
import { useState, useEffect } from "react";
import { voteData } from "@/types/vote";
import Link from "next/link";
export default function JadwalVoting({ voteData }: { voteData: voteData[] }) {
	const CurrentDate = () => {
		const [currentDate, setCurrentDate] = useState("");

		useEffect(() => {
			const today = new Date();
			const formattedDate = today.toLocaleDateString("id-ID", {
				day: "numeric",
				month: "long",
				year: "numeric",
			});
			setCurrentDate(formattedDate);
		}, []);

		return currentDate;
	};
	return (
		<div className="max-w-3xl p-4 bg-pink-50 font-sans">
			<div className="bg-white rounded-lg shadow-md mb-6 p-6">
				<h2 className="text-lg font-semibold mb-2">Tanggal</h2>
				<h3 className="text-3xl font-bold">{CurrentDate()}</h3>
			</div>

			<div className="bg-white rounded-lg shadow-md mb-6 p-6">
				<h2 className="text-lg font-semibold mb-2">Atur Jadwal Vote</h2>
				<p className="text-gray-500 mb-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
				<Link
					href="/admin/addvoting"
					className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					Tambah Jadwal Voting
				</Link>
			</div>

			<div className="bg-white rounded-lg shadow-md mb-6 p-6">
				<h2 className="text-lg font-semibold mb-2">Schedule</h2>

				{voteData.map((item) => (
					<div
						key={item.id}
						className="bg-white rounded-lg shadow-md mb-6 p-6 flex items-center justify-between"
					>
						<div className="flex flex-col">
							<h1 className="text-lg font-semibold mb-2">{item.title}</h1>
							<h3 className="text-lg font-semibold mb-2">
								{item.suborgan.name}
							</h3>
						</div>
						<div className="flex flex-col">
							<span>
								{new Date(item.openedAt).toLocaleString("id-ID", {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
								})}{" "}
								-{" "}
								{new Date(item.closedAt).toLocaleString("id-ID", {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
								})}
							</span>
							<Link
								href={`/admin/addvoting/${item.id}`}
								className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
							>
								Edit Sesi
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
