import { comparePasswords } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "DELETE") {
            res.status(405).json({ error: "Method not allowed" });
            return;
        }

        const user = await db.user.findUnique({
            where: {
                id: Number(req.query.id),
            },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const isPasswordValid = await comparePasswords(
            req.query.password as string,
            user.password
        );
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        await db.user.delete({
            where: {
                id: user.id,
            },
        });

        res.json({
            data: { message: "User deleted successfully" },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An error occurred while deleting the user",
        });
    }
}
