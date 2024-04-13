'use client'
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/Context/Candidate_Employer_Data';
import Image from 'next/image';
import Link from 'next/link';
import Metric from "@/components/ui/Metric";
import {Badge} from "@/components/ui/badge";

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
                                    className="object-cover rounded-full"
                                    height={100}
                                    width={100}
                                    src={candidate.profilePictureUrl}
                                    alt={candidate.fullName}
                                />
                            )}
                        </div>
                        <p className="text-center text-slate-950 font-bold">{candidate.profession}</p>
                        <div className="divide-y divide-gray-200">
                            <div className="flex-between mt-6 w-full flex-wrap gap-3">
                                <div
                                    className="flex flex-col md:flex-row items-center gap-3 max-sm:flex-wrap justify-center">
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
                                    <h3 className="text-lg font-bold">Education</h3>
                                    <ul className="list-disc list-inside text-slate-950">
                                        {candidate.education.map((education, index) => (
                                            <li key={index}>
                                                <p>{education.degree}</p>
                                                <p>{education.universityName}</p>
                                                <p>{education.location}</p>
                                                <p>{education.duration}</p>
                                                <p>{education.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {candidate.workExperiences && (
                                <div className="py-4">
                                    <h3 className="text-lg font-bold">Work Experiences</h3>
                                    <ul className="list-disc list-inside text-slate-950">
                                        {candidate.workExperiences.map((experience, index) => (
                                            <li key={index}>
                                                <p>{experience.title}</p>
                                                <p>{experience.companyName}</p>
                                                <p>{experience.location}</p>
                                                <p>{experience.duration}</p>
                                                <p>{experience.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {candidate.skills && (
                                <div className="py-4">
                                    <h3 className="text-lg font-bold">Skills</h3>
                                    <div className="flex justify-center items-center gap-2 text-slate-950 flex-wrap">
                                        {candidate.skills.map((skill, index) => (
                                            <Badge key={index} className="bg-slate-950 text-slate-50 font-semibold py-1 px-2 rounded-lg ">{skill}</Badge>
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
