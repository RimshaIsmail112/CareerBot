import {cn, HOST} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


import {Badge} from "@/components/ui/badge";
import Metric from "@/components/ui/Metric";
import JobBadge from "@/components/ui/JobBadge";
import {FaRegBookmark, FaBookmark} from "react-icons/fa";


import {
    employmentTypeConverter,
    getFormattedSalary,
    getTimestamp,
    isValidImage,
} from "@/lib/utils";
import {getLogo, logoPlaceholders} from "@/lib/CompanyLogo";
import {useEffect, useState} from "react";

export const JobCard = ({
                            jobId,
                            title,
                            saved,
                            description,
                            employerWebsite,
                            employerCompanyType,
                            apply_options,
                            jobRequiredEducation,
                            city,
                            state,
                            country,
                            requiredSkills,
                            applyLink,
                            employerLogo,
                            employerName,
                            employmentType,
                            isRemote,
                            isDirect,
                            publisher,
                            qualification,
                            responsiblity,
                            salary,
                            postedAt,
                            className,

                        }) => {


    const location = `${city ? `${city}${state ? ", " : ""}` : ""}${state || ""}${
        city && state && country ? ", " : ""
    }${country || ""}`;
    const [isBookmarked, setIsBookmarked] = useState(saved);

    const handleJobBookMark = async () => {
        try {
            const updatedBookmarkStatus = !isBookmarked;
            setIsBookmarked(updatedBookmarkStatus);

            // Make a request to the backend to update the bookmark status
            const response = await fetch(`${HOST}/candidate/bookmarks/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    candidateId: "6613fe12c67946b9213620d6", // Replace with the actual candidate id
                    jobId,
                    title,
                    saved,
                    description,
                    employerWebsite,
                    employerCompanyType,
                    apply_options,
                    jobRequiredEducation,
                    city,
                    state,
                    country,
                    requiredSkills,
                    applyLink,
                    employerLogo,
                    employerName,
                    employmentType,
                    isRemote,
                    isDirect,
                    publisher,
                    job_highlights: {Qualifications:qualification, Responsibilities:responsiblity},
                    min: salary.min,
                    max: salary.max,
                    currency: salary.currency,
                    period: salary.period,
                    postedAt,
                    isBookmarked: updatedBookmarkStatus,
                }),
            });

            if (!response.ok) {
                // Handle error response from the server
                // You may want to revert the state change here if the request fails
                setIsBookmarked(!updatedBookmarkStatus);
                throw new Error('Failed to update bookmark status');
            }

            const data = await response.json();
            console.log(data); // You can handle success response if needed
        } catch (error) {
            console.error(error);
            // Handle any errors occurred during the process
        }
    };


    return (
        <div
            className="card-wrapper bg-slate-50 cursor-pointer rounded-xl shadow-black shadow-lg hover:shadow-xl transition duration-200 p-6 flex flex-col gap-3">
            <div className="self-end">
                <div className="flex justify-center items-center gap-2">
                    <JobBadge data={{location, country}} isLocation/>
                    {isBookmarked ? <FaBookmark onClick={handleJobBookMark} size={20}/> :
                        <FaRegBookmark onClick={handleJobBookMark} size={20}/>}
                </div>
            </div>
            <Link href={`/candidate/job/${jobId}`}>
                <div className="flex flex-row gap-4">
                    <div className="hidden sm:block">
                        {employerLogo ? (
                            <JobBadge className={'w-20 h-20'} data={{logo: employerLogo}}/>

                        ) : (
                            <div className="w-20 h-20 bg-slate-950 flex items-center justify-center">
                                    <span
                                        className="text-slate-50 text-2xl">{employerName.slice(0, 2).toUpperCase()}</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                            <div className="flex-1">
                                {employerLogo ? (
                                    <JobBadge
                                        className={'w-20 h-20'}
                                        data={{logo: employerLogo}}
                                        badgeStyles="mb-6 sm:hidden"
                                    />
                                ) : (
                                    <div
                                        className="mb-6 sm:hidden w-20 h-20 bg-slate-950 flex items-center justify-center">
                                    <span
                                        className="text-slate-50 text-2xl">{employerName.slice(0, 2).toUpperCase()}</span>
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <h3 className="text-slate-950 font-bold text-md">
                                        {title.slice(0, 40)}{title.length > 40 ? "..." : ""}
                                    </h3>
                                    <div className={'flex justify-start items-center gap-3'}>
                                        <h4 className="paragraph-medium italic  text-slate-950">
                                            {employerName}
                                        </h4>
                                    </div>
                                    <p className="body-regular mt-0.5 capitalize text-slate-950">
                                        posted: {getTimestamp(new Date(postedAt))}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="body-regular text-slate-950 mt-3.5 line-clamp-3">
                            {description.slice(0, 2000)}
                        </p>

                        {/*{requiredSkills && requiredSkills.length > 0 && (*/}
                        {/*    <div className="mt-3.5 flex flex-wrap gap-2">*/}
                        {/*        {requiredSkills.map((tag) => (*/}
                        {/*            <Badge*/}
                        {/*                key={tag}*/}
                        {/*                className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase"*/}
                        {/*            >*/}
                        {/*                {tag}*/}
                        {/*            </Badge>*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                </div>
                <div className="flex-between mt-6 w-full flex-wrap gap-3">
                    <div className="flex flex-col md:flex-row items-center gap-3 max-sm:flex-wrap justify-center">
                        <Metric
                            imgUrl="/briefcase.svg"
                            alt="briefcase"
                            value={employmentTypeConverter(employmentType)}
                            textStyles="small-medium text-light-500"
                            className="w-full md:w-auto"
                        />
                        <Metric
                            imgUrl="/people.svg"
                            alt="people"
                            value={isRemote ? "Remote" : "On-Site"}
                            textStyles="small-medium text-light-500"
                            className="w-full md:w-auto"
                        />
                        <Metric
                            imgUrl="/currency-dollar-circle.svg"
                            alt="dollar circle"
                            value={getFormattedSalary(salary) || "TBD"}
                            textStyles="small-medium text-light-500"
                            className="w-full md:w-auto"
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};


export const CandidateCard = ({
                                  id,
                                  fullName,
                                  saved,
                                  email,
                                  city,
                                  state,
                                  country,
                                  phone,
                                  skills,
                                  profession,
                                  workExperiences,
                                  education,
                                  imageUrl,

                                  className,

                              }) => {

    const location = `${city ? `${city}${state ? ", " : ""}` : ""}${state || ""}${
        city && state && country ? ", " : ""
    }${country || ""}`;
    const [isBookmarked, setIsBookmarked] = useState(saved);
    const [resumeUrl, setResumeUrl] = useState(null);

    function handleBookMark() {
        setIsBookmarked(!isBookmarked);
        console.log(isBookmarked)
    }

    // useEffect(() => {
    //     async function fetchResume() {
    //         try {
    //             const response = await fetch(`${HOST}/candidate/getResume/${id}`);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             console.log("Abububub", data)
    //             setResumeUrl(data.resumeUrl);
    //         } catch (error) {
    //             console.error('Error fetching resume and portfolio:', error);
    //         }
    //     }
    //     fetchResume();
    // }, []);

    return (
        <div
            className="card-wrapper bg-slate-50 cursor-pointer rounded-xl shadow-black shadow-lg hover:shadow-xl transition duration-200 p-6 flex flex-col gap-3">
            <div>
                <div className="flex justify-between items-center gap-2">
                    <JobBadge data={{location, country}} isLocation/>
                    {isBookmarked ? <FaBookmark onClick={handleBookMark} size={20}/> :
                        <FaRegBookmark onClick={handleBookMark} size={20}/>}
                </div>
            </div>
            <Link href={`/employer/candidate/${id}`}
                className="flex flex-col justify-center items-center gap-4">
                <div className="block">
                    <JobBadge className={'w-40 h-40 md:w-36 md:h-36 rounded-full'} data={{logo: imageUrl}} isCandidate/>
                </div>
                <div>
                    <div
                        className="flex flex-col-reverse items-center justify-center gap-5 sm:flex-row">
                        <div className="flex-1">
                            <div className="flex flex-col">
                                <h3 className="text-slate-950 text-center font-bold text-md">
                                    {fullName}
                                </h3>
                                <div className={'flex justify-center items-center gap-3'}>
                                    <h4 className="paragraph-medium text-center italic  text-slate-950">
                                        {profession}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex-between mt-6 w-full flex-wrap gap-3">
                <div className="flex flex-col md:flex-row items-center gap-3 max-sm:flex-wrap justify-center">
                    <Link href={'https://affinda-api-data-prod-ap1.s3.amazonaws.com/media/documents/resume_GgJfiig.pdf?versionId=pOazDyqgt3Rkfr_cq_FYG9FDGpWdx2Uq&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAU4IX6YWNPUESVQI6%2F20240416%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240416T050446Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aDmFwLXNvdXRoZWFzdC0yIkgwRgIhAN9WjfsvwTS6HfnVNpjLWRHXlogyjvttENZyStLBDxfOAiEA60V89sbbeVotYgK26xcoTyO%2B0cpXV5Up3weYDwunUGAqkgUItv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgwzMzU1OTQ1NzExNjIiDJrTyQXw7HuYToGRTyrmBO1HBd8KNFEwt79ALTEYv9w%2F8LOtlEwzYqxVfR0Ke1TfcnLh%2FQYlqHUwKEvAXET6CQmhRjoWbNV4tBUYsDA29YmUs1eiiEzNlAzrib0jXP1VR5WQ6%2B9d0Wk5Qplvpxa5cDFoHFqXiBA9T7lZcJHqpBVkQPQtzVx2FwlkALtYy8ky%2FD6glVDCnnJWauTqMr6rcLw3ph3ibpC7nz1M9QXwue1vNqrZk%2BKT%2FyVZVvU8UvwZ4S7NBVrFG7m6lKdFeW7jWEB3f12U0nXofO2tgjSPQMCfkAHeo8JvEe%2BLJnp%2Fr6VTpMVo9zA025UN4I7Ww1kV%2FVmrd0QP1Bbk%2FcqzWa4otXIpdy7aukBg4NOb89VFKokWcXVMbi6tB%2FuOvul3tgWm8UJATHSYwg1MFKrNAReKq3%2Boa5W95A8z%2BEYlg1p%2BqxufviEv%2BSlg4jXz47IyL6ZS8RTwyb7%2FJLbMMYMVhP6maA8J5ccbZL%2FDCps4UHI674Z0IrfSfiXO9aRJb4PPbW%2BB%2BZB%2BgYuvD72YHsUlC05%2BOb83S4j1c%2B%2FJKxZRQZKdqaOaG29mtLr%2FB1nnvXssNJZ1G1wMJbQlSTG8qC4tCoK3w%2FOO9upTpjvNg3WVYNylsYY2QglFo53Mf226KE9MdDiZysGWE49%2Fpm%2FnvcH8t2wU6gnfWkTv0F4SunQAaWpBZ%2FDRSfTIZxNZbmi3mBFLhMNEFcOelpmADhQ%2Bg9Kn%2FYvfm96a3axvjw83j7ddqOPrbQkvCzt139VZukg2kwPPKBvZf8p4J5BrEr1AICa7kckxlpBKVHMuMJMKA2sSnoCW2CaiViRq1QzDMNb997AGOpkBwG0z30XI8XDihumZrdcujviJ6%2FPkBvRi6u4TcoCmzLRBGYjEwjIEiEJpUQAJUSItlIXUz8mKWazIWgAJ3%2FkbhO3egrwoFd3S%2FFKdleN3zCgFHYUa%2FZaGnLmNHiIyujmkpKS6jeNCVCORZM1nAZwasTaK9%2FlDgYHCb3asZPXas6tnaAXJ%2BL0aenfJ9UAXokEzJL6CI5rAOZK4&X-Amz-Signature=44cbfad57a92be59d99612146e5e773f617249d3631d4e46ff1b72098734109c'} target={'_blank'}>
                        <Metric
                            imgUrl="/resume.svg"
                            alt="briefcase"
                            value={'Resume'}
                            textStyles="small-medium text-light-500"
                            className="w-full md:w-auto"
                        />
                    </Link>
                    <Link href={`/employer/candidate/${id}#portfolio-tab`}>
                        <Metric
                            imgUrl="/portfolio.svg"
                            alt="people"
                            value={"Portfolio"}
                            textStyles="small-medium text-light-500"
                            className="w-full md:w-auto"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};
