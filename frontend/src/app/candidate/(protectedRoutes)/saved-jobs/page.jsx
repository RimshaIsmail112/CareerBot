'use client'
import React, { useEffect, useState } from 'react';
import {cn, HOST} from "@/lib/utils";
import { ImSpinner2 } from "react-icons/im";
import { JobCard } from "@/components/ui/bento-grid";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function Page(props) {
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsData, setJobsData] = useState(null);
    const candidateId = '6613fe12c67946b9213620d6';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${HOST}/candidate/bookmarks/${candidateId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJobsData(data);
            } catch (error) {
                console.error('Error fetching saved jobs:', error);
            }
        };
        fetchData();
    }, []);

    const next = () => {
        if (active === 5) return;
        setActive(active + 1);
        setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        setCurrentPage(currentPage - 1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = jobsData?.slice(startIndex, endIndex) || [];

    return (
        <div className={'flex flex-col p-8 gap-3 justify-center lg:justify-normal items-center lg:items-start'}>
            <h2 className={cn('text-3xl font-bold text-slate-50 dark:text-neutral-100', 'mt-10 mb-4')}>
                All Saved Jobs
            </h2>
            {!currentData ? <ImSpinner2 size={30} className="animate-spin w-full text-slate-50"/> : currentData.map((jobItem, index) => (
                <div className="p-1" key={jobItem.job_id}>
                    <JobCard
                        key={jobItem.job_id}
                        saved={true}
                        title={jobItem.job_title}
                        description={jobItem.job_description}
                        city={jobItem.job_city}
                        state={jobItem.job_state}
                        country={jobItem.job_country}
                        requiredSkills={jobItem.job_required_skills?.slice(0, 5) || []}
                        applyLink={jobItem.job_apply_link}
                        employerLogo={jobItem.employer_logo}
                        employerName={jobItem.employer_name}
                        employmentType={jobItem.job_employment_type?.toLowerCase()}
                        isRemote={jobItem.job_is_remote}
                        isDirect={jobItem.job_apply_is_direct}
                        publisher={jobItem.job_publisher}
                        qualification={jobItem.job_highlights.Qualifications}
                        responsiblity={jobItem.job_highlights.Responsibilities}
                        salary={{
                            min: jobItem.job_min_salary,
                            max: jobItem.job_max_salary,
                            currency: jobItem.job_salary_currency,
                            period: jobItem.job_salary_period,
                        }}
                        postedAt={jobItem.job_posted_at_datetime_utc}
                    />
                </div>
            ))}
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <Button
                    variant="text"
                    className="items-center justify-center gap-2 active:bg-slate-400 flex bg-slate-50 hover:bg-slate-200 text-slate-950  bg-opacity-100"
                    onClick={prev}
                    disabled={currentPage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/> Previous
                </Button>
                <div className="flex items-center gap-2">
                    <IconButton
                        className={'items-center justify-center gap-2 active:bg-slate-400 flex bg-slate-50 hover:bg-slate-200 text-slate-950  font-bold bg-opacity-100'}
                        variant={'filled'}>
                        {currentPage}
                    </IconButton>
                </div>
                <Button
                    variant="text"
                    className="items-center justify-center gap-2 hover:bg-slate-200 active:bg-slate-400 flex bg-slate-50 text-slate-950 bg-opacity-100"
                    onClick={next}
                    disabled={currentPage === Math.ceil(jobsData?.length / itemsPerPage)}
                >
                    Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    );
}

export default Page;