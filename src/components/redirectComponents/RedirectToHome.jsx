"use client";

import React, {useContext, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useSession, } from "next-auth/react";
import FullPageLoader from "@/components/ui/FullPageLoader";
import {AppConext} from "@/Context/Candidate_Employer_Data";

function RedirectToHome({children}) {
    const {candidateID} = useContext(AppConext);
    const router = useRouter();
    const {data: session, status} = useSession();

    if (status === "loading" && !session) {
        return <FullPageLoader/>
    }
    if (typeof window !== "undefined" && session && candidateID) {
        router.replace("/");
        return null;
    }
    else {
        return <div>{children}</div>
    }
}

export default RedirectToHome;