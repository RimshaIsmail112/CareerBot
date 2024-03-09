"use client";

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useSession, } from "next-auth/react";
import FullPageLoader from "@/components/ui/FullPageLoader";

function RedirectToHome({children}) {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const {data: session, status} = useSession();
    useEffect(() => {
        if (status === "authenticated" || status === "loading") {
            setLoading(false);
        }
    }, []);
    if (loading) return <FullPageLoader/>;
    if (typeof window !== "undefined" && session) {
        router.push("/");
    }
    else {
        return <div>{children}</div>
    }
}

export default RedirectToHome;