"use client";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { User } from "@prisma/client";

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user: user }) => {
  return (
    <div className=" w-2/3 mt-4 flex flex-col gap-2 text-xl">
      <h2 className="text-center text-3xl font-bold mb-12">Account settings</h2>

      <label className=" mb-2">
        FIRST NAME
        <Input
          className="border-gray-400 mt-2"
          disabled
          value={user.firstName}
        />
      </label>
      <label className=" mb-2">
        LAST NAME
        <Input
          className="border-gray-400 mt-2"
          disabled
          value={user.lastName}
        />
      </label>
      <label className=" mb-2">
        E-MAIL ADDRESS
        <Input className="border-gray-400 mt-2" value={user.email} />
      </label>
      <label className=" mb-2">
        PASSWORD
        <Input className="border-gray-400 mt-2" type="password" />
      </label>
      <label className=" mb-2">
        NEW PASSWORD
        <Input className="border-gray-400 mt-2" type="password" />
      </label>
      <div className="flex justify-center mt-4">
        <Button className="w-3/4">Save</Button>
      </div>
    </div>
  );
};

export default Settings;
