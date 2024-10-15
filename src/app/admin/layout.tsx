import { Metadata } from "next";
import Sidebar from "@/app/components/general/Sidebar";
import AdminHeaders from "./_components/AdminHeaders";
import { getAllSuborganName } from "@/utils/database/suborgan.query";
export const metadata: Metadata = {
	title: "Admin | E-Vote Sub Organisasi Moklet",
	description: "Admin | E-Vote Sub Organisasi SMK Telkom Malang",
};

type suborganName = {
	id: string;
	name: string;
};
export default async function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const suborgan: suborganName[] = await getAllSuborganName();
	return (
		<main className="bg-red-light-6">
			<div className="lg:ml-80">
				<Sidebar suborgan={suborgan} />
				<div className="px-[28px]">
					<div className="max-w-full w-full">
						<AdminHeaders />
						{children}
					</div>
				</div>
			</div>
		</main>
	);
}
