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
        label: "Calendar",
        icon: "Calendar",
        link: "/calendar",
    },
    {
        label: "Issues",
        icon: "AlertTriangle",
        link: "/issues",
    },
    {
        label: "Settings",
        icon: "Settings",
        link: "/settings",
    },
    {
        label: "Logout",
        icon: "LogOut",
        link: "/logout",
    },
];

const Sidebar = () => {
    return (
        <Card className="h-full w-40 sm:h-20 sm:w-full flex flex-col sm:flex-row items-center justify-evenly sm:justify-between sm:mt-4">
            <div className="w-full flex justify-center items-center sm:hidden">
                <Image
                    src={logo}
                    alt="ProgressPatron logo"
                    priority
                    className="w-15 sm:w-10"
                />
            </div>

            {links.map((link) => (
                <SidebarLink link={link} key={link.link} />
            ))}
        </Card>
    );
};

export default Sidebar;
