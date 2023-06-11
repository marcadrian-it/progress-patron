"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Modal from "react-modal";
import { User } from "@prisma/client";
import { updateUserEmail } from "@/utilities/api";

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user: user }) => {
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const togglePasswordInput = () => {
    setShowNewPasswordInput(!showNewPasswordInput);
  };

  const handleSave = async () => {
    if (email !== user.email && password) {
      await updateUserEmail(user.id, email, password);
    }
  };

  return (
    <div className=" w-2/3 mt-4 flex flex-col gap-2 text-xl">
      <h2 className="text-center text-3xl font-bold mb-12">Account settings</h2>

      <label className=" mb-2">
        FIRST NAME
        <Input
          className="border-gray-400 bg-gray-200 mt-2"
          disabled
          value={user.firstName}
        />
      </label>
      <label className=" mb-2">
        LAST NAME
        <Input
          className="border-gray-400 bg-gray-200 mt-2"
          disabled
          value={user.lastName}
        />
        <span className="text-sm text-gray-400">
          You cannot change your name.
        </span>
      </label>
      <label className=" mb-2">
        E-MAIL ADDRESS
        <Input
          className="border-gray-400 mt-2"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className=" mb-2">
        PASSWORD
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-gray-400 mt-2"
          type="password"
        />
      </label>
      <span
        onClick={togglePasswordInput}
        className="text-sm text-blue-400 hover:underline cursor-pointer text-start"
      >
        Do you want to change your password?
      </span>
      <div style={{ height: "80px" }}>
        {showNewPasswordInput && (
          <label className=" mb-2">
            NEW PASSWORD
            <Input className="border-gray-400 mt-2" type="password" />
          </label>
        )}
      </div>

      <div className="flex flex-col justify-center items-center mt-8">
        <Button className="w-3/4" onClick={handleSave}>
          Save
        </Button>
        <span
          onClick={openModal}
          className="text-sm text-blue-400 mt-4 hover:underline cursor-pointer"
        >
          Do you want to delete your account?
        </span>
      </div>
      <Modal
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-full md:w-3/4 bg-white rounded-xl p-8"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2 className="text-2xl">Delete Account</h2>
        <p>
          Please confirm that you want to delete your account. This action
          cannot be undone and you will not be able to create a new account with
          the same username.
        </p>
        <label>
          Password
          <Input type="password" />
        </label>
        <Button intent="secondary" size="medium" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600"
          intent="primary"
          size="medium"
        >
          Delete Account
        </Button>
      </Modal>
    </div>
  );
};

export default Settings;
