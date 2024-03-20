"use client";

import React, { useRef, useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { BackgroundBeams } from "@/components/ui/background-beams";
import RedirectToHome from "@/components/redirectComponents/RedirectToHome";

export default function Authentication({ children }) {
  const [switcherText, setSwitcherText] = useState("Switch to Employer");
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(() => {
    if (router.isReady) {
      return router.pathname.includes("employer");
    }
    return false; 
  });

  const child = (
    <div className={`w-auto md:w-[50vw] mt-12 md:mt-0 md:mb-16 h-auto flex justify-center items-center`}>
      {children}
    </div>
  ); 

  const copyRight = (
    <div className={`flex py-8 md:pb-5 justify-center z-20 md:w-[50vw] items-center h-auto md:h-[10vh] font-bold text-slate-50`}>
      &#169;2024 CareerSync
    </div>
  );

  const handleSwitcher = (checked) => {
    checked ? router.push('/employer/signin') : router.push('/candidate/signin')
    setIsChecked(checked);
    setSwitcherText(checked ? "Switch to Candidate" : "Switch to Employer");
  }

  return (
    <RedirectToHome>
      <div className={`h-full w-auto bg-slate-950 relative flex flex-col justify-between antialiased`}>
        <div className={`flex flex-col sm:flex-row md:w-[50vw] gap-3 sm:gap-0 sm:justify-between items-center z-20 h-auto md:h-[20vh] sm:px-8 md:pl-8 mt-10 md:mt-0`}>
          <Image src={'/Logo-White.svg'} alt={'CareerSync'} width={70} height={70}/>
          <div className="flex items-center space-x-2">
            <Switch className='dark' defaultChecked={isChecked}
              onCheckedChange={handleSwitcher}
              id="airplane-mode" 
            />
            <Label htmlFor="airplane-mode"
              className='font-bold text-slate-50'>{switcherText}
            </Label>
          </div>
        </div>
        <div className='flex justify-center z-20 items-center h-auto md:h-[70vh]'>
          {child}
        </div>
        {copyRight}
        <BackgroundBeams />
      </div>
    </RedirectToHome>
  )
}
