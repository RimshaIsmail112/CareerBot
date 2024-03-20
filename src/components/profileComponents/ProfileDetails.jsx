"use client";

import React, { useState } from 'react';

function Modal({ onClose, onSave, type, children }) {
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
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(entry);
    onClose(); // Close modal on save
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
        {children(handleChange)}
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Save</button>
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">Cancel</button>
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
    skills: [],
    currentSkill: '',
    workExperiences: [],
    education: [],
    profilePicture: null
  });
  const [isWorkExperienceModalOpen, setIsWorkExperienceModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      education: [...prevState.education, educationEntry]
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Implement form submission logic here
  };

  return (
   
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg "  onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Candidate Profile</h2>
      <div className="space-y-4">

       <div className="text-center">
        {formData.profilePicture ? (
          <div className="inline-block relative">
            <img src={formData.profilePicture} alt="Profile" className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button onClick={deleteProfilePicture} className="text-white">
                Delete
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor="profilePictureInput" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Select Pic
          </label>
        )}
        <input id="profilePictureInput" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
      </div>

        {/* Full Name Input */}
        <div>
          <label htmlFor="fullName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">Full Name:</label>
          <input type="name" name="fullName" value={formData.fullName} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" placeholder="Sohaib Zahid" />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Phone:</label>
          <input type="text" id="phone-input" aria-describedby="helper-text-explanation" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
        </div>

        {/* Preferred Job Location Input */}
        <div>
          <label htmlFor="preferredJobLocation" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">Preferred Job Location:</label>
          <input type="text" name="preferredJobLocation" value={formData.preferredJobLocation} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="e.g Lahore " />
        </div>

        {/* Skills Input */}
        <div>
          <label htmlFor="skills" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">Skills (Press Enter to add):</label>
          <input type="text" name="skills" value={formData.currentSkill} onChange={handleSkillChange} onKeyPress={handleSkillKeyPress} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Add a skill and press Enter" />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Work Experience and Education Modals Invocation */}
        <div className="flex gap-4">
          <button type="button" onClick={() => setIsWorkExperienceModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            + Add Work Experience
          </button>
        </div>
        {/* Display Work Experiences */}
        {formData.workExperiences.map((exp, index) => (
          <div key={index} className="p-2 border rounded mt-2 bg-gray-100">
            <p><strong>{exp.title} | {exp.companyName}</strong></p>
            <p><strong></strong> {exp.location} | <span className="italic">{exp.duration}</span></p>
            <div style={{ margin: '7.5px 0' }}></div>
            <ul>
              {exp.description.split('\n').map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
        ))}
        {/* Work Experience and Education Modals Invocation */}
        <div className="flex gap-4">
          <button type="button" onClick={() => setIsEducationModalOpen(true)} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-11 rounded">
            + Add Education
          </button>
        </div>
        {formData.education.map((edu, index) => (
  <div key={index} className="p-2 border rounded mt-2 bg-gray-100">
    <p><strong>{edu.degree} | {edu.universityName}</strong></p>
    <p><strong></strong> {edu.location} | <span className="italic"> {edu.date}</span></p>
    <p><strong></strong> {edu.description}</p>
  </div>
))}
        {/* Submit Button */}
        <button type="submit" className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded transition duration-150 ease-in-out">
          Submit
        </button>
      </div>
      {/* Work Experience Modal */}
      {isWorkExperienceModalOpen && (
        <Modal type="workExperience" onClose={() => setIsWorkExperienceModalOpen(false)} onSave={addWorkExperience}>
          {(handleChange) => (
            <>
              <input placeholder="Title" name="title" className="border p-2 w-full" onChange={handleChange} />
              <input placeholder="Company Name" name="companyName" className="border p-2 w-full mt-2" onChange={handleChange} />
              <input placeholder="Location" name="location" className="border p-2 w-full mt-2" onChange={handleChange} />
              <input placeholder="Duration (Ex: June 18 - Present)" name="duration" className="border p-2 w-full mt-2" onChange={handleChange} />
              <textarea placeholder="Description (Press Enter for new line)" name="description" className="border p-2 w-full mt-2" onChange={handleChange} />
            </>
          )}
        </Modal>
      )}
   {isEducationModalOpen && (
  <Modal type="education" onClose={() => setIsEducationModalOpen(false)} onSave={addEducation}>
    {(handleChange) => (
      <>
        <input placeholder="Degree and Major" name="degree" className="border p-2 w-full" onChange={handleChange} />
        <input placeholder="University Name" name="universityName" className="border p-2 w-full mt-2" onChange={handleChange} />
        <input placeholder="Location" name="location" className="border p-2 w-full mt-2" onChange={handleChange} />
        <input placeholder="Date (Ex: 2020-2024)" name="date" className="border p-2 w-full mt-2" onChange={handleChange} />
        <textarea placeholder="Description" name="description" className="border p-2 w-full mt-2" onChange={handleChange} />
      </>
    )}
  </Modal>
)}

    </form>
  );
}

export default ProfileDetailsForm;
