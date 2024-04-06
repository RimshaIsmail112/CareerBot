'use client'

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
import CandidateHeroSection from "@/components/dashboardComponents/CanidateHeroSection";
import {Footer} from "@/components/ui/Footer";

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
            label: "Find Candidates",
            href: "/candidate/jobs",
            icon: <FaUserTie size={18}/>

        },
        {
            label: "Interview History",
            href: "/portfolio",
            icon: <FaBriefcase size={18}/>,
        },
        {
            label: "Saved Candidates",
            href: "/saved-jobs",
            icon: <FaBookmark size={18}/>,
        },
    ];
    const [searchedData, setSearchedData] = React.useState(null);
    const handleSearch = (data) => {
        setSearchedData(data);
    }
    return (
        <>
            <ComplexNavbar navListItems={navListItems} profileMenuItems={profileMenuItems}/>
            <CandidateHeroSection handleSearch={handleSearch}/>
            <Footer/>
        </>

    );
}

export default Page;