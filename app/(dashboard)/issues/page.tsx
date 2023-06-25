import AddIssuesBar from "@/components/AddIssuesBar";
import IssuesList from "@/components/IssuesList";
import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { cookies } from "next/headers";

const getData = async () => {
  const user = await getUserFromCookie(cookies() as any);

  const issues = await db.issue.findMany({
    where: {
      ownerId: user?.id,
      deleted: false,
      project: {
        deleted: false,
      },
    },
    include: {
      project: true,
    },
  });

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
      deleted: false,
    },
  });

  return { issues, projects };
};

export default async function IssuesPage() {
  const { issues, projects } = await getData();
  return (
    <div className="h-full overflow-y-auto w-full px-8">
      <AddIssuesBar projects={projects} />
      <IssuesList issues={issues} />
    </div>
  );
}
