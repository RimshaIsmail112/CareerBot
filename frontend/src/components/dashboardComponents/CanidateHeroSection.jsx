"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { usePathname, useRouter } from "next/navigation";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WavyBackground } from "@/components/ui/wavy-background";
import { ImageBackground } from "@/components/ui/ImageBackground";

const socket = io("http://localhost:3001");

const CandidateHeroSection = () => {
  const [search, setSearch] = useState(null);
  const [location, setLocation] = useState("");
  const [datePosted, setDatePosted] = useState(null);
  const [employmentType, setEmploymentType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    socket.on("notify", (msg) => {
      toast.info(msg);
    });

    return () => {
      socket.off("notify");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search && !location && !datePosted && !employmentType) return;
    setIsLoading(true);
    if (path.includes("candidate/dashboard")) {
      await router.push(
        `/candidate/dashboard/search-jobs?search=${search ?? "developer"}&location=${location}&datePosted=${datePosted ?? "month"}&employmentType=${employmentType ?? "FULLTIME"}`
      );
    } else {
      await router.push(
        `/employer/dashboard/search-candidates?search=${search}&location=${location}`
      );
    }
    setIsLoading(false);
  };

  return (
    <div>
      <ImageBackground
  imageUrl="https://img.freepik.com/free-photo/company-representatives-reading-applicant-resume-hiring_1163-4684.jpg"
  height={300}
  blur={4}
  className="text-white text-center py-20"
>
        {(path.includes("candidate/dashboard") || path.includes("candidate/dashboard/search-jobs")) ? (
          <>
  <h1
    className={`md:text-5xl leading-tight ${
      path.includes("search-jobs") ? "hidden" : ""
    } text-3xl text-center text-gray-800 font-extrabold mb-4`}
  >
    Find the <span className="text-indigo-600">Perfect Job</span>{" "}
    <br className="hidden md:block" /> You Deserve
  </h1>
  <p
    className={`${
      path.includes("search-jobs") ? "hidden" : ""
    } text-gray-600 text-base md:text-lg text-center`}
  >
    Over <span className="font-semibold text-indigo-500">1,850,750</span> jobs listed — your dream opportunity is just a click away!
  </p>
</>


        ) : (
          <>
  <h1
    className={`md:text-5xl leading-tight ${
      path.includes("search-jobs") ? "hidden" : ""
    } text-3xl text-center text-gray-800 font-extrabold mb-4`}
  >
    Find Your <span className="text-indigo-600">Perfect Candidate</span>{" "}
    <br className="hidden md:block" /> Today!
  </h1>
  <p
    className={`${
      path.includes("search-jobs") ? "hidden" : ""
    } text-gray-600 text-base md:text-lg text-center`}
  >
    <span className="font-semibold text-indigo-500">1,850,750</span> profiles available! Your ideal hire is just a click away!
  </p>
</>

        )}
{!path.includes("employer/dashboard") && (
        <div className="w-full max-w-[800px] m-auto bg-white shadow-md border border-gray-200 md:rounded-full rounded-md md:h-12 h-auto md:py-0 py-2 px-3 mt-6">
  <form className="flex md:flex-row flex-col justify-between items-center h-full gap-2">
    <div className="flex w-full items-center gap-2 md:mb-0 mb-3 md:border-none border-b border-gray-200 md:pb-0 pb-1 flex-1">
      <AiOutlineSearch className="text-base text-slate-500" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Job title or keyword"
        className="outline-0 h-8 px-2 w-full text-slate-950 placeholder:text-slate-400 text-sm"
      />
    </div>
    
    <div className="flex w-full items-center gap-2 md:mb-0 mb-3 md:border-none border-b border-gray-200 md:pb-0 pb-1 flex-1">
      <FaLocationDot className="text-base text-slate-500" />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="outline-0 h-8 px-2 w-full placeholder:text-slate-500 text-slate-900 text-sm"
      />
    </div>

    <div className="flex w-full items-center gap-2 md:mb-0 mb-3 md:border-none border-b border-gray-200 md:pb-0 pb-1 flex-1">
  <select
    value={datePosted}
    onChange={(e) => setDatePosted(e.target.value)}
    className="appearance-none outline-none border-none h-8 px-2 w-full text-slate-900 text-sm bg-transparent placeholder:text-slate-400"
  >
    <option value="">Date Posted</option>
    <option value="all">All</option>
    <option value="today">Today</option>
    <option value="3days">Last 3 Days</option>
    <option value="week">This Week</option>
    <option value="month">This Month</option>
  </select>
</div>
    <div className="flex w-full items-center gap-2 md:mb-0 mb-3 md:border-none border-b border-gray-200 md:pb-0 pb-1 flex-1">
  <select
    value={employmentType}
    onChange={(e) => setEmploymentType(e.target.value)}
    className="appearance-none outline-none border-none h-8 px-2 w-full text-slate-900 text-sm bg-transparent placeholder:text-slate-400"
  >
    <option value="">Employment Type</option>
    <option value="FULLTIME">Full-Time</option>
    <option value="CONTRACTOR">Contractor</option>
    <option value="PARTTIME">Part-Time</option>
    <option value="INTERN">Intern</option>
  </select>
</div>


    <button
      className="bg-slate-900 text-sm w-full md:w-auto px-4 py-1.5 flex justify-center items-center gap-1 text-white rounded-full h-8 font-medium transition duration-300 disabled:bg-slate-700 disabled:text-slate-300 hover:bg-slate-50 hover:border hover:border-slate-950 hover:text-slate-950"
      onClick={handleSubmit}
      disabled={isLoading}
    >
      {isLoading ? (
        <ImSpinner2 className="w-4 h-4 animate-spin" />
      ) : (
        "Search"
      )}
    </button>
  </form>
</div>
)}
      </ImageBackground>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CandidateHeroSection;
