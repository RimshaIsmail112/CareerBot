"use client";

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import FullPageLoader from "@/components/ui/FullPageLoader";

function RedirectToHome({children}) {
    const router = useRouter();
    const {data: session, status} = useSession();

    if (status === "loading" && !session) {
        return <FullPageLoader/>
    }
    if (typeof window !== "undefined" && !session) {
        router.replace("/candidate/signin");
        return null;
    }
    else {
        return <div>{children}</div>
    }
}

export default RedirectToHome;