"use client";
import { FC, useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import Card from "./Card";
import { DeleteButton } from "./DeleteButton";
import Spinner from "./Spinner";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-gb", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    setIsDeleting(false);
  }, [project]);
  const completedCount = project.tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;
  const progress =
    completedCount === 0 && project.tasks.length === 0
      ? 100
      : Math.ceil((completedCount / project.tasks.length) * 100);

  return (
    <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      {isDeleting ? (
        <div
          className="flex justify-center items-center"
          style={{
            minHeight: "160px",
          }}
        >
          <Spinner className="border-purple-500 w-[42px] h-[42px]" />
        </div>
      ) : (
        <>
          <div>
            <span className="text-sm text-gray-400">
              Started: {formatDate(project.createdAt)}
            </span>
          </div>
          <div>
            <span className="text-sm text-red-400">
              Due: {formatDate(project.due)}
            </span>
            <div>
              <DeleteButton
                variant="project"
                id={project.id}
                setIsDeleting={setIsDeleting}
              />
            </div>
          </div>
          <div
            style={{ textOverflow: "ellipsis" }}
            className="mb-6 w-full overflow-hidden whitespace-nowrap"
          >
            <span className="text-3xl text-gray-600">{project.name}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-400">
              {completedCount}/{project.tasks.length} completed
            </span>
          </div>
          <div>
            <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
              <div
                className={
                  "h-full text-center text-xs text-white bg-violet-600 rounded-full"
                }
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600 font-semibold">
                {progress}%
              </span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default ProjectCard;
