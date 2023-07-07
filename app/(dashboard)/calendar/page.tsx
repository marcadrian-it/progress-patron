import CalendarCard from "@/components/CalendarCard";
import { getUserFromCookie } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { cookies } from "next/headers";
import { TASK_STATUS } from "@prisma/client";

export default async function CalendarPage() {
  const getData = async () => {
    const user = await getUserFromCookie(cookies() as any);

    const tasks = await db.task.findMany({
      where: {
        ownerId: user?.id,
        deleted: false,
        NOT: {
          status: TASK_STATUS.COMPLETED,
        },
      },
      orderBy: {
        due: "asc",
      },
    });

    return tasks;
  };
  const tasks = await getData();
  return (
    <div className="h-full w-full px-6 sm:px-2">
      <CalendarCard tasks={tasks}></CalendarCard>
    </div>
  );
}
