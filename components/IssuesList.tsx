import { FC, Suspense } from "react";
import IssueCard from "./IssueCard";
import IssueCardShimmer from "./IssueCardShimmer";
import { Prisma } from "@prisma/client";

const issueWithProjectAndUsername = Prisma.validator<Prisma.IssueArgs>()({
  include: {
    project: true,
    owner: {
      select: {
        firstName: true,
      },
    },
  },
});

type issueWithProjectAndUsername = Prisma.IssueGetPayload<
  typeof issueWithProjectAndUsername
>;

const IssuesList: FC<{ issues: issueWithProjectAndUsername[] }> = ({
  issues,
}) => {
  const openIssues = issues.filter((issue) => issue.status === "OPEN");
  const inProgressIssues = issues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  );
  const closedIssues = issues.filter((issue) => issue.status === "CLOSED");

  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <h2 className="sticky top-0 rounded-3xl bg-blue-500 z-10 text-2xl text-center font-bold mb-4 -mx-3">
          Open
        </h2>
        <div className="space-y-4">
          <Suspense fallback={<IssueCardShimmer />}>
            {openIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </Suspense>
        </div>
      </div>
      <div>
        <h2 className="sticky top-0 rounded-3xl bg-yellow-500 z-10 text-2xl text-center font-bold mb-4 -mx-3">
          In Progress
        </h2>
        <div className="space-y-4">
          <Suspense fallback={<IssueCardShimmer />}>
            {inProgressIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </Suspense>
        </div>
      </div>
      <div>
        <h2 className="sticky top-0 rounded-3xl bg-green-500 z-10 text-2xl text-center font-bold mb-4 -mx-3">
          Closed
        </h2>
        <div className="space-y-4">
          <Suspense fallback={<IssueCardShimmer />}>
            {closedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default IssuesList;
