import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
	const { nextUrl, nextauth } = req;
	if (
		nextauth.token?.role !== "admin" &&
		nextUrl.pathname.startsWith("/admin")
	) {
		return NextResponse.rewrite(new URL("/accesdenied", req.url), {
			status: 403,
		});
	}
});

export const config = {
	matcher: ["/vote/:path*", "/aftervote/:path*", "/admin/:path*"],
};
