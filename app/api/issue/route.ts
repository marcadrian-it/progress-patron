import { getUserByClerkID } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { NextResponse } from "next/server";
import { ISSUE_SEVERITY, ISSUE_STATUS } from "@prisma/client";

export const PUT = async (request: Request) => {
  const user = await getUserByClerkID();
  const { id, status, severity } = await request.json();

  if (typeof id !== "string") {
    return NextResponse.json({ message: "Invalid issue ID" });
  }

  if (status) {
    await updateIssueStatus(id, status);
    return NextResponse.json({ message: "Issue status updated" });
  } else if (severity) {
    await updateIssueSeverity(id, severity);
    return NextResponse.json({ message: "Issue severity updated" });
  }
};

export const POST = async (request: Request) => {
  const user = await getUserByClerkID();
  const { name, description, severity, projectId } = await request.json();

  await createNewIssue(name, description, severity, projectId, user);
  return NextResponse.json({ data: { message: "ok" } });
};

export const PATCH = async (request: Request) => {
  const { id } = await request.json();

  if (typeof id !== "string") {
    return NextResponse.json({ message: "Invalid issue ID" });
  }

  await deleteIssue(id);
  return NextResponse.json({ data: { message: "ok" } });
};

const deleteIssue = async (id: string) => {
  await db.issue.update({
    where: { id: id },
    data: { deleted: true },
  });
};

const updateIssueStatus = async (id: string, status: ISSUE_STATUS) => {
  await db.issue.update({
    where: { id: id },
    data: { status },
  });
};

const updateIssueSeverity = async (id: string, severity: ISSUE_SEVERITY) => {
  await db.issue.update({
    where: { id: id },
    data: { severity },
  });
};

const createNewIssue = async (
  name: string,
  description: string,
  severity: ISSUE_SEVERITY,
  projectId: number,
  user: any
) => {
  await db.issue.create({
    data: {
      name: name,
      ownerId: user.id,
      description: description,
      severity: severity,
      projectId: projectId,
    },
  });
};
