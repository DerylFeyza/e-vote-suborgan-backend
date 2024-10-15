"use server";
import { revalidatePath } from "next/cache";
import {
	createCandidate,
	updateCandidate,
	deleteCandidate,
	findCandidate,
} from "../database/candidates.query";
import { createVoteSessionCandidate } from "../database/vote.query";
import { findVoteSession } from "../database/vote.query";
import { imageUploader, handleImageDelete } from "./fileUploader";

interface vote_session_candidate {
	candidate: {
		connect: {
			id: string;
		};
	};
	number: number;
	vote_session?: {
		connect: {
			id: string;
		};
	};
}

export const handleCreateCandidate = async (
	suborgan_id: string,
	formData: FormData,
	vote_session?: string
) => {
	const candidateData = {
		img: "",
		name: formData.get("name") as string,
		kelas: formData.get("kelas") as string,
		visi: formData.get("visi") as string,
		misi: formData.get("misi") as string,
		motto: formData.get("motto") as string,
		progja: formData.get("progja") as string,
		video_profil: formData.get("video_profil") as string,
		suborgan: {
			connect: { id: suborgan_id },
		},
	};

	try {
		const gambar = formData.get("gambar") as File;
		if (!gambar) {
			return {
				success: false,
				message: "Gambar tidak boleh kosong",
			};
		}

		const urlGambar = await imageUploader(gambar);
		console.log(urlGambar);
		if (!urlGambar.success) {
			return { success: false, message: urlGambar.message };
		}

		if (urlGambar.data?.url) {
			candidateData.img = urlGambar.data.url;
		}
		const response = await createCandidate(candidateData);
		if (response && response.id) {
			const voteSessionCandidateData: vote_session_candidate = {
				candidate: {
					connect: { id: response.id },
				},
				number: Number(formData.get("nomor") as string),
			};
			if (vote_session) {
				voteSessionCandidateData.vote_session = {
					connect: { id: vote_session },
				};
			}
			await createVoteSessionCandidate(voteSessionCandidateData);
		}

		revalidatePath("/", "layout");
		return { success: true, message: "Kandidat berhasil ditambahkan" };
	} catch (error) {
		console.error("Error creating candidate or vote session candidate:", error);
		return { success: false, message: "Gagal menahbahkan kandidat" };
	}
};

export const handleUpdateCandidate = async (id: string, formData: FormData) => {
	const candidateData = {
		img: formData.get("img") as string,
		name: formData.get("name") as string,
		kelas: formData.get("kelas") as string,
		visi: formData.get("visi") as string,
		misi: formData.get("misi") as string,
		pengalaman: formData.get("pengalaman") as string,
		motto: formData.get("motto") as string,
		progja: formData.get("progja") as string,
		video_profil: formData.get("video_profil") as string,
		suborgan: {
			connect: { id: formData.get("suborgan_id") as string },
		},
	};

	await updateCandidate({ id }, candidateData);
	revalidatePath("/", "layout");
};

export const handleDeleteCandidate = async (id: string) => {
	try {
		const candidate = await findCandidate({ id });
		if (candidate) {
			const deleteResult = await handleImageDelete(candidate.img);
			if (!deleteResult.success) {
				return { success: false, message: deleteResult.message };
			}
		}

		await deleteCandidate({ id });
		revalidatePath("/", "layout");
		return { success: true, message: "Kandidat berhasil dihapus" };
	} catch (error) {
		console.error("Error creating candidate or vote session candidate:", error);
		return { success: false, message: "Gagal menghapus kandidat" };
	}
};
