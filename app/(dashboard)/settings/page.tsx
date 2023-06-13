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
    <div className="h-full overflow-y-auto w-full flex justify-center items-center">
      <div className="w-1/3 h-3/4">
        <Card className="h-full  flex flex-col pt-8 items-center">
          <Settings user={user!} />
        </Card>
      </div>
    </div>
  );
}
