'use client'
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";


export default function CandidateAuth({children}) {

    return (
        <BackgroundGradient className="rounded-3xl flex justify-center items-center p-4 h-full w-[80vw] md:w-[40vw] lg:w-[30vw] bg-slate-950">
            <div
                className="max-w-md w-full flex flex-col justify-center items-center mx-auto rounded-none md:rounded-2xl p-4">
                <h2 className="font-bold w-full text-xl text-slate-50">
                    Welcome to CareerSync
                </h2>
                <p className='text-sm w-full text-slate-200 italic'>
                    "Today unlock your dream opportunities and discover tailored career paths."
                </p>
                {children}
            </div>
        </BackgroundGradient>
    );
}
