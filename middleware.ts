import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt: string) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload;
};

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        pathname.startsWith("/signin") ||
        pathname.startsWith("/register") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

    if (pathname === "/") {
        if (jwt) {
            try {
                await verifyJWT(jwt.value);
                req.nextUrl.pathname = "/home";
                return NextResponse.redirect(req.nextUrl);
            } catch (e) {
                console.error(e);
            }
        }
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }

    if (!jwt) {
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }

    try {
        await verifyJWT(jwt.value);
        return NextResponse.next();
    } catch (e) {
        console.error(e);
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }
}
