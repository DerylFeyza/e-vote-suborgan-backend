"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { H2, Large_Text } from "@/app/components/general/Text";
import { FormButton } from "@/app/components/general/button";
import Navbar from "../components/general/Navbar";

export default function LoginPage() {
	const { status } = useSession();

	if (status === "authenticated") return redirect("/");

	return (
		<main className="min-h-screen flex flex-col">
			<Navbar />
			<div className="flex-grow flex items-center justify-center px-4 lg:px-20">
				<div className="bg-white max-w-[624px] w-full py-[72px] md:py-[92px] px-[24px] md:px-[88px] flex flex-col items-center mx-auto shadow-shadow-2 rounded-lg">
					<H2 className="text-center text-primary-text-color">
						Yuk Login untuk Memulai Vote
					</H2>
					<Large_Text
						variant="REGULAR"
						className="text-secondary-text-color text-center mt-2 mb-8"
					>
						Jangan lupa login menggunakan akun google yang diberikan oleh
						sekolah ya teman-teman.
					</Large_Text>
					<FormButton
						onClick={() =>
							signIn("google", { callbackUrl: "/suborgan", redirect: false })
						}
						variant="PRIMARY"
						className="flex items-center gap-x-4 w-full justify-center group bg-[#C1121F] text-white py-3 rounded-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6"
						>
							<path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
						</svg>
						<Large_Text variant="BOLD">Login dengan Google</Large_Text>
					</FormButton>
				</div>
			</div>
		</main>
	);
}
