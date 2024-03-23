'use client'
// Import necessary components
import React, {useState,useContext} from 'react';
import {BackgroundGradient} from "@/components/ui/background-gradient";
import {MdInsertDriveFile, MdOutlineCloudUpload, MdOutlineUploadFile} from "react-icons/md";
import {PiSignInBold} from "react-icons/pi";
import {ReloadIcon} from "@radix-ui/react-icons"
import { AppContext } from "@/Context/Candidate_Employer_Data";
import {useRouter} from "next/navigation";

function ResumeUploader() {
    const [selectedFile, setSelectedFile] = useState(null); // Track a single file
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const allowedFormats = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const {candidateData,setCandidateData} = useContext(AppContext);
    const router = useRouter();
    const handleDragEnter = (e) => {
        e.preventDefault(); // Prevent default browser behavior
    };

    const handleDragLeave = () => {
        // No specific action needed for drag leave in this case
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]; // Get the first file
        if (file) {
            setSelectedFile(file);
            setErrorMessage('');
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && !allowedFormats.includes(file.type)) {
            setErrorMessage('Invalid file format. Only PDF, DOC, PNG, and JPEG are allowed.');
            setSelectedFile(null); // Clear selection for invalid format
        } else {
            setErrorMessage('');
            setSelectedFile(file);
        }
    };
    const handleFileSubmission = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!selectedFile) {
            setErrorMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('wait', 'true');
        formData.append('file', selectedFile); // Use selectedFile from state
        formData.append('workspace', 'FmsCdiUN'); // Replace with your workspace ID

        const url = 'https://api.affinda.com/v3/documents';
        const options = {
            method: 'POST', headers: {
                accept: 'application/json', authorization: 'Bearer aff_3cb77d027beb8ac30800fc4e5ac769bbb712d662' // Replace with your authorization token
            }, body: formData
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const {data} = await response.json();
           console.log('Upload successful:', data);

           const skillNames = data.skills.map(skill => skill.name);
           const workExperiences = data.workExperience.map(exp => ({
            title: exp.jobTitle,
            companyName: exp.organization,
            location: exp.location.formatted, 
            duration: `${exp.dates.startDate} - ${exp.dates.endDate}`, 
            description: exp.jobDescription 
        }));
        
const education = data.education.map(edu => ({
    degree: edu.accreditation.education,
    universityName: edu.organization,
    location: edu.location.formatted,
    duration: `${edu.dates.startDate ? new Date(edu.dates.startDate).toLocaleDateString() : ''} - ${edu.dates.completionDate ? new Date(edu.dates.completionDate).toLocaleDateString() : (edu.dates.isCurrent ? 'Present' : '')}`,
    description: `Grade: ${edu.grade.raw || ''}` // Assuming you want to display the grade as part of the description.
}));

           setCandidateData(
            {
                fullName: data.name.raw,
                 email: data.emails[0],
                 preferredJobLocation: data.location.formatted,
                phone:data.phoneNumbers[0],
                skills: skillNames,
                workExperiences,
                education 
            }
            )



       
           // console.log(data.name.raw);

            setSelectedFile(null); // Clear selection after successful upload
            setErrorMessage(''); // Clear any error messages
            setIsLoading(false);
            router.push("/candidate/profile");
        } catch (error) {
            console.error('Upload failed:', error);
            setErrorMessage('An error occurred during upload. Please try again.');
        }
    };

    return (<BackgroundGradient
            className="rounded-3xl flex justify-center items-center p-4 h-full w-[80vw] md:w-[40vw] lg:w-[30vw] bg-slate-950">
            <div
                className={`bg-transparent text-center rounded w-full px-3 flex flex-col items-center justify-center cursor-pointer mx-auto ${selectedFile ? 'border-2 border-slate-200 border-dashed rounded-xl' : ''}`}
                onDragOver={(e) => e.preventDefault()} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <div className="py-6 flex w-full flex-col justify-center items-center gap-3 ">
                    {selectedFile ? (<MdInsertDriveFile className='text-slate-50' size={50}/> // Display selected file icon
                    ) : (<MdOutlineCloudUpload className='text-slate-50' size={50}/> // Display upload icon
                    )}
                    {selectedFile ? (<div>
                                <p className="text-slate-300 text-sm">{selectedFile.name}</p>
                                <p className="text-xs text-slate-500 mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>) :
                        <h4 className="text-base font-semibold text-slate-50">Drag and drop or select a resume</h4>}
                </div>
                <hr className="w-full border-slate-100 my-2"/>
                <div className="py-6 w-full">
                    {selectedFile ? (<div className='flex flex-col justify-center items-center gap-3'>
                            <label htmlFor="uploadFile1"
                                   className="bg-slate-900 text-[1rem] w-full font-medium flex justify-center items-center gap-1 text-slate-50 rounded-md h-10 cursor-pointer transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">
                                Replace File
                                <MdOutlineUploadFile size={20}/>
                            </label>
                            <button
                                className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform disabled:bg-slate-700 disabled:text-slate-300 disabled:border-none active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                                onClick={handleFileSubmission} disabled={isLoading ? true : false}
                            >
                                {isLoading ? <div className='flex gap-1 justify-center items-center'>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                    Please wait
                                </div> : <div className='flex gap-1 justify-center items-center'>
                                    Submit
                                    <PiSignInBold size={20}/>
                                </div>}


                            </button>

                        </div>

                    ) : (<div>
                            <input type="file" id="uploadFile1" className="hidden" onChange={handleFileInputChange}
                                   accept={allowedFormats.join(',')}/>
                            <label htmlFor="uploadFile1"
                                   className="bg-slate-50 text-[1rem] font-medium flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 cursor-pointer transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">
                                Upload Resume
                                <MdOutlineUploadFile size={20}/>
                            </label>
                            {errorMessage ? (<p className="text-xs text-red-500 mt-2">{errorMessage}</p>) : (
                                <p className="text-xs text-gray-400 mt-4">PDF, DOC, PNG, and JPEG are Allowed.</p>)}
                        </div>)}


                </div>
            </div>
        </BackgroundGradient>);
}

export default ResumeUploader;
