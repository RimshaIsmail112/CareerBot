"use client";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";
import FullPageLoader from "@/components/ui/FullPageLoader";
import {StarsBackground} from "@/components/ui/stars-background";
import {ShootingStars} from "@/components/ui/shooting-stars";

export default function Double({ children }) {
  const [heading, setHeading] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState(pathname.includes("employer"));
  const [switcherText, setSwitcherText] = useState(
    pathname.includes("employer") ? "Switch to Candidate" : "Switch to Employer"
  );
  const child = (
    <div
      className={`w-auto md:w-[50vw] ${
        pathname !== "/candidate/otp" && pathname !== "/employer/otp"
          ? "mt-12"
          : "mt-0"
      }  md:mt-0 md:mb-16 h-auto flex justify-center items-center`}
    >
      {children}
    </div>
  );
  const copyRight = (
    <div
      className={`flex py-8 ml-auto md:pb-5 justify-center z-20 content-end  ${
        pathname !== "/candidate/otp" && pathname !== "/employer/otp"
          ? "md:w-[50vw]"
          : "w-auto"
      } items-center h-auto md:h-[10vh] font-bold text-slate-50`}
    >
      &#169;2024 CareerBot
    </div>
  );
  useEffect(() => {
    if (pathname.includes("employer")) {
      setHeading(
        "CareerBot: Empowering Career Excellence Through AI"
      );
    } else {
      setHeading("CareerBot: Transforming Career Pathways with AI Precision");
    }
  }, [pathname]);
  const handleSwitcher = async (checked) => {
    checked
      ? await router.push("/employer/signin")
      : await router.push("/candidate/signin");
    setIsChecked(checked);
    setSwitcherText(checked ? "Switch to Candidate" : "Switch to Employer");
  };

  return (
    <div
      className={`${
        pathname !== "/candidate/otp" && pathname !== "/employer/otp"
          ? "h-full"
          : "h-screen"
      } w-auto bg-slate-900 relative flex flex-col justify-between antialiased`}
    >
      <StarsBackground className="h-screen w-full absolute inset-0 z-0" />
      <ShootingStars className="h-screen w-full absolute inset-0 z-0" />

      <div
        className={`flex flex-col sm:flex-row ${
          pathname !== "/candidate/otp" && pathname !== "/employer/otp"
            ? "md:w-[100vw]"
            : "w-auto"
        } gap-3 sm:gap-0 sm:justify-between items-center z-20 h-auto md:h-[20vh] sm:px-8 md:pl-8 mt-10 md:mt-0`}
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

      <div className="flex justify-center z-20 items-center h-auto sm:h-[90vh] md:h-[70vh] flex-row-reverse">
        {pathname !== "/candidate/otp" && pathname !== "/employer/otp" && (
          <div className="md:flex hidden flex-col justify-center items-center w-[50vw] p-5">
            <h1 className="relative z-10 text-lg md:text-3xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
              {heading}
            </h1>
          </div>
        )}
        {child}
      </div>

      {copyRight}
    </div>
  );  
}
