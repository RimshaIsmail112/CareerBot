'use client'
import React, { useEffect, useState } from 'react';
import {cn, HOST} from "@/lib/utils";
import { ImSpinner2 } from "react-icons/im";
import { JobCard } from "@/components/ui/bento-grid";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {useAppContext} from "@/Context/Candidate_Employer_Data";

function Page(props) {
    const [active, setActive] = useState(1);
    const {candidate, setCandidate} = useAppContext();
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsData, setJobsData] = useState([
        {
            job_id: "6YIdOJwFSeEKqAPkAAAAAA==",
            employer_name: "CGI Group, Inc.",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/CGI_logo.svg/1280px-CGI_logo.svg.png",
            employer_website: "http://www.cgi.com",
            employer_company_type: "Computer Services",
            job_publisher: "Learn4Good",
            job_employment_type: "FULLTIME",
            job_title: "Full Stack Python Developer",
            job_apply_link: "https://www.learn4good.com/jobs/online_remote/software_development/3049078486/e/",
            job_apply_is_direct: false,
            job_apply_quality_score: 0.4193,
            apply_options: [
                {
                    publisher: "Learn4Good",
                    apply_link: "https://www.learn4good.com/jobs/online_remote/software_development/3049078486/e/",
                    is_direct: false
                }
            ],
            job_description: "Full Stack Python Developer\n\nPosition Description\nCGI is Seeking a Sr.Full stack Python developer with experience developing and deploying applications on cloud platforms such as Azure/AWS. The candidate will work with cloud architects to produce scalable solutions using front and back-end coding languages, development frameworks and third-party libraries. This individual should be self-motivated to drive solutions and familiar with Agile methodologies.\n\n• This is fulltime position. Contract is not allowed for this role.\n\n• Candidate should be flexible to work in Hybrid model from any of our CGI offices. No remote work allowed.\n\n• Candidate should be willing to work in Eastern time zone.\n\nExperience working with front-end and the back-end, Python Web framework (Django / Flask), Databases like Mongo / Postgres SQL, & Azure are key for this role.\n\nYour future duties and responsibilities\n\n• Build applications with best in class UI/UX design principles\n\n• Work with data scientists and cloud architects to develop and manage well-functioning databases and applications.\n\n• Participate in vision workshops and create minimum viable products to get business buy in and demonstrate ROI.\n\n• Write technical documentation and communicate appropriate key points to all stakeholders.\n\n• Test software to ensure responsiveness and efficiency cross platform optimization.\n\nRequired qualifications to be successful in this role\n\n• 10 + years of experience as a Full Stack Developer role\n\n• Experience working with multiple front-end languages and libraries (e.g. HTML/ CSS, JavaScript, XML, jQuery)\n\n• Experience working with multiple back-end languages (e.g. C#, Java, Python) and JavaScript frameworks (e.g. Angular, React, Node.js)\n\n• Experience with API design and implementation. Experience developing desktop and mobile applications.\n\n• 5 + years\n\nExperience with databases (e.g. Postgres, Mongo\n\nDB), web servers (e.g. Apache) and UI/UX design.\n\nExperience working with Python Web Frameworks like Django/Flast is must.\n\n• Experience with software versioning, packaging and deployment, e.g. Git, Artifactory, RPM, Docker, Jenkins .\n\n• experience with Azure or AWS cloud service provider is must.\n\n• Experience with Infrastructure as code (IaS) using terraform or cloud formation.\n\n• Excellent communication and teamwork skills\n\nRequired BS Science or equivalent\n• CGI is required by law in some jurisdictions to include a reasonable estimate of the compensation range for this role. The determination of this range includes various factors not limited to: skill set level; experience and training; and licensure and certifications. CGI typically does not hire individuals at or near the top of the range for their role. Compensation decisions are dependent on the facts and circumstances of each case.\n\nA reasonable estimate of the current range is $59,700 -$176,300.\n\nAt CGI we call our professionals \"members\" to reinforce that all who join our team are, as owners, empowered to participate in the challenges and rewards that come from building a world-class company. CGI's benefits include:\n\nCompetitive base salaries\nEligibility to participate in an attractive Share Purchase Plan (SPP) in which the company matches dollar-for-dollar contributions made by eligible employees, up to a maximum, for their job category\n401(k) Plan and Profit Participation for eligible members\nGenerous holidays, vacation, and sick leave plans\nComprehensive insurance plans that include, among other benefits, medical, dental, vision, life, disability, out-of-county emergency coverage in all countries of employment;\nBack-up child care, Pet insurance, a Member Assistance Program, a 529 college savings program, a personal financial management tool, lifestyle management programs and more.\n\n#LI-KB5\n\nInsights you can act on\n\nWhile technology is at the heart of our clients' digital transformation, we understand that people are at the heart of business success.\n\nWhen you join CGI, you become a trusted advisor, collaborating with colleagues and clients to bring forward actionable insights that deliver meaningful and sustainable outcomes. We call our employees \"members\" because they are CGI shareholders and owners and owners who enjoy working and growing together to build a company we are proud of. This has been our Dream since 1976, and it has brought us to where we are today - one of the world's largest independent providers of IT and business consulting services.\n\nAt CGI, we recognize the richness that diversity brings. We strive to create a work culture where all belong and collaborate with clients in building more inclusive communities. As an equal-opportunity employer, we want to empower all our members to succeed and grow. If you require an accommodation at any point during the recruitment process, please let us know. We will be happy to assist.\n\nReady to become part of our success story? Join CGI - where your ideas and actions make a difference.\n\nQualified applicants will receive consideration for employment without regard to their race, ethnicity,…",
            job_is_remote: true,
            job_posted_at_timestamp: 1712448000,
            job_posted_at_datetime_utc: "2024-04-07T00:00:00.000Z",
            job_city: "Dallas",
            job_state: "TX",
            job_country: "US",
            job_latitude: 32.776665,
            job_longitude: -96.79699,
            job_benefits: [
                "health_insurance",
                "dental_coverage",
                "retirement_savings",
                "paid_time_off"
            ],
            job_google_link: "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=90&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=6YIdOJwFSeEKqAPkAAAAAA%3D%3D",
            job_offer_expiration_datetime_utc: "2024-10-06T00:00:00.000Z",
            job_offer_expiration_timestamp: 1728172800,
            job_required_experience: {
                no_experience_required: false,
                required_experience_in_months: 120,
                experience_mentioned: true,
                experience_preferred: false
            },
            job_required_skills: null,
            job_required_education: {
                postgraduate_degree: false,
                professional_certification: false,
                high_school: false,
                associates_degree: false,
                bachelors_degree: false,
                degree_mentioned: true,
                degree_preferred: true,
                professional_certification_mentioned: true
            },
            job_experience_in_place_of_education: false,
            job_min_salary: 59700,
            job_max_salary: 176300,
            job_salary_currency: "USD",
            job_salary_period: "YEAR",
            job_highlights: {
                Qualifications: [
                    "This individual should be self-motivated to drive solutions and familiar with Agile methodologies",
                    "Candidate should be willing to work in Eastern time zone",
                    "Experience working with front-end and the back-end, Python Web framework (Django / Flask), Databases like Mongo / Postgres SQL, & Azure are key for this role",
                    "10 + years of experience as a Full Stack Developer role",
                    "Experience working with multiple front-end languages and libraries (e.g. HTML/ CSS, JavaScript, XML, jQuery)",
                    "Experience working with multiple back-end languages (e.g. C#, Java, Python) and JavaScript frameworks (e.g",
                    "Angular, React, Node.js)",
                    "Experience with API design and implementation",
                    "Experience developing desktop and mobile applications",
                    "5 + years",
                    "DB), web servers (e.g. Apache) and UI/UX design",
                    "Experience working with Python Web Frameworks like Django/Flast is must",
                    "Experience with software versioning, packaging and deployment, e.g",
                    "Git, Artifactory, RPM, Docker, Jenkins ",
                    "experience with Azure or AWS cloud service provider is must",
                    "Experience with Infrastructure as code (IaS) using terraform or cloud formation",
                    "Excellent communication and teamwork skills",
                    "Required BS Science or equivalent",
                    "CGI is required by law in some jurisdictions to include a reasonable estimate of the compensation range for this role"
                ],
                Responsibilities: [
                    "This is fulltime position",
                    "Build applications with best in class UI/UX design principles",
                    "Work with data scientists and cloud architects to develop and manage well-functioning databases and applications",
                    "Participate in vision workshops and create minimum viable products to get business buy in and demonstrate ROI",
                    "Write technical documentation and communicate appropriate key points to all stakeholders",
                    "Test software to ensure responsiveness and efficiency cross platform optimization"
                ],
                Benefits: [
                    "A reasonable estimate of the current range is $59,700 -$176,300",
                    "Competitive base salaries",
                    "Eligibility to participate in an attractive Share Purchase Plan (SPP) in which the company matches dollar-for-dollar contributions made by eligible employees, up to a maximum, for their job category",
                    "401(k) Plan and Profit Participation for eligible members",
                    "Generous holidays, vacation, and sick leave plans",
                    "Comprehensive insurance plans that include, among other benefits, medical, dental, vision, life, disability, out-of-county emergency coverage in all countries of employment;",
                    "Back-up child care, Pet insurance, a Member Assistance Program, a 529 college savings program, a personal financial management tool, lifestyle management programs and more"
                ]
            },
            job_job_title: null,
            job_posting_language: "en",
            job_onet_soc: "15113300",
            job_onet_job_zone: "4",
            job_occupational_categories: [
                "Python",
                "Senior Developer",
                "Software Engineer",
                "Full Stack Developer"
            ],
            job_naics_code: "541512",
            job_naics_name: "Computer Systems Design Services"
        },
        {
            job_id: "v52w6DpG17lrujjVAAAAAA==",
            employer_name: "Ttcpa",
            employer_logo: null,
            employer_website: null,
            employer_company_type: null,
            job_publisher: "ZipRecruiter",
            job_employment_type: "FULLTIME",
            job_title: "Django Python Developer",
            job_apply_link: "https://www.ziprecruiter.com/c/Ttcpa/Job/Django-Python-Developer/-in-Plano,TX?jid=a39b949a8da0d64c",
            job_apply_is_direct: false,
            job_apply_quality_score: 0.6745,
            apply_options: [
                {
                    publisher: "ZipRecruiter",
                    apply_link: "https://www.ziprecruiter.com/c/Ttcpa/Job/Django-Python-Developer/-in-Plano,TX?jid=a39b949a8da0d64c",
                    is_direct: false
                }
            ],
            job_description: "Job description\n\nPython/Django web developer needed for a startup team that is revolutionizing the consumer finance space. Remote or Dallas/Austin based developers will be considered.\n\nRequirements\n\n• Extensive experience with Python/Django, Javascript (especially jQuery)\n\n• Is relentless & resourceful in a fast-paced, startup environment\n\n• Able to communicate complex ideas in simple terms\n\n• Experience on AWS or other cloud-based infrastructure providers\n\nPreferred\n\n• Demonstrate on Github you've built something kickass\n\n• Contrarian thinker able to prove an idea and execute perfectly to launch\n\n• Handy with Linux command line (Ubuntu or Centos)\n\n• Experience with performance optimization, scaling, event analytics\n\n• Can write scripts on Fabric and deploy to a Linux instance\n\n• Good sense of humor\n\nAbout the team\n\nOver 25 million people use TurboTax software every year to file their taxes. But many more millions still walk into a tax store. You will be joining the small team of successful startup people that are disrupting the multi-billion dollar tax industry with their first product, TurboTax CPA Select. The service provides high quality tax help at a fraction of the price of a tax store by allowing consumers to connect with quality tax professionals online. The unique team is heavily financed by Intuit---makers of TurboTax, Quickbooks, and Mint---while still living and breathing \"lean startup\" to ultimately build a service anyone can use.",
            job_is_remote: true,
            job_posted_at_timestamp: 1712361600,
            job_posted_at_datetime_utc: "2024-04-06T00:00:00.000Z",
            job_city: "Plano",
            job_state: "TX",
            job_country: "US",
            job_latitude: 33.019844,
            job_longitude: -96.69888,
            job_benefits: null,
            job_google_link: "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=90&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=v52w6DpG17lrujjVAAAAAA%3D%3D",
            job_offer_expiration_datetime_utc: "2024-05-07T00:00:00.000Z",
            job_offer_expiration_timestamp: 1715040000,
            job_required_experience: {
                no_experience_required: false,
                required_experience_in_months: null,
                experience_mentioned: true,
                experience_preferred: false
            },
            job_required_skills: null,
            job_required_education: {
                postgraduate_degree: false,
                professional_certification: false,
                high_school: false,
                associates_degree: false,
                bachelors_degree: false,
                degree_mentioned: false,
                degree_preferred: false,
                professional_certification_mentioned: true
            },
            job_experience_in_place_of_education: false,
            job_min_salary: null,
            job_max_salary: null,
            job_salary_currency: null,
            job_salary_period: null,
            job_highlights: {
                Qualifications: [
                    "Extensive experience with Python/Django, Javascript (especially jQuery)",
                    "Is relentless & resourceful in a fast-paced, startup environment",
                    "Able to communicate complex ideas in simple terms",
                    "Experience on AWS or other cloud-based infrastructure providers"
                ],
                Responsibilities: [
                    "Remote or Dallas/Austin based developers will be considered"
                ]
            },
            job_job_title: null,
            job_posting_language: "en",
            job_onet_soc: "15113200",
            job_onet_job_zone: "4",
            job_occupational_categories: [
                "15-1131.00: Computer Programmers"
            ]
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${HOST}/candidate/bookmarks/${candidate._id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
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
            {!jobsData ? <ImSpinner2 size={30} className="animate-spin w-full text-slate-50"/> : jobsData.map((jobItem, index) => (
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