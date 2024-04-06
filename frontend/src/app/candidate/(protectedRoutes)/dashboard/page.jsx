'use client'
import React from 'react';
import ComplexNavbar from "@/components/ui/Navbar";
import { CgProfile } from "react-icons/cg";
import { FiHelpCircle } from "react-icons/fi";
import { FaSignOutAlt, FaUserTie, FaBriefcase, FaBookmark } from "react-icons/fa";
import CandidateHeroSection from "@/components/dashboardComponents/CanidateHeroSection";
import JobsSection from "@/components/dashboardComponents/JobsSection";
import {Footer} from "@/components/ui/Footer";


function Page(props) {
    const profileMenuItems = [
        {
            label: "My Profile",
            icon: <CgProfile size={18}/>,
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
    const [searchedData, setSearchedData] = React.useState(null);
    const handleSearch = (data) => {
        setSearchedData(data);
    }
    return (
        <>
            <ComplexNavbar profileMenuItems={profileMenuItems} navListItems={navListItems}/>
            <CandidateHeroSection handleSearch={handleSearch}/>
            <JobsSection searchedData={searchedData}/>
            <Footer/>
        </>
    );
}

export default Page;