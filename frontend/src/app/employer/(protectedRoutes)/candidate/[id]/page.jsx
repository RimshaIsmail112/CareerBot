'use client'
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/Context/Candidate_Employer_Data';
import Image from 'next/image';
import Link from 'next/link';
import Metric from "@/components/ui/Metric";
import {Badge} from "@/components/ui/badge";
import { FaUniversity } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";




function Page({ params }) {
    const [candidate, setCandidate] = useState(null);
    const { candidateCardData } = useAppContext();

    useEffect(() => {
        async function fetchJobs() {
            const fetchCandidate = await candidateCardData.find((candidate) => candidate._id === decodeURIComponent(params.id));
            setCandidate(fetchCandidate);
            console.log(fetchCandidate)
        }

        fetchJobs();
    }, []);


    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-8 lg:px-12">
            <div className="w-full space-y-8 bg-slate-50 p-8 rounded-lg shadow-lg">
                {candidate && (
                    <>
                        <h2 className="text-center text-3xl font-bold text-slate-950">{candidate.fullName}</h2>
                        <div className="flex items-center justify-center">
                            {candidate.profilePictureUrl && (
                                <Image
                                    className="object-cover rounded-full border border-slate-950 p-2"
                                    height={150}
                                    width={150}
                                    src={candidate.profilePictureUrl}
                                    alt={candidate.fullName}
                                />
                            )}
                        </div>
                        <p className="text-center text-slate-950 font-bold">{candidate.profession}</p>
                        <div className="divide-y divide-gray-200">
                            <div className="flex-between mt-6 w-full flex-wrap gap-3">
                                <div
                                    className="flex flex-col md:flex-row items-center gap-3 max-sm:flex-wrap justify-center mb-5">
                                    {<Metric
                                        imgUrl="/resume.svg"
                                        alt="briefcase"
                                        value={'Resume'}
                                        textStyles="small-medium text-light-500"
                                        className="w-full md:w-auto"
                                    />}
                                    {<Metric
                                        imgUrl="/portfolio.svg"
                                        alt="people"
                                        value={"Portfolio"}
                                        textStyles="small-medium text-light-500"
                                        className="w-full md:w-auto"
                                    />}
                                </div>
                            </div>

                            {candidate.education && (
                                <div className="py-4">
                                    <h1 className="text-2xl font-bold text-center md:text-left">Education</h1>
                                    <div className="text-slate-950">
                                        {candidate.education.map((education, index) => (
                                            <div className='flex gap-1 flex-col mt-4 border-l-8 pl-3 rounded-md border-slate-950' key={index}>
                                                <p>{education.degree}</p>
                                                <p className='flex flex-col md:flex-row gap-3 justify-between'>
                                                    <span className='font-bold flex gap-1'><FaUniversity size={20}/>{education.universityName}</span>
                                                    <span className='flex gap-1'><SlCalender size={20}/>{education.duration}</span>
                                                    <span className='flex gap-1'><FaLocationDot size={20}/>{education.location}</span>
                                                </p>
                                                <p>{education.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {candidate.workExperiences && (
                                <div className="py-4">
                                    <h3 className="text-2xl font-bold text-center md:text-left">Work Experiences</h3>
                                    <div className="text-slate-950">
                                        {candidate.workExperiences.map((experience, index) => (
                                            <div className='flex gap-1 flex-col mt-4 border-l-8 pl-3 rounded-md border-slate-950'
                                                 key={index}>
                                                <p>{experience.title}</p>
                                                <p className='flex flex-col md:flex-row gap-3 justify-between'>
                                                    <span className='font-bold flex gap-1'><FaUniversity
                                                        size={20}/>{experience.companyName}</span>
                                                    <span className='flex gap-1'><SlCalender
                                                        size={20}/>{experience.duration}</span>
                                                    <span className='flex gap-1'><FaLocationDot
                                                        size={20}/>{experience.location}</span>
                                                </p>
                                                <p>{experience.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {candidate.skills && (
                                <div className="py-4">
                                    <h3 className="text-2xl font-bold text-center md:text-left">Skills</h3>
                                    <div className="flex justify-center items-center gap-2 text-slate-950 flex-wrap mt-4">
                                        {candidate.skills.map((skill, index) => (
                                            <Badge key={index}
                                                   className="bg-slate-950 text-slate-50 font-semibold py-1 px-2 rounded-lg ">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Page;
