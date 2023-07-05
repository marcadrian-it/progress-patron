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
import Card from "./Card";
import { useToast } from "@/components/ui/use-toast";

Modal.setAppElement("#modal");

interface SettingsProps {
  user: User;
}

interface ApiError extends Error {
  response: {
    status: number;
  };
}

const Settings: React.FC<SettingsProps> = ({ user: user }) => {
  const router = useRouter();
  const { toast } = useToast();
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

  const showToast = (isError: boolean, description: string) => {
    const variant = isError ? "destructive" : "destructive_message";

    toast({
      variant,
      title: isError ? "Error" : "Success",
      description,
      duration: 8000,
    });
  };

  const handleError = (error: ApiError, errorMessage: string) => {
    if (error.response?.status === 401) {
      showToast(true, "Invalid password.");
      setEmail(user.email);
    } else if (error.response?.status === 409) {
      showToast(true, errorMessage);
      setEmail(user.email);
      router.refresh();
    }
  };

  const handleSave = async () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!password) {
      showToast(true, "Current password is required.");
      return;
    }
    if (!email) {
      showToast(true, "Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      showToast(true, "Email is not valid.");
      return;
    }
    if (email === user.email && !newPassword) {
      showToast(true, "No new password was provided.");
      return;
    }
    if (email !== user.email && newPassword) {
      // Update both the user's email and password
      try {
        await updateUserEmailAndPassword(user.id, email, newPassword, password);
        showToast(false, "Email and password were updated.");
        setEmail(email);
      } catch (error) {
        handleError(error as ApiError, "Email is already in use.");
      }
    } else if (email !== user.email) {
      // Update only the user's email

      try {
        await updateUserEmail(user.id, email, password);
        showToast(false, "Email was updated.");
        setEmail(email);
        router.refresh();
      } catch (error) {
        handleError(error as ApiError, "Email is already in use.");
      }
    } else if (newPassword) {
      // Update only the user's password
      try {
        await updateUserPassword(user.id, newPassword, password);
        showToast(false, "Password was updated.");
      } catch (error) {
        handleError(error as ApiError, "");
      }
    }

    setPassword("");
    setNewPassword("");
  };

  const handleDelete = async () => {
    if (!password) {
      await closeModal();
      showToast(true, "Current password is required.");
    } else {
      try {
        await deleteUser(user.id, password);
        router.replace("/register");
      } catch (error) {
        handleError(error as ApiError, "");
      }
    }
  };

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
                className="border-gray-400 sm:text-sm bg-gray-200 mt-2"
                disabled
                value={user.lastName}
              />
              <span className="sm:text-xs text-sm text-gray-400">
                You cannot change your name.
              </span>
              <br></br>
            </label>
            <label className="mb-2 sm:text-sm sm:max-w-[200px]">
              E-MAIL ADDRESS
              <Input
                className="sm:text-sm  border-gray-400 mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </label>
            <label className="mb-2 sm:text-sm sm:max-w-[200px]">
              PASSWORD
              <Input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-400 sm:text-sm  mt-2"
                type="password"
                autoComplete="off"
              />
            </label>
            <span
              onClick={togglePasswordInput}
              className="sm:text-xs text-sm text-blue-400 hover:underline cursor-pointer text-start"
            >
              Do you want to change your password?
            </span>
            <br></br>
            {showNewPasswordInput && (
              <label className="mb-2 sm:text-xs">
                NEW PASSWORD
                <Input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border-gray-400 sm:text-sm mt-2"
                  type="password"
                  autoComplete="off"
                />
              </label>
            )}
          </div>

          <div className="flex flex-col justify-center items-center mt-8 sm:mt-1">
            <Button className="w-3/4 sm:text-sm" onClick={handleSave}>
              Save
            </Button>
            <span
              onClick={openModal}
              className="sm:text-xs text-sm text-blue-400 mt-4 hover:underline cursor-pointer"
            >
              Do you want to delete your account?
            </span>
          </div>
          <Modal
            overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
            className="w-1/3 lg:w-3/4 bg-white rounded-xl p-8"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          >
            <h2 className="text-2xl">Delete Account</h2>
            <p className="mt-2 mb-4">
              Please confirm that you want to delete your account. This action
              cannot be undone.
            </p>
            <div className="p-4 sm:p-1 flex flex-col align-middle justify-start items-start">
              <label className="w-4/5">
                Password
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-400 mt-2 flex flex-row"
                  type="password"
                  autoComplete="off"
                />
              </label>
              <div className="flex justify-between mt-4">
                <Button intent="secondary" size="medium" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 ml-2"
                  intent="primary"
                  size="small"
                  onClick={handleDelete}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </Card>
    </>
  );
};

export default Settings;
