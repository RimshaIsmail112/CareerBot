"use client";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MdOutlineAlternateEmail, MdLock } from "react-icons/md";
import { IoMdEye, IoMdEyeOff  } from "react-icons/io";
import { PiSignInBold } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import Link from "next/link";

export default function CandidateSignInPage() {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className="my-12" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email" className='text-slate-50'>Email Address</Label>
                <Input id="email" Icon={<MdOutlineAlternateEmail size={20}/>} placeholder="example@gmail.com"
                       type="email" className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password" className='text-slate-50'>Password</Label>
                <Input Icon={<MdLock size={20}/>} finalIcon={
                    showPassword
                        ? <IoMdEyeOff size={20} onClick={toggleShowPassword} className='cursor-pointer'/>
                        : <IoMdEye size={20} onClick={toggleShowPassword} className='cursor-pointer'/>
                } id="password" placeholder="••••••••" type={showPassword ? "text" : "password"}
                       className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
            </LabelInputContainer>
            <div className="flex justify-end items-center mb-4">
                <Link href="#" className="text-slate-300 text-sm hover:underline">Forgot Password?</Link>
            </div>
            <button
                className="bg-slate-50 flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                Sign in
                <PiSignInBold size={20}/>
            </button>
            <div
                className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <button
                    className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                >
                    <BsGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Github
                    </span>
                </button>
                <span className="text-slate-400">or</span>
                <button
                    className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                >
                    <FcGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300"/>
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Google
                    </span>
                </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-6 text-sm">
                <span className="text-slate-400">Don't have an account? </span>
                <Link href="/candidate/signup"
                      className="text-slate-300 dark:text-zinc-900 font-medium hover:underline">
                    Sign up
                </Link>
            </div>
        </form>
    );
}

const LabelInputContainer = ({
                                 children,
                                 className,
                             }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
