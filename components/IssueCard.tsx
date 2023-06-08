import { FC } from "react";
import { Prisma } from "@prisma/client";
import Card from "./Card";
import { Users } from "react-feather";
import Link from "next/link";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "bg-blue-500";
    case "IN_PROGRESS":
      return "bg-yellow-500";
    case "CLOSED":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Low":
      return "bg-green-500";
    case "Medium":
      return "bg-yellow-500";
    case "High":
      return "bg-red-500";
    case "Critical":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

const IssueCard: FC<{ issue: issueWithProjectAndUsername }> = ({ issue }) => {
  return (
    <Card
      className={
        "!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200"
      }
    >
      <div className="mb-2">
        <span className="text-sm text-gray-400">Issue ID: {issue.id}</span>
      </div>
      <div className="flex items-center mb-4">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(
            issue.status
          )}`}
        ></div>
        <span className={`rounded py-1 px-2 ${getStatusColor(issue.status)}`}>
          {issue.status.replace("_", " ")}
        </span>
      </div>
      <span className="text-xl text-gray-600">{issue.name}</span>
      <div className="mb-4">
        <span className="text-gray-400">{issue.description}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span
          className={` rounded py-1 px-2 ${getSeverityColor(issue.severity)}`}
        >
          Severity: {issue.severity}
        </span>
        <span className="text-gray-400">
          {" "}
          <Users size={24} className="inline-block mr-1" />
          Assigned to: {issue.owner.firstName}
        </span>
      </div>
      <div>
        <Link href={`/project/${issue.projectId}`}>
          <span className="text-sm text-purple-500 hover:text-blue-700 hover:underline">
            Project: {issue.project.name}
          </span>
        </Link>
      </div>
    </Card>
  );
};

export default IssueCard;