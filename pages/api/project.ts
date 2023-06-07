import { validateJWT } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* @ts-ignore */
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  await db.project.create({
    /* @ts-ignore */
    data: {
      name: req.body.name,
      due: req.body.due,
      ownerId: user.id,
    },
  });

  res.json({ data: { message: "ok" } });
}
