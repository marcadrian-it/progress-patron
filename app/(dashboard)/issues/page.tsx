import IssueCard from "@/components/IssueCard";
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
    <div className="h-full overflow-y-auto  w-full">
      <div className=" h-full items-stretch justify-center min-h-[content] p-6 pt-0">
        {issues.map((issue) => (
          <div className="w-1/3 p-3" key={issue.id}>
            <IssueCard issue={issue} />
          </div>
        ))}
      </div>
    </div>
  );
}
