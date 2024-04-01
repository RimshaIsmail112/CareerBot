import React from 'react';
import ComplexNavbar from "@/components/ui/Navbar";
import {
    CodeBracketSquareIcon,
    CubeTransparentIcon,
    LifebuoyIcon,
    PowerIcon,
    UserCircleIcon
} from "@heroicons/react/24/solid";
import {CgProfile} from "react-icons/cg";
import {FiHelpCircle} from "react-icons/fi";
import {FaBookmark, FaBriefcase, FaSignOutAlt, FaUserTie} from "react-icons/fa";

function Page(props) {
    const profileMenuItems = [
        {
            label: "My Profile",
            icon: <CgProfile size={18}/>
        },
        {
            label: "Help",
            icon: <FiHelpCircle size={18}/>,
        },
        {
            label: "Sign Out",
            icon: <FaSignOutAlt size={18}/>,
        },
    ];
    const navListItems = [
        {
            label: "Find Jobs",
            href: "/candidate/jobs",
            icon: <FaUserTie size={18}/>

        },
        {
            label: "My Portfolio",
            href: "/portfolio",
            icon: <FaBriefcase size={18}/>,
        },
        {
            label: "Saved Jobs",
            href: "/saved-jobs",
            icon: <FaBookmark size={18}/>,
        },
    ];
    return (
        <ComplexNavbar navListItems={navListItems} profileMenuItems={profileMenuItems}/>
    );
}

export default Page;