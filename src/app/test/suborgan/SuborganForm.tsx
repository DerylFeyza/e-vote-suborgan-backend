// components/SuborganForm.tsx
"use client";

import { useState } from "react";

interface SuborganFormProps {
	onSubmit: (formData: FormData) => Promise<void>;
	initialData?: {
		name: string;
		logo: string;
	};
}

export default function SuborganForm({
	onSubmit,
	initialData,
}: SuborganFormProps) {
	const [name, setName] = useState(initialData?.name || "");
	const [logo, setLogo] = useState(initialData?.logo || "");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("logo", logo);

		await onSubmit(formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
		>
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
					htmlFor="logo"
					className="block text-sm font-medium text-gray-700"
				>
					Logo URL
				</label>
				<input
					type="text"
					id="logo"
					value={logo}
					onChange={(e) => setLogo(e.target.value)}
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
