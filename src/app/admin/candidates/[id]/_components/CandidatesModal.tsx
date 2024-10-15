import React from "react";

import {
	SelectField,
	TextField,
	TextArea,
} from "@/app/components/general/Input";
import { CandidatesWithSuborgan } from "@/utils/database/candidates.query";

const CandidatesModal = ({
	candidates,
	closeModal,
}: {
	candidates?: CandidatesWithSuborgan;
	closeModal: () => void;
}) => {
	return (
		<article className="w-screen h-screen fixed top-0 left-0 z-[997] backdrop-brightness-50 flex justify-center items-center">
			<div
				onClick={closeModal}
				className="absolute z-[998] w-screen h-screen top-0 left-0"
			></div>
			<main className=" z-[999] bg-white w-[90vw] sm:w-[75vw] flex flex-col p-7 rounded-2xl">
				<form action={async (formData) => {}}>
					<article>
						<SelectField
							label="Pilih Suborgan"
							name="suborganid"
							required
							options={[
								{ value: "budowabwboadwu", label: "ambacrot" },
								{ value: "g79dawadwg97", label: "ambacrottum" },
							]}
						/>
						<TextField type="text" label="Nama" name="nama" required />
						<TextField type="text" label="Kelas" name="kelas" required />
						<TextField type="text" label="Motto" name="motto" required />
						<TextField
							type="text"
							label="Link Video"
							name="link_video"
							required
						/>
					</article>
					<article></article>
					<article></article>
				</form>
			</main>
		</article>
	);
};

export default CandidatesModal;
