import { redirect } from "next/navigation";
import { nextGetServerSession } from "@/lib/next-auth";
export default async function Page() {
	const session = await nextGetServerSession();
	if (session?.user?.role == "admin") {
		redirect("/admin/dashboard");
	} else {
		redirect("/auth/login");
	}
	return null;
}
