/* eslint-disable no-redeclare */
"use client";
import { FC, useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import Card from "./Card";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import SeverityButtons from "./SeverityButtons";
import Spinner from "./Spinner";

const issueWithProject = Prisma.validator<Prisma.IssueArgs>()({
    include: {
        project: true,
    },
});

type issueWithProject = Prisma.IssueGetPayload<typeof issueWithProject>;

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

const IssueCard: FC<{
    issue: issueWithProject;
    isDragging: boolean;
}> = ({ issue, isDragging }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setIsDeleting(false);
    }, [issue]);

    return (
        <div className="my-2">
            <Card
                className={`!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200 ${
                    isDragging ? "pointer-events-none" : ""
                }`}
            >
                {isDeleting ? (
                    <div
                        className="flex justify-center items-center"
                        style={{
                            minHeight: "220px",
                        }}
                    >
                        <Spinner className="border-purple-500 w-[52px] h-[52px]" />
                    </div>
                ) : (
                    <>
                        <div className="mb-2">
                            <span className="text-sm text-gray-400">
                                Issue ID: {issue.id}
                            </span>
                            <DeleteButton
                                variant="issue"
                                id={issue.id}
                                setIsDeleting={setIsDeleting}
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <div
                                className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(
                                    issue.status
                                )}`}
                            ></div>
                            <span
                                className={`rounded py-1 px-2 font-semibold ${getStatusColor(
                                    issue.status
                                )}`}
                            >
                                {issue.status.replace("_", " ")}
                            </span>
                        </div>
                        <span
                            className="text-xl font-bold text-gray-600 overflow-hidden whitespace-nowrap"
                            style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                            }}
                        >
                            {issue.name}
                        </span>
                        <div
                            style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                            }}
                            className="mb-4 overflow-hidden"
                        >
                            <span className="text-gray-400">
                                {issue.description}
                            </span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <SeverityButtons
                                severity={issue.severity}
                                issueId={issue.id}
                            />
                        </div>
                        <div
                            style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                            }}
                            className="overflow-hidden whitespace-nowrap"
                        >
                            <Link href={`/project/${issue.projectId}`}>
                                <span className="text-sm text-purple-500 hover:text-blue-700 hover:underline">
                                    Project: {issue.project.name}
                                </span>
                            </Link>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

export default IssueCard;
