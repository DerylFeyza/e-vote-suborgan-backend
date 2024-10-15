"use client";
import {
	TextField,
	SelectField,
	FormButton,
} from "@/app/components/general/Input";
import { suborganName } from "@/types/suborgan";
import { FormEvent, useState } from "react";
import {
	handleCreateVoteSession,
	handleUpdateVoteSession,
} from "@/utils/actions/vote";
import { Vote_Session } from "@prisma/client";
import { formatDate } from "@/lib/formatDate";
import toast from "react-hot-toast";

export default function AddVoteForm({
	suborgan,
	updateData,
	status,
}: {
	suborgan: suborganName[];
	updateData?: Vote_Session;
	status?: string;
}) {
	const [selectedSuborgan, setSelectedSuborgan] = useState<string>(
		updateData?.suborgan_id || ""
	);
	const [openedAt, setOpenedAt] = useState<string>(
		formatDate(updateData?.openedAt)
	);
	const [closedAt, setClosedAt] = useState<string>(
		formatDate(updateData?.closedAt)
	);
	const [maxVote, setMaxVote] = useState<number | string>(
		updateData?.max_vote?.toString() || ""
	);
	const [isLoading, setIsLoading] = useState(false);

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSuborgan(event.target.value);
	};

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		if (new Date(closedAt) < new Date(openedAt)) {
			toast.error("Closed At must be after Opened At.");
			setIsLoading(false);
			return;
		}

		try {
			const toastId = toast.loading("Loading...");
			const formdata = new FormData(e.currentTarget);

			const isoOpenedAt = new Date(openedAt).toISOString();
			const isoClosedAt = new Date(closedAt).toISOString();

			formdata.append("suborgan_id", selectedSuborgan);
			formdata.append("openedAt", isoOpenedAt);
			formdata.append("closedAt", isoClosedAt);
			formdata.append("isPublic", "true");
			formdata.append("max_vote", maxVote.toString());
			console.log(formdata);
			let result;
			if (updateData) {
				result = await handleUpdateVoteSession(updateData.id, formdata);
			} else {
				result = await handleCreateVoteSession(formdata);
			}

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

	const today = new Date().toISOString().slice(0, 16);

	return (
		<div>
			{status === "ongoing" && (
				<p className="text-red-600 font-semibold mb-4">
					Tidak bisa mengedit voting session yang sedang dalam progress
				</p>
			)}
			<h1 className="text-sm font-semibold">
				Pastikan data kandidat sudah benar sebelum voting dibuat*
			</h1>
			<form onSubmit={handleSubmitForm}>
				<TextField
					label="Judul Voting"
					placeholder="Masukkan Title Voting"
					type="title"
					value={updateData?.title}
					name="title"
					required
					disabled={status === "ongoing"}
				/>
				<SelectField
					name="suborgan"
					label="Pilih Suborgan"
					value={selectedSuborgan}
					options={suborgan.map((x) => ({
						label: x.name,
						value: x.id,
					}))}
					required
					handleChange={handleSelectChange}
					disabled={!!updateData || status === "ongoing"}
				/>
				<div className="flex flex-col gap-2 my-6">
					<label
						htmlFor="openedAt"
						className="block text-sm font-medium text-gray-700 first-letter:capitalize"
					>
						Voting dibuka pada
					</label>
					<input
						type="datetime-local"
						id="openedAt"
						required
						value={openedAt}
						onChange={(e) => setOpenedAt(e.target.value)}
						className="w-full rounded-full bg-white border border-stroke shadow-shadow-2 placeholder:text-secondary-text-color text-primary-text-color focus:ring-2 focus:ring-red-light-2 outline-none px-6 py-3"
						min={today}
						disabled={status === "ongoing"}
					/>
				</div>
				<div className="flex flex-col gap-2 my-6">
					<label
						htmlFor="closedAt"
						className="block text-sm font-medium text-gray-700 first-letter:capitalize"
					>
						Voting ditutup pada
					</label>
					<input
						type="datetime-local"
						id="closedAt"
						required
						value={closedAt}
						onChange={(e) => setClosedAt(e.target.value)}
						className="w-full rounded-full bg-white border border-stroke shadow-shadow-2 placeholder:text-secondary-text-color text-primary-text-color focus:ring-2 focus:ring-red-light-2 outline-none px-6 py-3"
						min={openedAt || today}
						disabled={status === "ongoing"}
					/>
				</div>
				<div className="flex flex-col gap-2 my-6">
					<label
						htmlFor="max_vote"
						className="block text-sm font-medium text-gray-700 first-letter:capitalize"
					>
						Maksimum jumlah vote
					</label>
					<input
						type="number"
						id="max_vote"
						value={maxVote}
						onChange={(e) => setMaxVote(e.target.value)}
						required
						className="w-full rounded-full bg-white border border-stroke shadow-shadow-2 placeholder:text-secondary-text-color text-primary-text-color focus:ring-2 focus:ring-red-light-2 outline-none px-6 py-3"
						disabled={status === "ongoing"}
					/>
				</div>
				<FormButton type="submit" variant="PRIMARY" className="w-full mb-4">
					{isLoading ? (
						<div className="flex items-center gap-x-3 justify-center">
							<svg
								aria-hidden="true"
								className="inline w-5 h-5 animate-spin text-red-500 fill-white"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
							<p>Loading...</p>
						</div>
					) : (
						"Submit"
					)}
				</FormButton>
			</form>
		</div>
	);
}
