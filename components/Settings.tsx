"use client";
import React from "react";
import Input from "@/components/Input";
import { User } from "@prisma/client";

import Card from "./Card";
import { UserButton } from "@clerk/nextjs";

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user: user }) => {
  return (
    <>
      <Card className="overflow-y-auto flex flex-col pt-8 sm:pt-0 items-center h-full">
        <div className=" w-2/3 mt-4 flex flex-col gap-2 text-xl sm:w-full">
          <h2 className="text-center text-3xl sm:text-lg sm:mb-0 font-bold mb-12">
            Account settings
          </h2>
          <div>
            <label className="mb-2 sm:text-sm sm:max-w-[200px]">
              FIRST NAME
              <Input
                className="border-gray-400 sm:text-sm bg-gray-200 mt-2"
                disabled
                value={user.firstName}
              />
            </label>
            <label className="mb-2 sm:text-sm sm:max-w-[200px]">
              LAST NAME
              <Input
                className="border-gray-400 sm:text-sm bg-gray-200 mt-2 mb-2"
                disabled
                value={user.lastName}
              />
            </label>
            <label className="mb-2 sm:text-sm sm:max-w-[200px]">
              E-MAIL ADDRESS
              <Input
                className="sm:text-sm  border-gray-400 bg-gray-200 mt-2"
                value={user.email}
                disabled
              />
            </label>

            <span className="sm:text-xs text-sm text-blue-400 mt-4 hover:underline cursor-default">
              To change your credentials click the button below
            </span>
            <div className="flex justify-center mt-8 p-8">
              <UserButton
                appearance={{
                  variables: {
                    colorPrimary: "#8B5CF6",
                  },
                  elements: {
                    userButtonAvatarBox: "w-[140px] h-[140px] rounded-full",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Settings;
