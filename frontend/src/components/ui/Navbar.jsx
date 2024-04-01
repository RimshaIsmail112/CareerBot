'use client'
import React from "react";
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
                        className="border border-gray-900 p-0.5"
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
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {icon}
                            {/*{React.createElement(icon, {*/}
                            {/*    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,*/}
                            {/*    strokeWidth: 2,*/}
                            {/*})}*/}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}



function NavList({navListItems}) {
    return (
        <ul className="mt-2 mb-4 flex flex-col justify-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-center">
            {navListItems && navListItems.map(({label, icon, href}, key) => (
                <Link
                    href={href}
                    key={href}
                    className="font-medium text-blue-gray-500"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {/*{React.createElement(icon, {className: "h-[18px] w-[18px]"})}{" "}*/}
                        {icon}
                        <span className="text-gray-900"> {label}</span>
                    </MenuItem>
                </Link>
            ))}
        </ul>
    );
}

export default function ComplexNavbar({navListItems, profileMenuItems}) {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <Navbar className="w-screen-xl p-2 lg:pl-6 shadow-none">
            <div className="relative flex items-center justify-between text-blue-gray-900">
                <Link href={"/Logo"}>
                    <Image src={'/Logo.svg'} height={90} width={90} alt="CareerSync"/>
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
                <ProfileMenu profileMenuItems={profileMenuItems}/>
            </div>
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <NavList/>
            </MobileNav>
        </Navbar>
    );
}