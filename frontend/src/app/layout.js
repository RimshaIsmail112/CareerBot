"use client";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/lib/AuthProvider";
import React from "react";
import CandidateEmployerData from "@/Context/Candidate_Employer_Data";
import { MobileDrawer } from "@/components/ui/MobileDrawer";
import { usePathname } from "next/navigation";
import { FaBookmark, FaBriefcase, FaUserTie } from "react-icons/fa";
import dotenv from "dotenv";
import { MdAssessment } from "react-icons/md";
import Head from "next/head";
import { EmployerProvider } from "@/Context/Employer_Context";
dotenv.config();

const notoSans = Noto_Sans({ subsets: ["latin"] });

const metadata = {
  title: "CareerBot",
  description: "Unlocking Career Success with AI",
};
const candidateNavItems = [
  {
    label: "Find Jobs",
    href: "/candidate/jobs",
    icon: <FaUserTie size={18} />,
  },
  {
    label: "My Portfolio",
    href: "/portfolio",
    icon: <FaBriefcase size={18} />,
  },
  {
    label: "Saved Jobs",
    href: "/saved-jobs",
    icon: <FaBookmark size={18} />,
  },
  {
    label: "Self Assessment",
    href: "https://careersync-self-assessment.vercel.app/",
    icon: <MdAssessment size={18} />,
  },
];

const employerNavItems = [
  {
    label: "Find Candidates",
    href: "/employer/dashboard/search-candidates",
    icon: <FaUserTie size={18} />,
  },
  {
    label: "Interview History",
    href: "/employer/InterviewHistory",
    icon: <FaBriefcase size={18} />,
  },
  {
    label: "Saved Candidates",
    href: "/employer/saved-candidates",
    icon: <FaBookmark size={18} />,
  },
];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html className="scroll-smooth" lang="en">
    <Head>
        <title>CareerBot</title>
        <meta name="description" content="Unlocking Career Success with AI" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <body className={`${notoSans.className} bg-slate-900`}>
      <EmployerProvider>
        <CandidateEmployerData>
          <AuthProvider>
            <MobileDrawer
              navItems={
                pathname.includes("candidate")
                  ? candidateNavItems
                  : employerNavItems
              }
            />
            {children}
          </AuthProvider>
        </CandidateEmployerData>
        </EmployerProvider>
      </body>
    </html>
  );
}
