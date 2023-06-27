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
    if (req.body.due === "" || req.body.name === "") {
      res.status(400).json({
        message: "Please select a due date and a name of your task.",
      });
      return;
    }
    await createNewTask(
      req.body.name,
      req.body.projectId,
      req.body.due,
      req.body.description,
      user
    );
    res.json({ data: { message: "ok" } });
  } else if (req.method === "PUT") {
    await updateTaskStatus(req.body.id, req.body.status);
    res.json({ data: { message: "ok" } });
  } else if (req.method === "PATCH") {
    await deleteTask(req.body.id);
    res.json({ data: { message: "ok" } });
  } else {
    res.status(405).json({ error: { message: "Method Not Allowed" } });
  }
}

const createNewTask = async (
  name: string,
  projectId: number,
  due: Date,
  description: string,
  user: any
) => {
  await db.task.create({
    data: {
      name: name,
      ownerId: user.id,
      projectId: projectId,
      description: description,
      due: due,
    },
  });
};

const updateTaskStatus = async (id: number, status: TASK_STATUS) => {
  await db.task.update({
    where: { id: id },
    data: { status },
  });
};

const deleteTask = async (id: number) => {
  await db.task.update({
    where: { id: id },
    data: { deleted: true },
  });
};
