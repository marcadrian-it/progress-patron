import { db } from "@/utilities/db";
import { NextResponse } from "next/server";
import { TASK_STATUS } from "@prisma/client";
import { getUserByClerkID } from "@/utilities/auth";

export const POST = async (request: Request) => {
  const user = await getUserByClerkID();
  const { name, projectId, due, description } = await request.json();

  if (due === "" || name === "") {
    return NextResponse.json({
      message: "Please select a due date and a name of your task.",
    });
  }

  await createNewTask(name, projectId, due, description, user);
  return NextResponse.json({ data: { message: "ok" } });
};

export const PUT = async (request: Request) => {
  const { id, status } = await request.json();
  await updateTaskStatus(id, status);
  return NextResponse.json({ data: { message: "ok" } });
};

export const PATCH = async (request: Request) => {
  const { id } = await request.json();
  await deleteTask(id);
  return NextResponse.json({ data: { message: "ok" } });
};

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
