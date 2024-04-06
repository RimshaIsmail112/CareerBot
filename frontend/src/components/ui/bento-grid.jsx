import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


import { Badge } from "@/components/ui/badge";
import Metric from "@/components/ui/Metric";
import JobBadge from "@/components/ui/JobBadge";
import { FaRegBookmark, FaBookmark  } from "react-icons/fa";


import {
    employmentTypeConverter,
    getFormattedSalary,
    getTimestamp,
    isValidImage,
} from "@/lib/utils";
import {getLogo, logoPlaceholders} from "@/lib/CompanyLogo";
import {useState} from "react";

export const JobCard = ({
                                  title,
                                  description,
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

    const imageUrl = employerLogo ? employerLogo : logoPlaceholders[Math.floor(Math.random() * logoPlaceholders.length)];

    const location = `${city ? `${city}${state ? ", " : ""}` : ""}${state || ""}${
        city && state && country ? ", " : ""
    }${country || ""}`;
    const [isBookmarked, setIsBookmarked] = useState(false);
    function handleBookMark(){
        setIsBookmarked(!isBookmarked);
    }
    return (
        <div
            className="card-wrapper bg-slate-50 cursor-pointer rounded-xl shadow-black shadow-lg hover:shadow-xl transition duration-200 p-6 flex flex-col gap-3">
            <div className="self-end">
                <div className="flex justify-center items-center gap-2">
                    <JobBadge data={{location, country}} isLocation/>
                    {isBookmarked ? <FaBookmark onClick={handleBookMark} size={20}/> : <FaRegBookmark onClick={handleBookMark} size={20}/>}
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <div className="hidden sm:block">
                    <JobBadge data={{logo: imageUrl}}/>
                </div>
                <div>
                    <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                        <div className="flex-1">
                            <JobBadge
                                data={{logo: imageUrl}}
                                badgeStyles="mb-6 sm:hidden"
                            />
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
        </div>
    );
};
