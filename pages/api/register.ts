import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utilities/db";
import { createJWT, hashPassword } from "@/utilities/auth";
import { serialize } from "cookie";

export default async function register(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const user = await db.user.create({
            data: {
                email: req.body.email,
                password: await hashPassword(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            },
        });

        const jwt = await createJWT(user);
        res.setHeader(
            "Set-Cookie",
            serialize(process.env.COOKIE_NAME as string, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
            })
        );
        res.status(201);
        res.end();
    } else {
        res.status(402);
        res.end();
    }
}
