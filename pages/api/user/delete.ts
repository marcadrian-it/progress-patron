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

    /* @ts-ignore */
    const user = await db.user.findUnique({
      where: {
        id: req.body.id,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await comparePasswords(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    await db.user.delete({
      where: {
        id: req.body.id,
      },
    });

    res.json({
      data: { message: "User deleted successfully" },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
}
