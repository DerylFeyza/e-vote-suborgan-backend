import { FormEvent, useState } from "react";
import { H4 } from "@/app/components/general/Text";
import {
	SelectField,
	TextField,
	TextArea,
} from "@/app/components/general/Input";
import { CandidatesWithSuborgan } from "@/utils/database/candidates.query";
import Image from "next/image";
import toast from "react-hot-toast";
import { Suborgan } from "@prisma/client";
import { handleCreateCandidate } from "@/utils/actions/candidates";
import { CandidateWithPengalaman } from "@/types/entityRelations";
interface initialData {
	id: string;
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
}

const CandidatesModal = ({
	candidates,
	closeModal,
	suborgan,
	initialData,
	vote_session,
}: {
	candidates?: CandidateWithPengalaman[];
	closeModal: () => void;
	suborgan: Suborgan;
	initialData?: initialData;
	vote_session: any;
}) => {
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [name, setName] = useState(initialData?.name || "");
	const [nomor, setNomor] = useState("");
	const [kelas, setKelas] = useState(initialData?.kelas || "");
	const [visi, setVisi] = useState(initialData?.visi || "");
	const [misi, setMisi] = useState(initialData?.misi || "");
	const [motto, setMotto] = useState(initialData?.motto || "");
	const [progja, setProgja] = useState(initialData?.progja || "");
	const [videoProfil, setVideoProfil] = useState(
		initialData?.video_profil || ""
	);
	const [pengalaman, setPengalaman] = useState(initialData?.pengalaman || "");
	const [isLoading, setIsLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setFile(null);
			setImagePreview(null);
		}
	};

	const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const toastId = toast.loading("Loading...");
			const formData = new FormData(e.currentTarget);
			formData.append("name", name);
			formData.append("kelas", kelas);
			formData.append("visi", visi);
			formData.append("misi", misi);
			formData.append("motto", motto);
			formData.append("pengalaman", pengalaman);
			formData.append("progja", progja);
			formData.append("video_profil", videoProfil);
			formData.append("nomor", nomor);
			if (file) {
				formData.append("gambar", file); // Append the image file
			}

			let result;
			if (initialData) {
				// result = await handleUpdateVoteSession(initialData.id, formData);
			} else {
				result = await handleCreateCandidate(
					suborgan.id,
					formData,
					vote_session?.id
				);
			}

			if (result.success) {
				toast.success(result.message, { id: toastId });
				closeModal(); // Close modal on success
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

	const handleRemoveImage = () => {
		setFile(null);
		setImagePreview(null);
	};

	return (
		<article className="w-screen h-screen fixed top-0 left-0 z-[997] backdrop-brightness-50 flex justify-center items-center">
			<div
				onClick={closeModal}
				className="absolute z-[998] w-screen h-screen top-0 left-0"
			></div>
			<main className="z-[999] bg-white w-[90vw] sm:w-[75vw] flex flex-col p-7 rounded-2xl ">
				<H4>Form Tambah Kandidat {suborgan.name}</H4>
				<form
					onSubmit={handleSubmitForm}
					className="max-h-[80vh] overflow-y-auto flex flex-wrap justify-between"
				>
					<div>
						<div className="space-y-1">
							<div className="flex items-center mt-4">
								<label
									htmlFor="gambar"
									className="cursor-pointer px-4 py-2 rounded-md button-transition"
								>
									Browse
								</label>
								<input
									type="file"
									id="gambar"
									accept="image/*"
									onChange={handleImageChange}
									className="hidden"
								/>
								<span className="ml-3 text-sm text-gray-500">
									{imagePreview ? "Image selected" : "No file chosen"}
								</span>
							</div>
						</div>

						{imagePreview && (
							<div className="mt-4 border-2 rounded-md ">
								<div className="overflow-hidden">
									<div className="relative w-100 h-100">
										<Image
											src={imagePreview}
											width={400}
											height={400}
											alt="Preview"
											className="w-full h-80 object-cover"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2">
									<button
										type="button"
										className="text-red-500 font-bold p-4 rounded-full bg-white"
										onClick={handleRemoveImage}
									>
										Remove Image
									</button>
									<button
										type="button"
										className="text-black-500 font-bold p-4 rounded-full bg-white"
										onClick={() => document.getElementById("gambar")?.click()}
									>
										Update Image
									</button>
								</div>
							</div>
						)}
					</div>
					<div className="min-w-96">
						<article className="space-y-4">
							<TextField
								type="text"
								label="Nama"
								name="nama"
								value={name}
								handleChange={(e) => setName(e.target.value)}
								required
							/>
							<TextField
								type="number"
								label="Nomor"
								name="nomor"
								value={nomor}
								handleChange={(e) => setNomor(e.target.value)}
								required
							/>
							<TextField
								type="text"
								label="Kelas"
								name="kelas"
								value={kelas}
								handleChange={(e) => setKelas(e.target.value)}
								required
							/>
							<TextField
								type="text"
								label="Motto"
								name="motto"
								value={motto}
								handleChange={(e) => setMotto(e.target.value)}
								required
							/>
							<TextField
								type="text"
								label="Link Video"
								name="link_video"
								value={videoProfil}
								handleChange={(e) => setVideoProfil(e.target.value)}
								required
							/>
							<TextArea
								label="Visi"
								name="visi"
								value={visi}
								handleChange={(e) => setVisi(e.target.value)}
								required
							/>
							<TextArea
								label="Misi"
								name="misi"
								value={misi}
								handleChange={(e) => setMisi(e.target.value)}
								required
							/>
							<TextArea
								label="Pengalaman"
								name="pengalaman"
								value={pengalaman}
								handleChange={(e) => setPengalaman(e.target.value)}
								required
							/>
							<TextArea
								label="Program Kerja"
								name="progja"
								value={progja}
								handleChange={(e) => setProgja(e.target.value)}
								required
							/>
						</article>

						<article className="mt-4">
							<button
								type="submit"
								className={`bg-green-500 text-white px-4 py-2 rounded ${
									isLoading ? "opacity-50 cursor-not-allowed" : ""
								}`}
								disabled={isLoading}
							>
								{isLoading ? "Loading..." : "Submit"}
							</button>
						</article>
					</div>
				</form>
			</main>
		</article>
	);
};

export default CandidatesModal;
