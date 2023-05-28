import Card from "./Card";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import SidebarLink from "./SidebarLink";

export type SidebarLinkData = {
  label: string;
  icon: string;
  link: string;
};

const links: SidebarLinkData[] = [
  { label: "Home", icon: "Grid", link: "/home" },
  {
    label: "Issues",
    icon: "AlertTriangle",
    link: "/issues",
  },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { label: "Profile", icon: "User", link: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="ProgressPatron logo" priority className="w-15" />
      </div>
      {links.map((link) => (
        <SidebarLink link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;
