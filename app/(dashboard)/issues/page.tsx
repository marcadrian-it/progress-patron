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

  return { issues };
};

export default async function IssuesPage() {
  const { issues } = await getData();
  return (
    <div className="h-full overflow-y-auto w-full px-8">
      <IssuesList issues={issues} />
    </div>
  );
}
