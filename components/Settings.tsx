"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Modal from "react-modal";
import { User } from "@prisma/client";
import {
  deleteUser,
  updateUserEmail,
  updateUserEmailAndPassword,
  updateUserPassword,
} from "@/utilities/api";
import { useRouter } from "next/navigation";

Modal.setAppElement("#modal");

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user: user }) => {
  const router = useRouter();
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const openModal = () => {
    setPassword("");
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setPassword("");
    setModalIsOpen(false);
  };
  const togglePasswordInput = () => {
    setShowNewPasswordInput(!showNewPasswordInput);
  };

  const handleSave = async () => {
    if (email !== user.email && newPassword && password) {
      // Update both the user's email and password
      await updateUserEmailAndPassword(user.id, email, newPassword, password);
    } else if (email !== user.email && password) {
      // Update only the user's email
      await updateUserEmail(user.id, email, password);
    } else if (newPassword && password) {
      // Update only the user's password
      await updateUserPassword(user.id, newPassword, password);
    }
    setPassword("");
    setNewPassword("");
  };

  const handleDelete = async () => {
    if (password) {
      await deleteUser(user.id, password);
      router.replace("/register");
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
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-gray-400 mt-2"
              type="password"
            />
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
        className="w-full md:w-1/5 bg-white rounded-xl p-8"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2 className="text-2xl">Delete Account</h2>
        <p className="mt-2 mb-4">
          Please confirm that you want to delete your account. This action
          cannot be undone.
        </p>
        <label>
          Password
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-400 mt-2"
            type="password"
          />
        </label>
        <div className="flex justify-between mt-4">
          <Button intent="secondary" size="medium" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 "
            intent="primary"
            size="medium"
            onClick={handleDelete}
          >
            Delete Account
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
