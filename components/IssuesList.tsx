import { FC } from "react";
import IssueCard from "./IssueCard";

const IssuesList: FC<{ issues: IssueWithProject[] }> = ({ issues }) => {
  const openIssues = issues.filter((issue) => issue.status === "OPEN");
  const inProgressIssues = issues.filter(
    (issue) => issue.status === "IN_PROGRESS"
  );
  const closedIssues = issues.filter((issue) => issue.status === "CLOSED");

  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <h2 className="sticky top-0 rounded-3xl bg-blue-500 z-10 text-2xl text-center font-bold mb-4 ">
          Open
        </h2>
        <div className="space-y-4">
          {openIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="sticky top-0 rounded-3xl bg-yellow-500 z-10 text-2xl text-center font-bold mb-4">
          In Progress
        </h2>
        <div className="space-y-4">
          {inProgressIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="sticky top-0 rounded-3xl bg-green-500 z-10 text-2xl text-center font-bold mb-4">
          Closed
        </h2>
        <div className="space-y-4">
          {closedIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IssuesList;
