"use client";

import React from "react";
import { H1, Medium_Text, Large_Text } from "@/app/components/general/Text";
import Image from "next/image";
import { suborgan } from "@/types/suborgan";
interface SubOrganizationPageProps {
	subOrganizations: suborgan[];
}

export default function SubOrganizationPage({
	subOrganizations,
}: SubOrganizationPageProps) {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8 mt-20 mb-20">
			<H1 className="text-center mb-2">Pilih Sub-Organisasi Yang Kamu Ikuti</H1>
			<Medium_Text variant="REGULAR" className="text-center mb-8">
				Pemilihan ini sangat berdampak besar untuk masa depan dari
				sub-organisasi yang ada di SMK Telkom Malang. Ayo gunakan hak suara
				kalian!
			</Medium_Text>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{subOrganizations.map((org) => (
					<div
						key={org.id}
						className={`bg-white rounded-lg p-4 shadow-md transition-all flex items-center ${
							org.status === "Buka"
								? "cursor-pointer hover:shadow-lg"
								: "opacity-60"
						}`}
					>
						<div className="flex-shrink-0 mr-4">
							{/* <Image
								src={org.logo}
								alt={`Logo ${org.name}`}
								width={40}
								height={40}
							/> */}
						</div>
						<div className="flex-grow">
							<Large_Text variant="BOLD" className="mb-1">
								{org.name}
							</Large_Text>
							<Medium_Text
								variant="REGULAR"
								className={`${
									org.status === "Buka" ? "text-green-600" : "text-gray-500"
								}`}
							>
								{org.status}
							</Medium_Text>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
