import { db } from "@/utilities/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();
  const match = await db.user.findUnique({
    where: {
      clerkId: user!.id as string,
    },
  });
  if (!match) {
    await db.user.create({
      data: {
        clerkId: user!.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
        firstName: user?.firstName as string,
        lastName: user?.lastName as string,
      },
    });
  }

  redirect("/home");
};

const NewUser = async () => {
  await createNewUser();
  return <div></div>;
};

export default NewUser;
