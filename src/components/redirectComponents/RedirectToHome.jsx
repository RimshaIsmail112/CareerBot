"use client";

import React from 'react';
import {useRouter} from "next/navigation";
import {useSession, } from "next-auth/react";
import FullPageLoader from "@/components/FullPageLoader";

function RedirectToHome({children}) {
    const router = useRouter();
    const {data: session, status} = useSession();
    if (typeof window !== "undefined" && session) {
        router.push("/");
    }
    else if (typeof window === "undefined" || status === "loading") {
        return <FullPageLoader/>
    }
    else {
        return <div>{children}</div>
    }
}

export default RedirectToHome;