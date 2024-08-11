import { getUserFromCookie } from "@/utilities/auth";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import { delay } from "@/utilities/async";
import Link from "next/link";

const getData = async () => {
    await delay(300);
    const user = await getUserFromCookie(cookies() as any);
    return user;
};

const Greetings = async () => {
    const user = await getData();

    return (
        <Card className="w-full py-4 relative">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-700 font-bold mb-4">
                    Hello, {user?.firstName}!
                </h1>
                <h2 className="text-xl text-gray-400">
                    Check your daily tasks and schedule
                </h2>
            </div>
            <div>
                <Link href={"/calendar"}>
                    <Button size="large" className="block sm:hidden">
                        Today&apos;s Schedule
                    </Button>
                    <Button size="small" className="hidden sm:block">
                        Today&apos;s Schedule
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default Greetings;
