"use client";
import { cn, getCountryCode } from "@/lib/utils";
import React, { useEffect } from "react";
import { CandidateCard, JobCard } from "../ui/bento-grid";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { JobsFilter } from "@/components/dashboardComponents/JobsFilter";
import { ImSpinner2 } from "react-icons/im";
import { getMostRecommendedJobs, searchJobs } from "@/lib/JobSearch";
import { candidatesData, jobs, resumeData } from "@/lib/dummyData";
import { useAppContext } from "@/Context/Candidate_Employer_Data";
import Link from "next/link";

export default function RecommendedJobs() {
  const [recommendedJobs, setRecommendedJobs] = React.useState(null);
  const [jobsAll, setJobsAll] = React.useState(null);
  const [skillsCandidate, setSkillsCandidate] = React.useState(null);
  const {
    jobsData,
    setJobsData,
    setCandidateData,
    candidateData,
    candidateCardData,
  } = useAppContext();
  const [active, setActive] = React.useState(1);
  const [itemsPerPage] = React.useState(6);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [formData, setFormData] = React.useState(null);
  const url =
  "https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20Pakistan&page=10&num_pages=10&country=pk&date_posted=all";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "7bc227051amsh7126393e0d75c94p1456d7jsn09c1c60eddf4",
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
  },
};

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
    setCurrentPage(currentPage + 1);
  };
  const numberButtonHandler = (index) => {
    setActive(index);
    setCurrentPage(index);
  };

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
  const currentData =
    recommendedJobs && recommendedJobs.slice(startIndex, endIndex);

  // useEffect(() => {
  //     if(!jobsData){
  //         console.log("No jobs data")
  //         async function getJobsResult(search, location) {
  //             const giveRecommended = true;
  //             const realTimeJobsData = await searchJobs(search, location, giveRecommended)
  //             //const mostRecommendedJobs = await getMostRecommendedJobs(realTimeJobsData, candidateData) //Replace with actual resume data (done)
  //             setRecommendedJobs(realTimeJobsData);
  //             setJobsData(realTimeJobsData);
  //         }

  //         const candidateProfession = candidateData.profession // Replace with actual candidate profession (done)
  //         const location = candidateData.preferredJobLocation // Replace with actual candidate location (done)
  //         getJobsResult(candidateProfession, location);
  //     }
  //     else{
  //         console.log("Jobs data")
  //         setRecommendedJobs(jobsData);
  //     }

  // }, []);

  // const handleFilterChange = (filterOptions) => {
  //     console.log(filterOptions);
  //     const filtered = (searchedData || allJobs).filter((job) => {
  //         return (
  //             (filterOptions.showFullTime && job.job_employment_type.toLowerCase() === "fulltime") ||
  //             (filterOptions.showPartTime && job.job_employment_type.toLowerCase() === "parttime") ||
  //             (filterOptions.showContract && job.job_employment_type.toLowerCase() === "contractor") ||
  //             (filterOptions.showInternship && job.job_employment_type.toLowerCase() === "intern") ||
  //             (filterOptions.showRemote && job.job_is_remote) ||
  //             (filterOptions.showOnSite && !job.job_is_remote)
  //         );
  //     });
  //
  //     console.log(filtered)
  //     filtered.length === 0 ? setAllJobs(jobs.data) : setAllJobs(filtered);
  // };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        setJobsAll(result.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    function calculateTFIDF(jobs) {
      const tokenize = (text) => {
        if (!text) return [];
        return text.toLowerCase().match(/\b\w+\b/g) || [];
      };
      
      const termFrequencies = [];
      const documentFrequencies = new Map();
      const totalDocuments = jobs.length;
    
      // Calculate Term Frequencies (TF)
      for (const job of jobs) {
        // Combine relevant job information for analysis
        const jobText = [
          job.job_title,
          job.job_description,
          ...(job.job_highlights?.Qualifications || []),
          ...(job.job_highlights?.Responsibilities || [])
        ].filter(Boolean).join(' ');
        
        const tokens = tokenize(jobText);
        const tf = {};
        const tokenCount = tokens.length;
    
        if (tokenCount === 0) continue;
    
        for (const token of tokens) {
          tf[token] = (tf[token] || 0) + 1;
        }
    
        for (const token in tf) {
          tf[token] /= tokenCount;
        }
    
        termFrequencies.push(tf);
    
        // Update Document Frequencies (DF)
        const uniqueTokens = new Set(tokens);
        for (const token of uniqueTokens) {
          documentFrequencies.set(token, (documentFrequencies.get(token) || 0) + 1);
        }
      }
    
      // Calculate Inverse Document Frequencies (IDF)
      const idf = {};
      for (const [term, df] of documentFrequencies.entries()) {
        idf[term] = Math.log(totalDocuments / df);
      }
    
      // Calculate TF-IDF
      const tfidf = termFrequencies.map((tf) => {
        const docTfidf = {};
        for (const term in tf) {
          docTfidf[term] = tf[term] * idf[term];
        }
        return docTfidf;
      });
    
      return { tfidf, idf };
    }
    
    function cosineSimilarity(vectorA, vectorB) {
      const terms = new Set([...Object.keys(vectorA), ...Object.keys(vectorB)]);
      let dotProduct = 0;
      let magnitudeA = 0;
      let magnitudeB = 0;
    
      for (const term of terms) {
        const a = vectorA[term] || 0;
        const b = vectorB[term] || 0;
    
        dotProduct += a * b;
        magnitudeA += a * a;
        magnitudeB += b * b;
      }
    
      magnitudeA = Math.sqrt(magnitudeA);
      magnitudeB = Math.sqrt(magnitudeB);
    
      return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
    }
    
    function matchJobsToCandidate(jobs, candidateSkills) {
      // Handle case with no jobs
      if (!jobs || !jobs.length) {
        return [];
      }
      
      // Calculate TF-IDF for all job listings
      const { tfidf, idf } = calculateTFIDF(jobs);
      
      // Create Candidate Skills Vector
      const tokenize = (text) => text.toLowerCase().match(/\b\w+\b/g) || [];
      
      // Handle when candidateSkills is an array
      let candidateTokens;
      if (Array.isArray(candidateSkills)) {
        candidateTokens = candidateSkills.map(skill => skill.toLowerCase());
      } else {
        candidateTokens = tokenize(candidateSkills);
      }
      
      const candidateVector = {};
      
      // Count term frequency in candidate skills
      for (const token of candidateTokens) {
        candidateVector[token] = (candidateVector[token] || 0) + 1;
      }
      
      // Normalize Candidate Vector using IDF
      const totalTokens = candidateTokens.length;
      if (totalTokens > 0) {
        for (const token in candidateVector) {
          candidateVector[token] = (candidateVector[token] / totalTokens) * (idf[token] || 0);
        }
      }
      
      // Calculate Similarities
      const jobSimilarities = jobs.map((job, index) => {
        const jobVector = tfidf[index] || {};
        
        // Create the result object with all required fields
        return {
          job_id: job.job_id,
          job_title: job.job_title,
          saved: false,
          job_description: job.job_description,
          job_city: job.job_city,
          job_state: job.job_state,
          job_country: job.job_country,
          job_required_skills: job.job_required_skills || [],
          job_apply_link: job.job_apply_link,
          employer_logo: job.employer_logo,
          employer_name: job.employer_name,
          job_employment_type: job.job_employment_type?.toLowerCase(),
          job_is_remote: job.job_is_remote,
          job_apply_is_direct: job.job_apply_is_direct,
          job_publisher: job.job_publisher,
          job_highlights: job.job_highlights || { Qualifications: [], Responsibilities: [] },
          job_min_salary: job.job_min_salary,
          job_max_salary: job.job_max_salary,
          job_salary_currency: job.job_salary_currency,
          job_salary_period: job.job_salary_period,
          job_posted_at_datetime_utc: job.job_posted_at_datetime_utc,
          similarity: cosineSimilarity(jobVector, candidateVector)
        };
      });
      
      // Sort by Relevance
      jobSimilarities.sort((a, b) => b.similarity - a.similarity);
      
      return jobSimilarities;
    }

    if (typeof window !== 'undefined') {
      if (localStorage.getItem("formData")) {
        const formData = JSON.parse(localStorage.getItem("formData"));
        console.log(formData);
        setSkillsCandidate(formData);
      }
    }

    if (!jobsAll) return;

    const skillsArray = (skillsCandidate && skillsCandidate.skills && skillsCandidate.skills.length) 
      ? skillsCandidate.skills 
      : [(skillsCandidate?.currentSkill ?? "")];
    
    console.log("Skills", skillsArray);
    
    // Match jobs to different candidate profiles using array of skills
    const matchedJobs = matchJobsToCandidate(jobsAll, skillsArray);
    
    console.log("Job Matches:", matchedJobs);
    setRecommendedJobs(matchedJobs);
    setJobsData(matchedJobs);
  }, [jobsAll]);

  return (
    <div className={"w-screen px-8 md:px-12 lg:px-16"}>
      <div className={"flex flex-col gap-3 w-full justify-center items-center"}>
        <div
          className={
            "flex flex-col lg:flex-row gap-5 md:justify-between w-full items-center mt-8"
          }
        >
          <h2
            className={cn(
              "text-3xl w-full font-bold text-center md:text-left text-slate-50 dark:text-neutral-100"
            )}
          >
            Recommended Jobs
          </h2>
        </div>
        <div className="flex w-full flex-col gap-3">
          {!currentData ? (
            <ImSpinner2
              size={30}
              className="animate-spin w-full text-slate-50"
            />
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 justify-center items-center">
              {currentData.map((jobItem) => (
                <div
                  className="p-2 md:p-5 w-full md:basis-1/3"
                  key={jobItem.job_id}
                >
                  <JobCard
                    jobId={jobItem.job_id}
                    title={jobItem.job_title}
                    saved={false}
                    description={jobItem.job_description}
                    city={jobItem.job_city}
                    state={jobItem.job_state}
                    country={jobItem.job_country}
                    requiredSkills={jobItem.job_required_skills || []}
                    applyLink={jobItem.job_apply_link}
                    employerLogo={jobItem.employer_logo}
                    employerName={jobItem.employer_name}
                    employmentType={jobItem.job_employment_type}
                    isRemote={jobItem.job_is_remote}
                    isDirect={jobItem.job_apply_is_direct}
                    publisher={jobItem.job_publisher}
                    qualification={jobItem.job_highlights?.Qualifications || []}
                    responsiblity={jobItem.job_highlights?.Responsibilities || []}
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
          )}
        </div>

        <div className="flex items-center justify-center gap-4 mt-5 w-full">
          <Button
            variant="text"
            className="items-center justify-center gap-2 active:bg-slate-400 flex bg-slate-50 hover:bg-slate-200 text-slate-950 bg-opacity-100"
            onClick={prev}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Prev
          </Button>
          <div className="flex items-center gap-2">
            <IconButton
              className={
                "items-center justify-center gap-2 active:bg-slate-400 flex bg-slate-50 hover:bg-slate-200 text-slate-950 font-bold bg-opacity-100"
              }
              variant={"filled"}
            >
              {currentPage}
            </IconButton>
          </div>
          <Button
            variant="text"
            className="items-center justify-center gap-2 hover:bg-slate-200 active:bg-slate-400 flex bg-slate-50 text-slate-950 bg-opacity-100"
            onClick={next}
            disabled={
              currentPage ===
              Math.ceil(
                recommendedJobs ? recommendedJobs.length / itemsPerPage : 1
              )
            }
          >
            Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}