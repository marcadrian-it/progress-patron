import Settings from "@/components/Settings";
import { getUserByClerkID } from "@/utilities/auth";
import { useUser } from "@clerk/clerk-react";

const getData = async () => {
  return await getUserByClerkID();
};

export default async function SettingsPage() {
  const user = await getData();

  return (
    <div className="overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="w-1/3 h-3/4 xl:w-3/4 sm:h-full md:h-full md:w-full flex items-center">
        <Settings user={user!} />
      </div>
    </div>
  );
}
