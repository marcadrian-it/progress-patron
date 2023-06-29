import { auth } from "@clerk/nextjs";
import Link from "next/link";
import "@/styles/global.css";

export default async function Main() {
  const { userId } = await auth();
  let href = userId ? "/home" : "/new-user";

  return (
    <div className="w-screen h-screen flex justify-center items-center sunset-mesh text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
