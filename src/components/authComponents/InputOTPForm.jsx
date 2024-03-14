"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

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
import React from "react";
import Link from "next/link";
import { MdArrowBack, MdSecurity, MdOutlineSecurityUpdateGood } from "react-icons/md";
import Image from "next/image";


const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export default function InputOTPForm({otpFor}) {
    const [verified, setVerified] = React.useState(false)
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    function onSubmit(data) {
        if(otpFor === 'Candidate'){
            data.pin === '123456' ? setVerified(true) : console.log('Invalid OTP')
        }
        else {

        }
    }

    return (
        <div
            className="max-w-md w-full h-auto flex flex-col justify-center items-center gap-2 mx-auto rounded-none md:rounded-2xl p-4">
            {verified ? <Image src='/verified.gif' alt={'Verified'} width={120} height={120} /> : <>
                <span className='text-slate-50'><MdSecurity size={40}/></span>
                <h2 className="font-bold w-full text-xl text-center text-slate-50">
                    Confirm log in with OTP.
                </h2>
                <p className='text-sm w-full text-slate-200 italic text-center'>
                    We have sent a one-time password (OTP) to your verified email address. Please enter it below.
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="w-2/3 gap-5 flex flex-col justify-center items-center text-slate-50">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            className={'dark'}
                                            render={({slots}) => (
                                                <InputOTPGroup>
                                                    {slots.map((slot, index) => (
                                                        <InputOTPSlot className='border-slate-400 rounded-md border' key={index} {...slot} />
                                                    ))}{" "}
                                                </InputOTPGroup>
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <button
                            className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                            type="submit"
                        >
                            Verify OTP
                            <MdOutlineSecurityUpdateGood size={20}/>
                        </button>
                    </form>
                </Form>
            </>}
                <div className="flex flex-col sm:flex-row justify-end items-center mt-6 text-sm">
                    <span className="text-slate-400 flex justify-center items-center"><MdArrowBack size={20}/>Return to &nbsp;</span>
                    <Link href="/candidate/signin"
                          className="text-slate-300 dark:text-zinc-900 font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
        </div>
    )
}
