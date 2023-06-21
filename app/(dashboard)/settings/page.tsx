import Card from "@/components/Card";
import Settings from "@/components/Settings";

import { getUserFromCookie } from "@/utilities/auth";
import { cookies } from "next/headers";

const getData = async () => {
  return await getUserFromCookie(cookies() as any);
};

export default async function SettingsPage() {
  const user = await getData();

  return (
    <div className="overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="w-1/3 h-full xl:w-3/4 md:h-full md:w-full flex items-center">
        <Card className="flex flex-col pt-8 items-center h-full ">
          <Settings user={user!} />
        </Card>
      </div>
    </div>
  );
}
