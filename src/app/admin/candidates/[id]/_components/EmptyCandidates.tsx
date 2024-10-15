import React from "react";
import Image from "next/image";

import TandaTanya from "@public/images/TandaTanyaIcon.png";
import { H1, Large_Text } from "@/app/components/general/Text";

export default function EmptyCandidates() {
	return (
		<div className="bg-red-light-6 w-full h-full max-h-screen">
			<div className="flex items-center justify-center pt-[200px] pb-[173px]">
				<div className="bg-white w-[1050px] h-[492px] rounded-[15px] flex items-center text-center shadow-md flex-col">
					<Image
						src={TandaTanya}
						alt="gambar not found"
						width={314}
						height={314}
						className="w-[314px] h-[314px] object-cover -translate-y-1/2"
					/>
					<div className="w-full mx-[85px] -translate-y-1/2">
						<H1>Oops.. Disini Masih Belum Ada Kandidat</H1>
						<Large_Text
							variant="REGULAR"
							className="text-secondary-text-color mt-[18px]"
						>
							Klik Tambah Kandidat untuk menambahkan kandidat baru..
						</Large_Text>
					</div>
				</div>
			</div>
		</div>
	);
}
