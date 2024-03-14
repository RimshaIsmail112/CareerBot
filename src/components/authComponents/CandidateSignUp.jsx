"use client";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import {MdLock, MdOutlineAlternateEmail} from "react-icons/md";
import {BsGithub} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import Link from "next/link";
import {PiSignInBold} from "react-icons/pi";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import {useForm} from "react-hook-form"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {TiWarning} from "react-icons/ti";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";


export default function CandidateSignUp() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = (data) => {
        fetch("http://localhost:3000/candidate/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setShowAlert(true);
                    setAlertMessage(data.error);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 4000);
                } else {
                    router.push("/");
                }
            })
            .catch((error) => console.log(error));

    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
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
                className="max-w-md w-full flex flex-col justify-center items-center mx-auto rounded-none md:rounded-2xl p-4">
                <h2 className="font-bold w-full text-xl text-slate-50">
                    Welcome to CareerSync
                </h2>
                <p className='text-sm w-full text-slate-200 italic'>
                    "Today unlock your dream opportunities and discover tailored career paths."
                </p>
                <div className="mt-8 w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-5  mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstname" className='text-slate-50'>First name</Label>
                                <Input id="firstname" placeholder="Abubakar" type="text"
                                       className='text-slate-50 bg-slate-900 placeholder:text-slate-400'
                                       {...register("firstName")}/>
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastname" className='text-slate-50'>Last name</Label>
                                <Input id="lastname" placeholder="Siddique" type="text"
                                       className='text-slate-50 bg-slate-900 placeholder:text-slate-400'
                                       {...register("lastName")}/>
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email" className='text-slate-50'>Email Address</Label>
                            <Input id="email" Icon={<MdOutlineAlternateEmail size={20}/>}
                                   placeholder="example@gmail.com"
                                   type="email" className='text-slate-50 bg-slate-900 placeholder:text-slate-400'
                                   {...register("email")}/>
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password" className='text-slate-50'>Password</Label>
                            <Input Icon={<MdLock size={20}/>} finalIcon={
                                showPassword
                                    ? <IoMdEyeOff size={20} onClick={toggleShowPassword} className='cursor-pointer'/>
                                    : <IoMdEye size={20} onClick={toggleShowPassword} className='cursor-pointer'/>
                            } id="password" placeholder="••••••••" type={showPassword ? "text" : "password"}
                                   className='text-slate-50 bg-slate-900 placeholder:text-slate-400'
                                   {...register("password")}/>
                        </LabelInputContainer>
                        <button
                            className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                            type="submit"
                        >
                            Sign Up
                            <PiSignInBold size={20}/>
                        </button>
                    </form>
                    <div
                        className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                        <button
                            className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                            onClick={async () => await signIn("github", {callbackUrl: "http://localhost:3001/"})}
                        >
                            <BsGithub size={20}/>
                            Github
                        </button>
                        <span className="text-slate-400">or</span>
                        <button
                            className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                            onClick={async () => await signIn("google", {callbackUrl: "http://localhost:3001/"})}
                        >
                            <FcGoogle size={20}/>
                            Google
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center mt-4 text-sm">
                        <span className="text-slate-400">Already have an account? </span>
                        <Link href="/candidate/signin"
                              className="text-slate-300 dark:text-zinc-900 font-medium hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"/>
        </>
    );
};

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
