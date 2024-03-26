'use client'
import React, {useEffect} from 'react';
import {signOut, useSession} from "next-auth/react";
import {PiSignInBold} from "react-icons/pi";
import FullPageLoader from "@/components/ui/FullPageLoader";
import {useAppContext} from "@/Context/Candidate_Employer_Data";

function HomeDash(props) {
    const {data} = useSession();
    const {candidate} = useAppContext();
    return (
            <div className='flex flex-col justify-center items-center bg-slate-950 w-screen h-screen'>
                <div className='w-2/3 flex flex-col justify-center items-center gap-5'>
                    <h1 className='text-slate-50 font-medium'>Welcome <span
                        className='font-bold'>{(data && data.user.name) || (candidate && candidate.email)}</span> to
                        CareerSync </h1>
                    <button
                        className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                        onClick={async () => await signOut({ callbackUrl: 'http://localhost:3000/candidate/signin', redirect: false})}
                    >
                        Sign Out
                        <PiSignInBold size={20}/>
                    </button>
                </div>
            </div>
    );
}

export default HomeDash;