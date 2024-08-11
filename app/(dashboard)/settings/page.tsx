import Settings from "@/components/Settings";

import { getUserFromCookie } from "@/utilities/auth";
import { cookies } from "next/headers";

const getData = async () => {
    return await getUserFromCookie(cookies() as any);
};

export default async function SettingsPage() {
    const user = await getData();

    return (
        <div className="overflow-y-auto h-full w-full flex justify-center items-center mt-2">
            <div className="w-1/3 h-3/4 px-6 sm:px-4 sm:h-full md:h-full md:w-full flex items-center">
                <Settings user={user!} />
            </div>
        </div>
    );
}
