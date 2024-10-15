"use client";

import React from "react";
import { H1, Medium_Text, Large_Text } from "@/app/components/general/Text";
import Image from "next/image";
import { suborgan } from "@/types/suborgan";
import Link from "next/link";

interface SubOrganizationPageProps {
	subOrganizations: suborgan[];
}

export default function SubOrganizationPage({
	subOrganizations,
}: SubOrganizationPageProps) {
	console.log(subOrganizations);
	return (
		<div className="max-w-4xl mx-auto px-4 py-8 mt-20 mb-20">
			<H1 className="text-center mb-2">Pilih Sub-Organisasi Yang Kamu Ikuti</H1>
			<Medium_Text variant="REGULAR" className="text-center mb-8">
				Pemilihan ini sangat berdampak besar untuk masa depan dari
				sub-organisasi yang ada di SMK Telkom Malang. Ayo gunakan hak suara
				kalian!
			</Medium_Text>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{subOrganizations.map((org) => {
					const isBuka = org.status === "Buka";
					const content = (
						<div
							key={org.id}
							className={`bg-white rounded-lg p-4 shadow-md transition-all flex items-center ${
								isBuka ? "cursor-pointer hover:shadow-lg" : "opacity-60"
							}`}
						>
							<div className="flex-shrink-0 mr-4">
								{/* Uncomment this when the logo is available */}
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
									className={`${isBuka ? "text-green-600" : "text-gray-500"}`}
								>
									{org.status}
								</Medium_Text>
							</div>
						</div>
					);

					return isBuka ? (
						<Link key={org.id} href={`/vote/${org.id}`}>
							{content}
						</Link>
					) : (
						content
					);
				})}
			</div>
		</div>
	);
}
