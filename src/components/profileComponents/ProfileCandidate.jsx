"use client";

import React, {useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CgProfile} from "react-icons/cg";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {MdDelete, MdOutlineAlternateEmail} from "react-icons/md";
import {Textarea} from "@/components/ui/textarea";
import {PiSignInBold} from "react-icons/pi";
import {IoIosCloseCircle} from "react-icons/io";


function Modal({onClose, onSave, type, children}) {
    const [entry, setEntry] = useState({
        companyName: '',
        position: '',
        details: '',
        institutionName: '',
        date: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntry(prev => ({...prev, [name]: value}));  // This should correctly update the state
    };
    
    const handleSave = () => {
        onSave(entry);
        onClose(); // Close modal on save
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-slate-950 border-2 border-slate-700 p-5 rounded-3xl shadow-lg max-w-md w-full">
                {children(handleChange)}
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={handleSave}
                            className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform disabled:bg-slate-700 disabled:text-slate-300 disabled:border-none active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">
                    Save
                </button>
                    <button onClick={onClose}
                            className="bg-slate-900 text-[1rem] w-full font-medium flex justify-center items-center gap-1 text-slate-50 rounded-md h-10 cursor-pointer transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProfileDetailsForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        preferredJobLocation: '',
        phone: '',
        skills: [],
        currentSkill: '',
        workExperiences: [],
        education: [],
        profilePicture: null
    });
    const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] = useState(false);
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result); // Log the Base64 string
                setFormData(prevState => ({
                    ...prevState,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    

    const deleteProfilePicture = () => {
        setFormData(prevState => ({
            ...prevState,
            profilePicture: null
        }));
    };

    const handleSkillChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            currentSkill: e.target.value
        }));
    };

    const handleSkillKeyPress = (e) => {
        if (e.key === 'Enter' && formData.currentSkill.trim() !== '' && formData.skills.length < 8) {
            e.preventDefault();
            setFormData(prevState => ({
                ...prevState,
                skills: [...prevState.skills, prevState.currentSkill.trim()],
                currentSkill: '' // Clear the input
            }));
        }
    };

    const addWorkExperience = (workExperience) => {
        setFormData((prevState) => ({
            ...prevState,
            workExperiences: [...prevState.workExperiences, workExperience],
        }));
    };

    const addEducation = (educationEntry) => {
        setFormData(prevState => ({
            ...prevState,
            education: [...prevState.education, educationEntry]  // Ensure duration is included
        }));
    };
    
    const handleDelete = (index, name) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: prevState[name].filter((_, i) => i !== index)
        }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
            console.log(formData); // Log formData to ensure it includes profilePicture

        // Prepare data to send: Here, we only send fullName
        const dataToSend = {
            fullName: formData.fullName,
            email: formData.email,
            preferredJobLocation: formData.preferredJobLocation,
            phone: formData.phone,
            skills: formData.skills,
            workExperiences: formData.workExperiences,
            education: formData.education,
            profilePicture: formData.profilePicture
        };
    
        try {
            const response = await fetch('http://localhost:3000/candidate-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend) // Send only the fullName
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    // Show success message
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000); // Hide after 5 seconds

    // Reset form data
    setFormData({
        fullName: '',
        email: '',
        preferredJobLocation: '',
        phone: '',
        skills: [],
        currentSkill: '',
        workExperiences: [],
        education: [],
        profilePicture: null
    });
            const result = await response.json();
            console.log('Profile saved successfully:', result);
            // Here you can handle UI feedback that data was sent successfully
        } catch (error) {
            console.error('Error saving profile:', error);
            // Here you can handle UI feedback for errors
        }
    };
    
    return (
        <form className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full " onSubmit={handleSubmit}>
             {showSuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    Data Submitted Successfully!
                </div>
            )}
            <h2 className="text-2xl font-bold text-slate-50 text-center mb-6">Candidate Profile</h2>
            <div className="space-y-4">
                <div className="flex flex-col justify-center items-center gap-5">
                    <Avatar className='h-32 w-32'>
                        <AvatarImage src={formData.profilePicture}/>
                        <AvatarFallback><CgProfile className='text-slate-950' size={200}/></AvatarFallback>
                    </Avatar>
                    <label htmlFor="profilePictureInput"
                           className="bg-slate-900 text-[1rem] w-1/2 border-2 border-slate-50 font-medium flex justify-center items-center gap-1 text-slate-50 rounded-md h-10 cursor-pointer transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">
                        Select Profile Picture
                    </label>
                    <input id="profilePictureInput" type="file" onChange={handleFileChange} className="hidden"
                           accept="image/*"/>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="fullName" className='text-slate-50'>Full Name</Label>
                    <Input id="fullName" Icon={<MdOutlineAlternateEmail size={20}/>}
                           type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                           placeholder="Abubakar"
                           className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
    <Label htmlFor="email" className='text-slate-50'>Email Address</Label>
    <Input id="email"
           type="email"
           name="email"
           value={formData.email}
           onChange={handleChange}
           placeholder="example@gmail.com"
           className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
</LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="phone" className='text-slate-50'>Phone No.</Label>
                    <Input id="phone"
                           onChange={handleChange}
                           value={formData.phone}
                           name="phone"
                           placeholder="+923001234567"
                           type="name" className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
    <Label htmlFor="preferredJobLocation" className='text-slate-50'>Preferred Job Location</Label>
    <Input id="preferredJobLocation"
           type="text"
           name="preferredJobLocation"
           value={formData.preferredJobLocation}
           onChange={handleChange}
           placeholder="City, Country"
           className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
</LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="skills" className='text-slate-50'>Skills (Press Enter to add)</Label>
                    <Input
                        id='skills'
                        type="text"
                        name="skills"
                        value={formData.currentSkill}
                        onChange={handleSkillChange}
                        onKeyPress={handleSkillKeyPress}
                        className='text-slate-50 bg-slate-900 placeholder:text-slate-400'
                        placeholder="Add a skill and press Enter"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                                <div className="bg-slate-600 flex justify-center items-center text-slate-50 text-sm font-semibold px-2 py-1 rounded">
                                    {skill}
                                    <button
                                        onClick={() => handleDelete(index, 'skills')}
                                        className="ml-1 flex justify-center items-center text-slate-50 hover:text-slate-400 transition-all duration-300"
                                    >
                                    <IoIosCloseCircle/>
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </LabelInputContainer>
                <div className="flex gap-4">
                    <button type="button" onClick={() => setIsWorkExperienceModalOpen(true)}
                            className="bg-slate-900 border-2 border-slate-700 text-[1rem] w-full font-medium flex justify-center items-center gap-1 text-slate-50 rounded-md h-10 cursor-pointer transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">
                        + Add Work Experience
                    </button>
                </div>
                {formData.workExperiences.map((exp, index) => (
                    <div key={index} className="p-2 border rounded mt-2 text-slate-50 bg-slate-800 relative">
                        <button
                            onClick={() => handleDelete(index, 'workExperiences')}
                            className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                        >
                            <MdDelete className='text-slate-50' size={20}/>
                        </button>
                        <p><strong>{exp.title} | {exp.companyName}</strong></p>
                        <p><strong></strong> {exp.location} | <span className="italic">{exp.duration}</span></p>
                        <div style={{margin: '7.5px 0'}}></div>
                        <ul>
                            {exp.description.split('\n').map((line, i) => <li key={i}>{line}</li>)}
                        </ul>
                    </div>
                ))}
                <div className="flex gap-4">
                    <button type="button" onClick={() => setIsEducationModalOpen(true)}
                            className="bg-slate-900 text-[1rem] border-2 border-slate-700 w-full font-medium flex justify-center items-center gap-1 text-slate-50 rounded-md h-10 cursor-pointer transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50">
                        + Add Education
                    </button>
                </div>
                {formData.education.map((edu, index) => (
                    <div key={index} className="p-2 border rounded mt-2 text-slate-50 bg-slate-800 relative">
                        <button
                            onClick={() => handleDelete(index, 'education')}
                            className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                        >
                            <MdDelete className='text-slate-50' size={20} />
                        </button>
                        <p><strong>{edu.degree} | {edu.universityName}</strong></p>
                        <p><strong></strong> {edu.location} | <span className="italic"> {edu.duration}</span></p>
                        <p><strong></strong> {edu.description}</p>
                    </div>
                ))}
                <button
                    className="bg-slate-50 text-[1rem] flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-950 rounded-md h-10 font-medium transition-all duration-300 transform active:bg-slate-900 hover:bg-slate-950 hover:border-slate-50 hover:border-2 hover:text-slate-50"
                    type="submit"
                >
                    Submit
                    <PiSignInBold size={20}/>
                </button>

            </div>
            {isWorkExperienceModalOpen && (
                <Modal type="workExperience" onClose={() => setIsWorkExperienceModalOpen(false)}
                       onSave={addWorkExperience}>
                    {(handleChange) => (
                        <>
                            <Input id="title" Icon={<MdOutlineAlternateEmail size={20}/>}
                                   onChange={handleChange}
                                   placeholder="Title" name="title"
                                   type="text" className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
                            <Input id="companyName" Icon={<MdOutlineAlternateEmail size={20}/>}
                                   onChange={handleChange}
                                   placeholder="Company Name" name="companyName"
                                   type="text" className='text-slate-50 bg-slate-900 placeholder:text-slate-400 mt-4'/>
                            <Input id="location" Icon={<MdOutlineAlternateEmail size={20}/>}
                                   onChange={handleChange}
                                   placeholder="Location" name="location"
                                   type="text" className='text-slate-50 bg-slate-900 placeholder:text-slate-400 mt-4'/>

<Input
    id="duration"  
    Icon={<MdOutlineAlternateEmail size={20}/>}
    onChange={handleChange}  // This should be updating the correct part of the state
    placeholder="Duration (Ex: June 18 - Present)"
    name="duration"  
    type="text"
    className='text-slate-50 bg-slate-900 placeholder:text-slate-400 mt-4'
/>


                            <Textarea id="description" Icon={<MdOutlineAlternateEmail size={20}/>}
                                      onChange={handleChange}
                                      placeholder="Description (Press Enter for new line)" name="description"
                                      className='text-slate-50 bg-slate-900 placeholder:text-slate-400 mt-4' />
                        </>
                    )}
                </Modal>
            )}
            {isEducationModalOpen && (
                <Modal type="education" onClose={() => setIsEducationModalOpen(false)} onSave={addEducation}>
                    {(handleChange) => (
                        <>
                            <Input id="degree" Icon={<MdOutlineAlternateEmail size={20}/>}
                                   onChange={handleChange}
                                   placeholder="Degree and Major" name="degree"
                                   type="text" className='text-slate-50 bg-slate-900 placeholder:text-slate-400'/>
                            <Input id="universityName" Icon={<MdOutlineAlternateEmail size={20}/>}
                                   onChange={handleChange}
                                   placeholder="University Name" name="universityName"
                                   type="text" className='text-slate-50 bg-slate-900 placeholder:text-slate-400 mt-4'/>
                            <Input id="location" Icon={<MdOutlineAlternateEmail size={20}/>}
                                   onChange={handleChange}
                                   placeholder="Location" name="location"
                                   type="text" className='text-slate-50 bg-slate-900 placeholder:text-slate-400 mt-4'/>

    <Input
    id="duration"
    Icon={<MdOutlineAlternateEmail size={20}/>}
    onChange={handleChange}
    placeholder="Duration (Ex: June 18 - Present)"
    name="duration" 
    type="text"
    className='text-slate-50 bg-slate-900 placeholder:text-slate-400 mt-4'
        />


                            <Textarea id="description" Icon={<MdOutlineAlternateEmail size={20}/>}
                                      onChange={handleChange}
                                      placeholder="Description (Press Enter for new line)" name="description"
                                      className='text-slate-50 bg-slate-900 placeholder:text-slate-400 mt-4' />
                        </>
                    )}
                </Modal>
            )}

        </form>
    );
}

export default ProfileDetailsForm;

const LabelInputContainer = ({
                                 children,
                                 className,
                             }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
