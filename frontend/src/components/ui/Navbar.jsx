'use client'
import React, {useEffect} from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import {MobileDrawer} from "@/components/ui/MobileDrawer";
import {useAppContext} from "@/Context/Candidate_Employer_Data";
import {usePathname} from "next/navigation";
import { Badge } from "@material-tailwind/react";
import { FaBell } from "react-icons/fa";



function ProfileMenu({profileMenuItems}) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>

                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-slate-950 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems && profileMenuItems.map(({label, icon}, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center p-0 bg-opacity-100 text-slate-950 gap-2 rounded "hover:bg-slate-950 focus:bg-slate-950 active:bg-slate-800 hover:text-slate-50" ${
                                isLastItem
                                    ? "hover:bg-red-900 p-0 bg-opacity-100 text-slate-950 focus:bg-red-500-300 active:bg-red-400 hover:text-red-50"
                                    : ""
                            }`}
                        >
                            <div className={'flex gap-1 p-2 text-slate-950 hover:text-slate-50 w-full'}>
                                {icon}
                                {label}
                            </div>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}


function NavList({navListItems}) {
    const path = usePathname();

    return (
        <ul className="mt-2 mb-4 flex flex-col justify-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-center">
            {navListItems && navListItems.map(({label, icon, href}, key) => (
                <Link
                    href={href}
                    key={href}
                    className="font-medium text-slate-950"
                >
                    <MenuItem
                        className={`flex items-center gap-2 ${path.includes(href) ? 'bg-slate-950 text-slate-50 bg-opacity-100' : ''} hover:bg-slate-950 hover:bg-opacity-100 hover:text-slate-50 lg:rounded-full`}>
                        {icon}
                        <span> {label}</span>
                    </MenuItem>
                </Link>
            ))}
        </ul>
    );
}

export default function ComplexNavbar({navListItems, profileMenuItems}) {

    const {setDrawerOpen} = useAppContext();

    function toggleIsNavOpen() {
        setDrawerOpen(true)
    }

    return (
        <div className={'w-screen-xl p-5'}>
            <Navbar className="border-none p-2 px-8 bg-opacity-100 rounded-full shadow-2xl shadow-black bg-slate-50">
                <div className="relative flex items-center justify-between text-slate-950">
                    <Link href={"/"}>
                        <Image src={'/Logo.svg'} height={50} width={50} alt="CareerSync"/>
                    </Link>
                    <div className="hidden lg:flex lg:justify-center lg:items-center">
                        <NavList navListItems={navListItems}/>
                    </div>
                    <IconButton
                        size="sm"
                        color="blue-gray"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-auto mr-2 lg:hidden"
                    >
                        <Bars2Icon className="h-6 w-6"/>
                    </IconButton>
                    <div className={'flex justify-center gap-6 items-center'}>
                        <Badge content="5">
                            <FaBell size={25} className={'text-slate-950'}/>
                        </Badge>
                        <ProfileMenu profileMenuItems={profileMenuItems}/>
                    </div>
                </div>
            </Navbar>
        </div>
    );
}