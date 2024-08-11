import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function logout(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, "", {
            httpOnly: true,
            path: "/",
            maxAge: -1,
            sameSite: "lax",
        })
    );
    res.status(200);
    res.json({});
}
