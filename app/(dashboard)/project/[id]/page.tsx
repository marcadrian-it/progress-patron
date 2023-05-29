import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { Project } from "@prisma/client";
import { cookies } from "next/headers";
import TaskCard from "@/components/TaskCard";

type ProjectPageParams = {
  params: {
    id: number;
  };
};

const getData = async (id: number) => {
  const user = await getUserFromCookie(cookies() as RequestCookies);

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return project;
};

export default async function ProjectPage({ params }: ProjectPageParams) {
  const project = (await getData(Number(params.id))) as Project;

  return (
    <div className="h-full overflow-y-auto p-6 w-full">
      {/* @ts-expect-error Server Component */}
      <TaskCard tasks={project.tasks} title={project.name} />
    </div>
  );
}
