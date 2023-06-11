import { validateJWT } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* @ts-ignore */
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  await db.task.create({
    /* @ts-ignore */
    data: {
      name: req.body.name,
      ownerId: user.id,
      projectId: req.body.projectId,
      due: req.body.due,
    },
  });

  res.json({ data: { message: "ok" } });
}
