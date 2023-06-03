import IssuesList from "@/components/IssuesList";
import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { cookies } from "next/headers";

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);

  const issues = await db.issue.findMany({
    where: {
      ownerId: user?.id,
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
