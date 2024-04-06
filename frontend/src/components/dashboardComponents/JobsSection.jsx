'use client'
import {cn} from "@/lib/utils";
import React, {useEffect} from "react";
import {JobCard} from "../ui/bento-grid";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {displayContent} from "next/dist/client/dev/fouc";
import {JobsFilter} from "@/components/dashboardComponents/JobsFilter";
import {ImSpinner2} from "react-icons/im";
import {searchJobs} from "@/lib/JobSearch";
import {jobs} from "@/lib/dummyData";

export default function JobsSection({searchedData}) {
    const [recommendedJobs, setRecommendedJobs] = React.useState(null);
    const [allJobs, setAllJobs] = React.useState(null);
    const [active, setActive] = React.useState(1);
    const [itemsPerPage] = React.useState(6);
    const [currentPage, setCurrentPage] = React.useState(1);

    const next = () => {
        if (active === 5) return;
        setActive(active + 1);
        setCurrentPage(currentPage + 1);
    };
    const numberButtonHandler = (index) => {
        setActive(index);
        setCurrentPage(index);
    }

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        setCurrentPage(currentPage - 1);
    };

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = searchedData ? searchedData.slice(startIndex, endIndex) : allJobs ? allJobs.slice(startIndex, endIndex) : [];


    const querySearch= ['javascript'];
    const location = 'Lahore';
    useEffect(() => {
        searchJobs(querySearch, location,1, 1).then(data => {
            data && setRecommendedJobs(data);

        });
        searchJobs(querySearch, location,1, 1).then(data => {
            data && setAllJobs(data);
        });

    }, []);
    useEffect(() => {
        if (searchedData) {
            setAllJobs(searchedData);
        }
    }, [searchedData]);

    const handleFilterChange = (filterOptions) => {
        console.log(filterOptions);
        const filtered = (searchedData || allJobs).filter((job) => {
            return (
                (filterOptions.showFullTime && job.job_employment_type.toLowerCase() === "fulltime") ||
                (filterOptions.showPartTime && job.job_employment_type.toLowerCase() === "parttime") ||
                (filterOptions.showContract && job.job_employment_type.toLowerCase() === "contractor") ||
                (filterOptions.showInternship && job.job_employment_type.toLowerCase() === "intern") ||
                (filterOptions.showRemote && job.job_is_remote) ||
                (filterOptions.showOnSite && !job.job_is_remote)
            );
        });

        console.log(filtered)
        filtered.length === 0 ? setAllJobs(jobs.data) : setAllJobs(filtered);
    };

    return (
        <div className={'w-screen px-8 md:px-12 lg:px-16'}>
            <div className={'flex flex-col gap-3 justify-center lg:justify-normal items-center lg:items-start'}>
                <h2 className={cn('text-3xl font-bold text-slate-50 dark:text-neutral-100', 'mt-10 mb-4')}>Recommended
                    Jobs
                </h2>
                        {!recommendedJobs ? <ImSpinner2 size={30} className="animate-spin w-full text-slate-50"/> : recommendedJobs.map((jobItem, index) => (
                                <div className="p-1">
                                    <JobCard
                                        key={jobItem.job_id}
                                        saved={false}
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
            </div>

            <div className={'flex flex-col gap-3 justify-center items-center'}>
                <div className={'flex flex-col lg:flex-row gap-5 md:justify-between w-full items-center mt-8'}>
                    <h2 className={'text-3xl font-bold text-slate-50 dark:text-neutral-100'}>All
                        Jobs
                    </h2>
                    <JobsFilter onChangeFilter={handleFilterChange}/>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-5 items-center">
                        {!allJobs && !searchedData ? <ImSpinner2 size={30} className="animate-spin w-full text-slate-50"/> : currentData.map((jobItem, i) => (
                            <JobCard
                                key={jobItem.job_id}
                                title={jobItem.job_title}
                                saved={false}
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
                        ))}
                    </div>
                </div>
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
                            <IconButton className={'items-center justify-center gap-2 active:bg-slate-400 flex bg-slate-50 hover:bg-slate-200 text-slate-950  font-bold bg-opacity-100'} variant={'filled'}>
                                {currentPage}
                            </IconButton>
                    </div>
                    <Button
                        variant="text"
                        className="items-center justify-center gap-2 hover:bg-slate-200 active:bg-slate-400 flex bg-slate-50 text-slate-950 bg-opacity-100"
                        onClick={next}
                        disabled={currentPage === Math.ceil(searchedData ? searchedData.length / itemsPerPage : allJobs ? allJobs.length / itemsPerPage : 1)}
                    >
                        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}


