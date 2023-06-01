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

async function main() {
  const user = await db.user.upsert({
    where: { email: "user@email.com" },
    update: {},
    create: {
      email: "user@email.com",
      firstName: "User",
      lastName: "Person",
      password: await hashPassword("password"),
      projects: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          due: new Date(2022, 11, 25),
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
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Task ${i}`,
            ownerId: user.id,
            projectId: project.id,
            description: `Everything that describes Task ${i}`,
            status: getRandomTaskStatus(),
          };
        }),
      })
    )
  );

  const issues = await Promise.all(
    user.projects.map((project) =>
      db.issue.createMany({
        data: new Array(5).fill(1).map((_, i) => {
          return {
            name: `Issue ${i} for Project ${project.id}`,
            ownerId: user.id,
            projectId: project.id,
            description: `Everything that describes Issue ${i}`,
            status: ISSUE_STATUS.OPEN,
            severity: ISSUE_SEVERITY.Medium,
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
