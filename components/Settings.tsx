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
  const [error, setError] = useState("");
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
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Current password is required.",
      });
      return;
    }

    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email is required.",
      });
      setEmail(user.email);
      router.refresh();
      return;
    }

    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email is not valid.",
      });
      return;
    }

    if (email === user.email || !newPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No new password or current Email was given.",
      });
      return;
    }

    if (email !== user.email && newPassword) {
      // Update both the user's email and password
      await updateUserEmailAndPassword(user.id, email, newPassword, password);
      setEmail(email);
      router.refresh();
    } else if (email !== user.email) {
      // Update only the user's email
      try {
        await updateUserEmail(user.id, email, password);
      } catch (error) {
        if ((error as ApiError).response?.status === 401) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Invalid password.",
          });
        }
        setEmail(email);
        router.refresh();
      }
    } else if (newPassword) {
      // Update only the user's password
      await updateUserPassword(user.id, newPassword, password);
      router.refresh();
    }

    setPassword("");
    setNewPassword("");
  };

  const handleDelete = async () => {
    if (!password) {
      await closeModal();
      toast({
        variant: "destructive",
        title: "Error",
        description: "Current password is required.",
      });
    } else {
      try {
        await deleteUser(user.id, password);
        router.replace("/register");
      } catch (error) {
        if ((error as ApiError).response?.status === 401) {
          await closeModal();
          toast({
            variant: "destructive",
            title: "Error",
            description: "Invalid password.",
          });
        }
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
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <label>
              Password
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-400 mt-2"
                type="password"
                autoComplete="off"
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
      </Card>
    </>
  );
};

export default Settings;
