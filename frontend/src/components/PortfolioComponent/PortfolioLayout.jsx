'use client'
import React from 'react';
import Single from "@/components/GlobalLayout/Single";
import {BackgroundGradient} from "@/components/ui/background-gradient";

function PortfolioLayout({children}) {
    return (
        
            <BackgroundGradient className="rounded-3xl flex justify-center items-center p-4 h-full w-[90vw] md:w-[50vw] bg-slate-950">
                {children}
            </BackgroundGradient>
        
    );
}

export default PortfolioLayout;