import { validateJWT } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* @ts-ignore */
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  console.log(req.body, "hello body");
  console.log(
    user.id,
    req.body.name,
    req.body.projectId,
    "hello userid reqbodyname reqbodyprojectid"
  );
  await db.task.create({
    /* @ts-ignore */
    data: {
      name: req.body.name,
      ownerId: user.id,
      projectId: req.body.projectId,
    },
  });

  res.json({ data: { message: "ok" } });
}
