"use client";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import { delay } from "@/utilities/async";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const removeCookieAndRedirect = async (router: AppRouterInstance) => {
  // Call the logout API route to remove the cookie
  await fetch("/api/logout", { method: "POST" });

  await delay(300);
  router.replace("/signin");
};

export default function Logout() {
  const router = useRouter();
  removeCookieAndRedirect(router);

  return (
    <Card>
      <div>
        You&apos;ve been logged out
        <br /> Redirecting...
      </div>
    </Card>
  );
}
