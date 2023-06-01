import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { Task, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";

import Card from "./Card";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import NewTask from "./NewTask";

type TaskCardProps = {
  title?: string;
  tasks?: Task[];
};

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);

  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};

const TaskCard = async ({ tasks, title }: TaskCardProps) => {
  const data = tasks || (await getData());

  return (
    <Card>
      <div className="flex justify-between items-center ">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>{/* <NewTask /> */}</div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task: Task) => (
              <div className="py-2 " key={task.id}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>You currently have no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
