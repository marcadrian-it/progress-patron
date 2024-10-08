import { hashPassword } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { TASK_STATUS, ISSUE_STATUS, ISSUE_SEVERITY } from "@prisma/client";

const getRandomTaskStatus = () => {
    const statuses = [
        TASK_STATUS.COMPLETED,
        TASK_STATUS.NOT_STARTED,
        TASK_STATUS.STARTED,
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomIssueStatus = () => {
    const statuses = [
        ISSUE_STATUS.OPEN,
        ISSUE_STATUS.IN_PROGRESS,
        ISSUE_STATUS.CLOSED,
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomIssueSeverity = () => {
    const statuses = [
        ISSUE_SEVERITY.Critical,
        ISSUE_SEVERITY.High,
        ISSUE_SEVERITY.Medium,
        ISSUE_SEVERITY.Low,
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomDueDate = () => {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() + 1);
    const randomTimestamp =
        Math.floor(
            Math.random() * (maxDate.getTime() - currentDate.getTime())
        ) + currentDate.getTime();
    return new Date(randomTimestamp);
};

async function main() {
    const user = await db.user.upsert({
        where: { email: "demo@demo.com" },
        update: {},
        create: {
            email: "demo@demo.com",
            firstName: "User",
            lastName: "Demo",
            password: await hashPassword("password"),
            projects: {
                create: new Array(5).fill(1).map((_, i) => ({
                    name: `Project ${i + 1}`,
                    due: getRandomDueDate(),
                })),
            },
        },
        include: {
            projects: true,
        },
    });

    const tasks = await Promise.all(
        user.projects.map((project) =>
            db.task.createMany({
                data: new Array(6).fill(1).map((_, i) => {
                    return {
                        name: `Task ${i + 1}`,
                        ownerId: user.id,
                        projectId: project.id,
                        due: getRandomDueDate(),
                        description: `Everything that describes Task ${i + 1}`,
                        status: getRandomTaskStatus(),
                    };
                }),
            })
        )
    );

    const issues = await Promise.all(
        user.projects.map((project) =>
            db.issue.createMany({
                data: new Array(1).fill(1).map((_, i) => {
                    return {
                        name: `Issue ${i + 1} for ${project.name}`,
                        ownerId: user.id,
                        projectId: project.id,
                        description: `Everything that describes Issue ${i + 1}`,
                        status: getRandomIssueStatus(),
                        severity: getRandomIssueSeverity(),
                    };
                }),
            })
        )
    );

    console.log({ user, tasks, issues });
}
main()
    .then(async () => {
        await db.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await db.$disconnect();
        process.exit(1);
    });
