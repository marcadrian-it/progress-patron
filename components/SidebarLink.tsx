"use client";

import Link from "next/link";
import { Settings, Grid, Calendar, AlertTriangle, LogOut } from "react-feather";
import { usePathname } from "next/navigation";
import { SidebarLinkData } from "./Sidebar";
import clsx from "clsx";

type SidebarLinkProps = {
  link: SidebarLinkData;
};

const icons = { Settings, Grid, Calendar, AlertTriangle, LogOut };
const SidebarLink = ({ link }: SidebarLinkProps) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon as keyof typeof icons];
  return (
    <Link href={link.link} aria-label={link.label}>
      <div className="w-10 sm:w-8">
        <Icon
          size="100%"
          className={clsx(
            "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
            isActive && "stroke-violet-600"
          )}
        />
      </div>
    </Link>
  );
};

export default SidebarLink;
