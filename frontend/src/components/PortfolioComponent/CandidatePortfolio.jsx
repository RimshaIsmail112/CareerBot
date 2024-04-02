"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MdDelete, MdSave, MdAdd } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/Context/Candidate_Employer_Data";
import { cn } from "@/lib/utils";
import {PiSignInBold} from "react-icons/pi";

function CandidatePortfolio() {
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { candidate } = useAppContext();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const addNewProject = () => {
        setProject({
            thumbnailUrl: "",
            projectName: "",
            projectType: "",
            projectDescription: "",
            repoUrl: "",
            liveUrl: ""
        });
    };

    const saveCurrentProject = () => {
        if (project) {
            const { projectName, projectType, projectDescription, repoUrl, liveUrl } = project;
            if (!projectName || !projectType || !projectDescription || !repoUrl || !liveUrl) {
                alert("All fields are required!");
                return;
            }
            setProjects([...projects, project]);
            setProject(null);
        }
    };

    const deleteProject = (index) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    const submitPortfolio = async () => {
        setIsLoading(true);
        try {
            // const response = await fetch(`/candidate/setProjects/${candidate.id}`, {
                const response = await fetch(`http://localhost:3001/candidate/setProjects/660a89b1c16089e0e1433a6b`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projects }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit portfolio');
            }

            const result = await response.json();
            alert(`Portfolio submitted successfully: ${result.message}`);
            setProjects([]);
        } catch (error) {
            console.error('Error submitting portfolio:', error);
            alert(`Failed to submit portfolio. Please try again later: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
       <h2 className="text-2xl font-bold text-center text-white mb-4">Candidate Portfolio</h2>
       <button onClick={addNewProject}                             className="bg-slate-900 text-[1rem] border-2 border-slate-700 w-full font-medium flex justify-center items-center gap-1 text-slate-50 rounded-md h-10 cursor-pointer transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">

    <MdAdd className="mr-2" /> Add Project
    </button>

            {project && (
                <div className="mb-6">
                    <LabelInputContainer>
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                            id="projectName"
                            name="projectName"
                            value={project.projectName}
                            onChange={handleInputChange}
                            placeholder="Project Name"
                            className="bg-slate-900 text-slate-50 placeholder:text-slate-400"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                        <Input
                            id="thumbnailUrl"
                            name="thumbnailUrl"
                            value={project.thumbnailUrl}
                            onChange={handleInputChange}
                            placeholder="Thumbnail URL"
                            className="bg-slate-900 text-slate-50 placeholder:text-slate-400"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="projectType">Project Type</Label>
                        <Input
                            id="projectType"
                            name="projectType"
                            value={project.projectType}
                            onChange={handleInputChange}
                            placeholder="Project Type"
                            className="bg-slate-900 text-slate-50 placeholder:text-slate-400"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="projectDescription">Project Description</Label>
                        <Textarea
                            id="projectDescription"
                            name="projectDescription"
                            value={project.projectDescription}
                            onChange={handleInputChange}
                            placeholder="Project Description"
                            className="bg-slate-900 text-slate-50 placeholder:text-slate-400"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="repoUrl">Repository URL</Label>
                        <Input
                            id="repoUrl"
                            name="repoUrl"
                            value={project.repoUrl}
                            onChange={handleInputChange}
                            placeholder="Repository URL"
                            className="bg-slate-900 text-slate-50 placeholder:text-slate-400"
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="liveUrl">Live URL</Label>
                        <Input
                            id="liveUrl"
                            name="liveUrl"
                            value={project.liveUrl}
                            onChange={handleInputChange}
                            placeholder="Live URL"
                            className="bg-slate-900 text-slate-50 placeholder:text-slate-400"
                        />
                    </LabelInputContainer>

                    <div className="flex justify-center mt-4 space-x-4">
                        <button onClick={saveCurrentProject}className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform disabled:bg-slate-700 disabled:text-slate-300 disabled:border-none active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">
                            <MdSave className="mr-2" />
                            Save Project
                        </button>
                        <button onClick={() => setProject(null)}className="bg-slate-900 text-[1rem] w-full font-medium flex justify-center items-center gap-1 text-slate-50 rounded-md h-10 cursor-pointer transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
>
        <MdDelete className="mr-2" />
        Cancel
    </button>
                    </div>
                </div>
            )}

<h3 className="text-xl font-bold text-center text-white mt-6 mb-4">Saved Projects</h3>
{projects.length > 0 ? (
    projects.map((project, index) => (
        <div key={index} className="p-4 mb-4 bg-slate-800 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">{project.projectName}</h4>
                <button onClick={() => deleteProject(index)} className="bg-red-500 text-white p-1 rounded flex items-center">
                    <MdDelete className="mr-2" />
                    Delete
                </button>
            </div>
            <div className="text-slate-50  text-md">
                <p className="mb-1"><span className="font-semibold text-slate-200">Thumbnail URL:</span> {project.thumbnailUrl}</p>
                <p className="mb-1"><span className="font-semibold text-slate-200">Type:</span> {project.projectType}</p>
                <p className="mb-1"><span className="font-semibold text-slate-200">Description:</span> {project.projectDescription}</p>
                <p className="mb-1"><span className="font-semibold text-slate-200">Repository URL:</span> {project.repoUrl}</p>
                <p className="mb-1"><span className="font-semibold text-slate-200">Live URL:</span> {project.liveUrl}</p>
            </div>
        </div>
    ))
) : (
    <p className="text-center text-white">No projects have been added.</p>
)}



            <div className="flex justify-center mt-4">
             
                <button
                        className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform disabled:bg-slate-700 disabled:text-slate-300 disabled:border-none active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                        onClick={submitPortfolio}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <ImSpinner2 size={20} className="animate-spin mr-2"/>
                                Please wait
                            </div>
                        ) : (
                            <div className="flex gap-1 justify-center items-center">
                                Submit
                                <PiSignInBold size={20}/>
                            </div>
                        )}
                    </button>
            </div>
        </div>
    );
}

export default CandidatePortfolio;

const LabelInputContainer = ({ children }) => {
    return <div className={cn("flex flex-col space-y-2 w-full")}>{children}</div>;
};
