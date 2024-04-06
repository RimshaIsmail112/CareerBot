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
    const [searchedData, setSearchedData] = React.useState(null);
    const handleSearch = (data) => {
        setSearchedData(data);
    }
    return (
        <>
            <CandidateHeroSection handleSearch={handleSearch}/>
            <JobsSection searchedData={searchedData}/>
        </>
    );
}

export default Page;