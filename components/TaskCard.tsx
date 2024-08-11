import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { Project, Task, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import { formatDate } from "@/utilities/dateUtils";
import Card from "./Card";

import NewTask from "./NewTask";
import StatusButtons from "./StatusButtons";
import DeleteTaskButton from "./DeleteTaskButton";

type TaskCardProps = {
    projects?: Project[];
    project?:
        | (Project & {
              tasks: Task[];
          })
        | null;
};

const getData = async () => {
    const user = await getUserFromCookie(cookies() as any);

    const tasks = await db.task.findMany({
        where: {
            ownerId: user?.id,
            deleted: false,
            NOT: {
                status: TASK_STATUS.COMPLETED,
            },
            project: {
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
            <div className="flex flex-row sm:flex-col justify-between items-center">
                <div>
                    {project ? (
                        <span
                            className="text-3xl text-gray-700 font-bold mb-4 sm:text-2xl
          w-full overflow-hidden whitespace-nowrap"
                            style={{ textOverflow: "ellipsis" }}
                        >
                            {project.name}
                        </span>
                    ) : (
                        <h1 className="text-3xl text-gray-700 font-bold mb-0 sm:text-2xl">
                            Tasks with Approaching Deadlines
                        </h1>
                    )}
                </div>
                <div className="mt-2 mb-2">
                    {(projects?.length || project) && (
                        <NewTask projects={projects} project={project} />
                    )}
                </div>
            </div>
            <div>
                {data && data.length ? (
                    <div className="space-y-4 divide-y-2">
                        {data.map((task: Task) => (
                            <div
                                className="flex items-center gap-4 md:gap-3 lg:flex-wrap overflow-hidden justify-center"
                                key={task.id}
                            >
                                <div className="flex items-center w-full mt-4">
                                    <div className="flex-shrink-0 mr-4">
                                        <DeleteTaskButton taskId={task.id} />
                                    </div>
                                    <div className="flex-grow">
                                        <div className={`flex flex-row gap-6`}>
                                            <span className="text-gray-800 font-bold">
                                                {task.name}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm font-semibold">
                                                {task.description}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-red-400 text-sm font-semibold">
                                                {formatDate(task.due, true)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 pr-8 md:pr-0 md:mt-0 mb-1 mt-4">
                                    {task.status ===
                                        TASK_STATUS.NOT_STARTED && (
                                        <div>
                                            <StatusButtons
                                                status={task.status}
                                                taskId={task.id}
                                            />
                                        </div>
                                    )}
                                    {task.status === TASK_STATUS.STARTED && (
                                        <div>
                                            <StatusButtons
                                                status={task.status}
                                                taskId={task.id}
                                            />
                                        </div>
                                    )}
                                    {task.status === TASK_STATUS.COMPLETED && (
                                        <div>
                                            <StatusButtons
                                                status={task.status}
                                                taskId={task.id}
                                            />
                                        </div>
                                    )}
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
