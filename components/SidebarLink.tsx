"use client";

import Link from "next/link";
import {
  Settings,
  User,
  Grid,
  Calendar,
  AlertTriangle,
  LogOut,
} from "react-feather";
import { usePathname } from "next/navigation";
import { SidebarLinkData } from "./Sidebar";
import clsx from "clsx";

type SidebarLinkProps = {
  link: SidebarLinkData;
};

const icons = { Settings, User, Grid, Calendar, AlertTriangle, LogOut };
const SidebarLink = ({ link }: SidebarLinkProps) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon as keyof typeof icons];
  return (
    <Link href={link.link}>
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
