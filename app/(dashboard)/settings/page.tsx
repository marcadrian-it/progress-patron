import Card from "@/components/Card";
import Settings from "@/components/Settings";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { getUserFromCookie } from "@/utilities/auth";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

const getData = async () => {
  return await getUserFromCookie(cookies() as RequestCookies);
};

export default async function SettingsPage() {
  const router = useRouter();
  const user = await getData();

  if (!user) {
    router.push("/signin");
  }
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
