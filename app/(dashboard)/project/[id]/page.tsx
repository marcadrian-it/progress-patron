import { db } from "@/utilities/db";

import { Project } from "@prisma/client";
import TaskCard from "@/components/TaskCard";
import { getUserByClerkID } from "@/utilities/auth";

type ProjectPageParams = {
  params: {
    id: number;
  };
};

const getData = async (id: number) => {
  const user = await getUserByClerkID();

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: {
        where: {
          deleted: false,
        },
      },
    },
  });

  return project;
};

export default async function ProjectPage({ params }: ProjectPageParams) {
  const project = (await getData(Number(params.id))) as Project;

  return (
    <div className="h-full overflow-y-auto p-6 w-full">
      {/* @ts-expect-error Server Component */}
      <TaskCard project={project} />
    </div>
  );
}
