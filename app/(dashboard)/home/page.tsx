import Greetings from "@/components/Greetings";
import GreetingsShimmer from "@/components/GreetingsShimmer";
import NewProject from "@/components/NewProject";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";

import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";

const getData = async () => {
    const user = await getUserFromCookie(cookies() as any);

    const projects = await db.project.findMany({
        where: {
            ownerId: user?.id,
            deleted: false,
        },
        include: {
            tasks: {
                where: {
                    deleted: false,
                },
            },
        },
    });

    return { projects };
};

export default async function Page() {
    const { projects } = await getData();

    return (
        <div className="h-full overflow-y-auto  w-full mt-2">
            <div className=" h-full items-stretch justify-center min-h-[content] px-6 sm:px-4 pt-0">
                <div className="flex-1 grow flex">
                    <Suspense fallback={<GreetingsShimmer />}>
                        {/* @ts-ignore */}
                        <Greetings />
                    </Suspense>
                </div>
                <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
                    {projects.map((project) => (
                        <div className="w-1/3 lg:w-full p-3" key={project.id}>
                            <Link href={`/project/${project.id}`} passHref>
                                <ProjectCard project={project} />
                            </Link>
                        </div>
                    ))}
                    <div className="w-1/3 lg:w-full">
                        <NewProject />
                    </div>
                </div>
                <div className="mt-6 flex-2 grow w-full flex">
                    <div className="w-full">
                        {/* @ts-ignore */}
                        <TaskCard projects={projects} />
                    </div>
                </div>
            </div>
        </div>
    );
}
