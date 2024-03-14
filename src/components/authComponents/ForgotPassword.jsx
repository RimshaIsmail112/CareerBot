"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Input} from "@/components/ui/input"


import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {toast} from "@/components/ui/use-toast"
import React, {useState} from "react";
import Link from "next/link";
import {
    MdArrowBack,
    MdSecurity,
    MdOutlineSecurityUpdateGood,
    MdVpnKey,
    MdOutlineLockReset,
    MdOutlineAlternateEmail, MdLock
} from "react-icons/md";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {PiSignInBold} from "react-icons/pi";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {TiWarning} from "react-icons/ti";
import {cn} from "@/lib/utils";


export default function ForgotPassword({resetFor}) {

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()
    const onSubmit = (data) => {
        if (resetFor === 'Candidate') {

        } else {

        }

    }
    return (
        <>
            {showAlert && (
                <Alert
                    className={`absolute w-[90%] top-0 bg-slate-50 text-slate-950 transform translate-y-5 animate-in`}
                >
                    <TiWarning size={15}/>
                    <AlertTitle className='font-bold'>Warning</AlertTitle>
                    <AlertDescription>
                        {alertMessage}
                    </AlertDescription>
                </Alert>
            )}
            <div
                className="max-w-md w-full h-[60vh] flex flex-col justify-center items-center gap-2 mx-auto rounded-none md:rounded-2xl p-4">
                <span className='text-slate-50'><MdVpnKey size={60}/></span>
                <h2 className="font-bold w-full text-xl text-center text-slate-50">
                    Forgot password?
                </h2>
                <p className='text-sm w-full text-slate-200 italic text-center'>
                    No worries! We'll send you reset instructions.
                </p>
                <div className="mt-5 w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email" className='text-slate-50'>Email Address</Label>
                            <Input id="email" Icon={<MdOutlineAlternateEmail size={20}/>}
                                   placeholder="example@gmail.com"
                                   type="email" className='text-slate-50 bg-slate-900 placeholder:text-slate-400'
                                   {...register("email")}/>
                        </LabelInputContainer>
                        <button
                            className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                            type="submit"
                        >
                            Reset Password
                            <MdOutlineLockReset size={20}/>
                        </button>
                    </form>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-6 text-sm">
                    <span className="text-slate-400 flex justify-center items-center"><MdArrowBack
                        size={20}/>Return to &nbsp;</span>
                    <Link href="/candidate/signin"
                          className="text-slate-300 dark:text-zinc-900 font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </>
    )
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