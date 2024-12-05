"use client";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {StarsBackground} from "@/components/ui/stars-background";
import {ShootingStars} from "@/components/ui/shooting-stars";

export default function Single({ children }) {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(pathname.includes("employer"));
  const [switcherText, setSwitcherText] = useState(
    pathname.includes("employer") ? "Switch to Candidate" : "Switch to Employer"
  );

  const handleSwitcher = async (checked) => {
    checked
      ? await router.replace("/employer/signin")
      : await router.replace("/candidate/signin");
    setIsChecked(checked);
    setSwitcherText(checked ? "Switch to Candidate" : "Switch to Employer");
  };

  return (
    <div
      className={`bg-slate-900 relative w-screen flex flex-col gap-14 sm:gap-11 md:gap-8 justify-between antialiased`}
    >
    <StarsBackground className="h-full w-full absolute inset-0 z-0" />
    <ShootingStars className="h-full w-full absolute inset-0 z-0" />
      <div
        className={`flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between items-center z-20 h-auto md:h-[20vh] sm:px-8 mt-10 md:mt-0`}
      >
        <Image
          src={"/CareerBot-Logo.png"}
          alt={"CareerBot"}
          width={100}
          height={100}
        />
        <div className="flex items-center space-x-2">
          <Switch
            className="dark"
            defaultChecked={isChecked}
            onCheckedChange={handleSwitcher}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode" className="font-bold text-slate-50">
            {switcherText}
          </Label>
        </div>
      </div>
      <div className="flex h-auto justify-center w-screen z-20 items-center">
        <div
          className={`w-screen h-auto md:mb-16 flex justify-center items-center`}
        >
          {children}
        </div>
      </div>
      <div
        className={`flex py-8 md:pb-5 justify-center z-20 items-center h-auto md:h-[10vh] font-bold text-slate-50`}
      >
        &#169;2024 CareerBot
      </div>
      {/* <BackgroundBeams className="h-auto" /> */}
    </div>
  );
}
