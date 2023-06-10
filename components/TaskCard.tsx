import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { Project, Task, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import { Plus, Circle, ArrowRightCircle, CheckCircle } from "react-feather";
import Card from "./Card";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import NewTask from "./NewTask";

type TaskCardProps = {
  projects?: Project[];
  project?:
    | (Project & {
        tasks: Task[];
      })
    | null;
};

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-gb", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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

const TaskCard = async ({ project, projects }: TaskCardProps) => {
  const data = project?.tasks || (await getData());

  return (
    <Card>
      <div className="flex justify-between items-center ">
        <div>
          {project ? (
            <span className="text-3xl text-gray-700 font-bold mb-4">
              {project.name}
            </span>
          ) : (
            <h1 className="text-3xl text-gray-700 font-bold mb-4">
              Tasks with Approaching Deadlines
            </h1>
          )}
        </div>
        <div>
          {(projects || project) && (
            <NewTask projects={projects} project={project} />
          )}
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task: Task) => (
              <div className="py-2 " key={task.id}>
                <div className="flex items-center gap-2">
                  <Plus className="text-purple-500" strokeWidth={5} />
                  <div>
                    <div>
                      <span className="text-gray-800">{task.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">
                        {task.description}
                      </span>
                    </div>
                    <div>
                      <span className="text-red-400 text-sm">
                        {formatDate(task.due)}
                      </span>
                    </div>
                  </div>
                  <div>
                    {task.status === TASK_STATUS.NOT_STARTED && (
                      <Circle className="text-red-400" strokeWidth={3} />
                    )}
                    {task.status === TASK_STATUS.STARTED && (
                      <ArrowRightCircle
                        className="text-yellow-400"
                        strokeWidth={3}
                      />
                    )}
                    {task.status === TASK_STATUS.COMPLETED && (
                      <CheckCircle className="text-green-400" strokeWidth={3} />
                    )}
                  </div>
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
