'use client'
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="w-full bg-slate-50 flex justify-center items-center p-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <Link href={"/Logo"}>
                    <Image src={'/Logo.svg'} height={90} width={90} alt="CareerSync"/>
                </Link>
            </div>
            <hr className="my-8 border-blue-gray-50" />
            <Typography color="blue-gray" className="text-center font-normal">
                &copy; 2024 CareerSync. All rights reserved.
            </Typography>
        </footer>
    );
}