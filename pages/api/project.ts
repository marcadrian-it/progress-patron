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
    if (req.body.due === "" || req.body.name === "") {
      res.status(400).json({
        message: "Please select a due date and a name of your project.",
      });
      return;
    }
    const existingProject = await db.project.findUnique({
      where: {
        name_ownerId: {
          name: req.body.name,
          ownerId: user.id!,
        },
      },
    });

    if (existingProject) {
      res.status(400).json({
        message:
          "A project with this name already exists or it was soft-deleted by you before.",
      });
      return;
    }
    await createNewProject(
      req.body.name,
      req.body.due,
      req.body.description,
      user.id!
    );
    res.json({ data: { message: "ok" } });
  } else if (req.method === "PATCH") {
    await deleteProject(req.body.id);
    res.json({ data: { message: "ok" } });
  } else {
    res.status(405).json({ error: { message: "Method Not Allowed" } });
  }
}

const createNewProject = async (
  name: string,
  due: Date,
  description: string,
  id: number
) => {
  await db.project.create({
    data: {
      name: name,
      due: due,
      description: description,
      ownerId: id,
    },
  });
};

const deleteProject = async (id: number) => {
  await db.task.updateMany({
    where: {
      projectId: id,
    },
    data: {
      deleted: true,
    },
  });
  await db.project.update({
    where: { id: id },
    data: { deleted: true },
  });
};
