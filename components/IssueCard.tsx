import { FC } from "react";
import { Prisma } from "@prisma/client";
import Card from "./Card";

const issueWithProject = Prisma.validator<Prisma.IssueArgs>()({
  include: { project: true },
});

type IssueWithProject = Prisma.IssueGetPayload<typeof issueWithProject>;

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-red-500";
    case "IN_PROGRESS":
      return "bg-yellow-500";
    case "CLOSED":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const IssueCard: FC<{ issue: IssueWithProject }> = ({ issue }) => {
  return (
    <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div className="mb-2">
        <span className="text-sm text-gray-300">Issue ID: {issue.id}</span>
      </div>
      <div className="flex items-center mb-4">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(
            issue.status
          )}`}
        ></div>
        <span className="text-xl text-gray-600">{issue.name}</span>
      </div>
      <div className="mb-4">
        <span className="text-gray-400">{issue.description}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-gray-400">Severity: {issue.severity}</span>
        <span className="text-gray-400">Owner ID: {issue.ownerId}</span>
      </div>
      <div>
        <span className="text-sm text-gray-300">
          Project ID: {issue.projectId}
        </span>
      </div>
    </Card>
  );
};

export default IssueCard;
