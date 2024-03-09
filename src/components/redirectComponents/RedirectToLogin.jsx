"use client";

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import FullPageLoader from "@/components/ui/FullPageLoader";

function RedirectToHome({children}) {
    const router = useRouter();
    const {data: session, status} = useSession();
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        if (status === "authenticated" || status === "loading") {
            setLoading(false);
        }
    }, []);
    if (loading || typeof window === "undefined") return <FullPageLoader/>;
    if (typeof window !== "undefined" && !session) {
        router.push("/candidate/signin");
    }
    else {
        return <div>{children}</div>
    }
}

export default RedirectToHome;