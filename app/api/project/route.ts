import { getUserByClerkID } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const user = await getUserByClerkID();
  const { name, due, description } = await request.json();

  if (due === "" || name === "") {
    return NextResponse.json({
      message: "Please select a due date and a name of your project.",
    });
  }

  const existingProject = await db.project.findUnique({
    where: {
      name_ownerId: {
        name: name,
        ownerId: user.id!,
      },
    },
  });

  if (existingProject) {
    return NextResponse.json({
      message:
        "A project with this name already exists or it was soft-deleted by you before.",
    });
  }

  await createNewProject(name, due, description, user.id!);
  return NextResponse.json({ data: { message: "ok" } });
};

export const PATCH = async (request: Request) => {
  const { id } = await request.json();
  await deleteProject(id);
  return NextResponse.json({ data: { message: "ok" } });
};

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
  await db.project.update({
    where: { id: id },
    data: { deleted: true },
  });
};
