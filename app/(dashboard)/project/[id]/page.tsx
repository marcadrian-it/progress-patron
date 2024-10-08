import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";

import { Project } from "@prisma/client";
import { cookies } from "next/headers";
import TaskCard from "@/components/TaskCard";

type ProjectPageParams = {
    params: {
        id: number;
    };
};

const getData = async (id: number) => {
    const user = await getUserFromCookie(cookies() as any);

    const project = await db.project.findFirst({
        where: {
            id,
            ownerId: user?.id,
            deleted: false,
        },
        include: {
            tasks: {
                where: {
                    deleted: false,
                },
                orderBy: {
                    due: "asc",
                },
            },
        },
    });

    return project;
};

export default async function ProjectPage({ params }: ProjectPageParams) {
    const project = (await getData(Number(params.id))) as Project;

    return (
        <div className="h-full overflow-y-auto px-6 sm:px-4 w-full mt-2">
            {/* @ts-expect-error Server Component */}
            <TaskCard project={project} />
        </div>
    );
}
