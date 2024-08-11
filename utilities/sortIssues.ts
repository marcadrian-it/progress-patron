/* eslint-disable no-redeclare */
import { ISSUE_STATUS, Prisma } from "@prisma/client";

const issueWithProject = Prisma.validator<Prisma.IssueArgs>()({
    include: {
        project: true,
    },
});

type issueWithProject = Prisma.IssueGetPayload<typeof issueWithProject>;

const severityMap: Record<string, number> = {
    Critical: 3,
    High: 2,
    Medium: 1,
    Low: 0,
};

export const sortIssuesBySeverity = (
    issues: issueWithProject[]
): issueWithProject[] => {
    return issues.sort(
        (a, b) => severityMap[b.severity] - severityMap[a.severity]
    );
};

export const filterIssuesByStatus = (
    issues: issueWithProject[],
    status: ISSUE_STATUS
): issueWithProject[] => {
    return issues.filter((issue) => issue.status === status);
};
