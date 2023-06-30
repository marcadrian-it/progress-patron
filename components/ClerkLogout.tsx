"use client";
import { LogOut } from "react-feather";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

function ClerkLogout() {
  return (
    <div>
      <SignOutButton>
        <Link href={"/signin"}>
          <div className="w-10 sm:w-8">
            <LogOut
              size="100%"
              className={
                "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out cursor-pointer"
              }
            />
          </div>
        </Link>
      </SignOutButton>
    </div>
  );
}

export default ClerkLogout;
