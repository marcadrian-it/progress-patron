import { validateJWT } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TASK_STATUS } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* @ts-ignore */
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  if (req.method === "POST") {
    await createNewTask(req.body.name, req.body.projectId, req.body.due, user);
    res.json({ data: { message: "ok" } });
  } else if (req.method === "PATCH") {
    await updateTaskStatus(req.body.id, req.body.status);
    res.json({ data: { message: "ok" } });
  } else {
    res.status(405).json({ error: { message: "Method Not Allowed" } });
  }
}

export const createNewTask = async (
  name: string,
  projectId: number,
  due: Date,
  user: any
) => {
  await db.task.create({
    data: {
      name: name,
      ownerId: user.id,
      projectId: projectId,
      due: due,
    },
  });
};

export const updateTaskStatus = async (id: number, status: TASK_STATUS) => {
  await db.task.update({
    where: { id: id },
    data: { status },
  });
};
