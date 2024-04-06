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

    const [searchedData, setSearchedData] = React.useState(null);
    const handleSearch = (data) => {
        setSearchedData(data);
    }
    return (
        <>
            <CandidateHeroSection handleSearch={handleSearch}/>
        </>

    );
}

export default Page;