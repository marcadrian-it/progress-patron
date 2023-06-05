import { validateJWT } from "@/utilities/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utilities/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* @ts-ignore */
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  if (req.method === "PUT") {
    const { id, status } = req.body;

    if (typeof id !== "string") {
      res.status(400).json({ message: "Invalid issue ID" });
      return;
    }

    await db.issue.update({
      where: { id: id },
      data: { status },
    });

    res.json({ message: "Issue status updated" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
