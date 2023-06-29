import CalendarCard from "@/components/CalendarCard";
import { getUserByClerkID } from "@/utilities/auth";
import { db } from "@/utilities/db";
import { TASK_STATUS } from "@prisma/client";

export default async function CalendarPage() {
  const getData = async () => {
    const user = await getUserByClerkID();

    const tasks = await db.task.findMany({
      where: {
        ownerId: user?.id,
        NOT: {
          status: TASK_STATUS.COMPLETED,
        },
        deleted: false,
      },
      orderBy: {
        due: "asc",
      },
    });

    return tasks;
  };
  const tasks = await getData();
  return (
    <div className="h-full w-full px-6">
      <CalendarCard tasks={tasks}></CalendarCard>
    </div>
  );
}
