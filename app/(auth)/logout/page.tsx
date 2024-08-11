"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Card from "@/components/Card";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await fetch("/api/logout", { method: "POST" });
            router.replace("/signin");
        };

        logout();
    }, [router]);

    return (
        <Card>
            <div>
                You&apos;ve been logged out
                <br /> Redirecting...
            </div>
        </Card>
    );
}
