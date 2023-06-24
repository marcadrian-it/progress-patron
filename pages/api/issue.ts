import { validateJWT } from "@/utilities/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utilities/db";
import { ISSUE_STATUS } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* @ts-ignore */
  await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  if (req.method === "PUT") {
    const { id, status } = req.body;
    if (typeof id !== "string") {
      res.status(400).json({ message: "Invalid issue ID" });
      return;
    }
    await updateIssueStatus(id, status);
    res.json({ message: "Issue status updated" });
  }  else if (req.method === "PATCH") {
    if (typeof req.body.id !== "string") {
      res.status(400).json({ message: "Invalid issue ID" });
      return;
    }
    await deleteIssue(req.body.id);
    res.json({ data: { message: "ok" } });
    } 
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}


const deleteIssue = async (id: string) => {
  await db.issue.update({
    where: { id: id },
    data: {deleted: true}
  });
}

const updateIssueStatus = async (id: string, status: ISSUE_STATUS) => {
  await db.issue.update({
    where: { id: id },
    data: { status },
  });
};

