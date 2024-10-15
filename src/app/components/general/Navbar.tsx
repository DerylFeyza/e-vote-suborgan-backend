"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LogoMPK from "@/../public/images/logoMPK.png";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FormButton } from "@/app/components/general/button";

interface NavbarProps {
	title: string;
	href: string;
}

export default function Navbar() {
	const { data: session } = useSession();
	const [isScrolled, setIsScrolled] = useState(false);
	const [sectionActive, setSectionActive] = useState("home");
	const [isMounted, setIsMounted] = useState(false);
	const [modal, setModal] = useState(false);

	const handleClick = () => {
		setModal(!modal);
	};

	const handleScroll = () => {
		const sections: NodeListOf<HTMLElement> =
			document.querySelectorAll("section[id]");

		sections.forEach((section) => {
			const sectionHeight = section.offsetHeight;
			const sectionTop = section.offsetTop - 50;

			if (
				window.scrollY > sectionTop &&
				window.scrollY <= sectionTop + sectionHeight
			) {
				setSectionActive(section.getAttribute("id")!);
			}
		});

		if (window.scrollY > 100) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		setIsMounted(true);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!isMounted) {
		return null;
	}

	const link: NavbarProps[] = [
		{ title: "Beranda", href: "/#" },
		{ title: "Panduan", href: "/#panduan" },
		{ title: "Prosedur", href: "/#prosedur" },
		{ title: "Galeri", href: "/#galeri" },
		{ title: "Video", href: "/#video" },
		session && session?.user?.role === "admin"
			? {
					title: "Admin Panel",
					href: "/admin",
			  }
			: {
					title: "Vote",
					href: "/suborgan",
			  },
		{ title: "Pengembang", href: "/pengembang" },
	];

	return (
		<main className={`relative w-full h-auto lg:h-[60px] flex flex-col z-40`}>
			<div>
				<nav
					data-aos="fade-down"
					data-aos-delay="500"
					data-aos-duration="500"
					className={`fixed transition-transform bg-white duration-500 ${
						isScrolled
							? "top-8 w-[90%] 2xl:max-w-[1440px] xl:max-w-[1322px] lg:max-w-[1024px] sm:max-w-[480px] rounded-[64px] shadow-shadow-2 items-center py-4 px-8 right-10 left-10 place-self-center "
							: "max-w-full top-0 py-4 px-8 w-full left-10 right-10 place-self-center"
					}`}
					style={{ transition: "all 0.8s ease-in-out" }}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-7">
							<div className="block xl:hidden 2xl:hidden">
								<button onClick={handleClick} title="Hamburger">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="vuesax/linear/menu">
											<g id="menu">
												<path
													id="Vector"
													d="M3 7H21"
													stroke="#111928"
													strokeWidth="1.2"
													strokeLinecap="round"
												/>
												<path
													id="Vector_2"
													d="M3 12H21"
													stroke="#111928"
													strokeWidth="1.2"
													strokeLinecap="round"
												/>
												<path
													id="Vector_3"
													d="M3 17H21"
													stroke="#111928"
													strokeWidth="1.2"
													strokeLinecap="round"
												/>
											</g>
										</g>
									</svg>
								</button>
							</div>
							{modal && (
								<div className="fixed left-0 bg-white p-6 rounded-[48px] top-28 -z-10 flex flex-col gap-[18px] shadow-shadow-2 xl:hidden ">
									<ul className="flex flex-col gap-[18px]">
										{link.map((item, index) => (
											<li
												key={index}
												className="hover:bg-primary-color hover:text-white text-center rounded-full ease-in-out duration-500 block p-2"
											>
												<Link href={item.href}>{item.title}</Link>
											</li>
										))}
									</ul>
								</div>
							)}
							<Link href="/">
								<Image
									src={LogoMPK}
									alt="LogoMPK"
									className="lg:size-[60px] size-[40px]"
								/>
							</Link>
						</div>
						<ul className="flex gap-[36px] items-center">
							{link.map((item, index) => (
								<li
									key={index}
									className="hover:text-primary-color ease-in-out duration-500 hidden xl:block"
								>
									<Link href={item.href}>{item.title}</Link>
								</li>
							))}
							{session ? (
								<FormButton
									onClick={() =>
										signOut({ callbackUrl: "/login", redirect: true })
									}
									variant="PRIMARY"
								>
									Log out
								</FormButton>
							) : (
								<li className="hidden xl:block">
									<Link
										href="/login"
										className="bg-primary-color text-white px-7 py-3 rounded-full hover:bg-primary-color-dark transition duration-300 ease-in-out"
									>
										Log In
									</Link>
								</li>
							)}
						</ul>
					</div>
				</nav>
			</div>
		</main>
	);
}
