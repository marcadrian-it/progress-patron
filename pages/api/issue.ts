import { validateJWT } from "@/utilities/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utilities/db";
import { ISSUE_SEVERITY, ISSUE_STATUS } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* @ts-ignore */
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  if (req.method === "PUT") {
    const { id, status } = req.body;
    if (typeof id !== "string") {
      res.status(400).json({ message: "Invalid issue ID" });
      return;
    }
    await updateIssueStatus(id, status);
    res.json({ message: "Issue status updated" });
  } else if (req.method === "POST") {
    await createNewIssue(
      req.body.name,
      req.body.description,
      req.body.severity,
      req.body.projectId,
      user
    );
    res.json({ data: { message: "ok" } });
  } else if (req.method === "PATCH") {
    if (typeof req.body.id !== "string") {
      res.status(400).json({ message: "Invalid issue ID" });
      return;
    }
    await deleteIssue(req.body.id);
    res.json({ data: { message: "ok" } });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

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
