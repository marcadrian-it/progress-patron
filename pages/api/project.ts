import { validateJWT } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* @ts-ignore */
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  if (req.method === "POST") {
    await createNewProject(req.body.name, req.body.due, user.id!);
    res.json({ data: { message: "ok" } });
  } 
  else if (req.method === "PATCH") {
    await deleteProject(req.body.id);
    res.json({ data: { message: "ok" } });
    }
  else {
    res.status(405).json({ error: { message: "Method Not Allowed" } });
  }
}


const createNewProject = async (name: string, due: Date, id: number ) => {
  await db.project.create({
    data: {
      name: name,
      due: due,
      ownerId: id,
    },
  });
};

const deleteProject = async (id: number) => {
  await db.project.update({
    where: { id: id },
    data: {deleted: true}
  });
}
