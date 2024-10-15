// components/CandidateForm.tsx
"use client";

import { useState } from "react";

interface CandidateFormProps {
	onSubmit: (voteId: string, formData: FormData) => Promise<void>;
	initialData?: {
		img: string;
		name: string;
		kelas: string;
		visi: string;
		misi: string;
		pengalaman: string;
		motto: string;
		progja: string;
		video_profil: string;
		suborgan_id: string;
	};
	voteId?: string;
}

export default function CandidateForm({
	onSubmit,
	initialData,
	voteId,
}: CandidateFormProps) {
	const [img, setImg] = useState(initialData?.img || "");
	const [name, setName] = useState(initialData?.name || "");
	const [kelas, setKelas] = useState(initialData?.kelas || "");
	const [visi, setVisi] = useState(initialData?.visi || "");
	const [misi, setMisi] = useState(initialData?.misi || "");
	const [motto, setmotto] = useState(initialData?.motto || "");
	const [progja, setProgja] = useState(initialData?.progja || "");
	const [videoProfil, setVideoProfil] = useState(
		initialData?.video_profil || ""
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("img", img);
		formData.append("name", name);
		formData.append("kelas", kelas);
		formData.append("visi", visi);
		formData.append("misi", misi);
		formData.append("motto", motto);
		formData.append("progja", progja);
		formData.append("video_profil", videoProfil);

		await onSubmit(voteId || "", formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
		>
			<div className="mb-4">
				<label
					htmlFor="img"
					className="block text-sm font-medium text-gray-700"
				>
					Image URL
				</label>
				<input
					type="text"
					id="img"
					value={img}
					onChange={(e) => setImg(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					Name
				</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="kelas"
					className="block text-sm font-medium text-gray-700"
				>
					Kelas
				</label>
				<input
					type="text"
					id="kelas"
					value={kelas}
					onChange={(e) => setKelas(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="visi"
					className="block text-sm font-medium text-gray-700"
				>
					Visi
				</label>
				<textarea
					id="visi"
					value={visi}
					onChange={(e) => setVisi(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				></textarea>
			</div>
			<div className="mb-4">
				<label
					htmlFor="misi"
					className="block text-sm font-medium text-gray-700"
				>
					Misi
				</label>
				<textarea
					id="misi"
					value={misi}
					onChange={(e) => setMisi(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				></textarea>
			</div>
			<div className="mb-4">
				<label
					htmlFor="motto"
					className="block text-sm font-medium text-gray-700"
				>
					motto
				</label>
				<input
					type="text"
					id="motto"
					value={motto}
					onChange={(e) => setmotto(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="progja"
					className="block text-sm font-medium text-gray-700"
				>
					Progja
				</label>
				<textarea
					id="progja"
					value={progja}
					onChange={(e) => setProgja(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				></textarea>
			</div>
			<div className="mb-4">
				<label
					htmlFor="video_profil"
					className="block text-sm font-medium text-gray-700"
				>
					Video Profil URL
				</label>
				<input
					type="text"
					id="video_profil"
					value={videoProfil}
					onChange={(e) => setVideoProfil(e.target.value)}
					className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					required
				/>
			</div>

			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
			>
				Submit
			</button>
		</form>
	);
}
