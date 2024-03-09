'use client'
import React from 'react';
import {signOut, useSession} from "next-auth/react";
import {PiSignInBold} from "react-icons/pi";

function HomeDash(props) {
    const {data} = useSession();
    return (
        <div className='flex flex-col justify-center items-center bg-slate-950 w-screen h-screen'>
            <div className='w-2/3 flex flex-col justify-center items-center gap-5'>
                <h1 className='text-slate-50 font-medium'>Welcome <span
                    className='font-bold'>{data.user.name}</span> to
                    CareerSync </h1>
                <button
                    className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                    onClick={() => signOut()}
                >
                    Sign Out
                    <PiSignInBold size={20}/>
                </button>
            </div>

        </div>
    );
}

export default HomeDash;