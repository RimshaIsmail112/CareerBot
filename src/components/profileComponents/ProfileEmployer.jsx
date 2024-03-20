"use client";
import React, { useState } from 'react';

import { MdInsertLink } from 'react-icons/md'; // Import the icon components
import { ImFacebook2 } from "react-icons/im";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
function EmployerDetailsForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    address: '',
    contact: '',
    companyDescription: '',
    websiteURL: '',
    facebookURL: '',
    instagramURL: '',
    twitterURL: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Implement form submission logic here
  };

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Employer Details</h2>
      <div className="space-y-4">
        {/* Company Name Input */}
        <div>
          <label htmlFor="companyName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Company Name:</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Company Name" />
        </div>
        {/* Industry Input */}
        <div>
          <label htmlFor="industry" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Industry:</label>
          <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Industry" />
        </div>
        {/* Address Input */}
        <div>
          <label htmlFor="address" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Address" />
        </div>
        {/* Contact Input */}
        <div>
          <label htmlFor="contact" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Contact" />
        </div>
        {/* Company Description Input */}
        <div>
          <label htmlFor="companyDescription" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Company Description:</label>
          <textarea name="companyDescription" value={formData.companyDescription} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Company Description"></textarea>
        </div>
      

       {/* Website URL Input */}
       <div className="relative">
          <label htmlFor="websiteURL" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Website URL:</label>
          <div className="relative">
            <input type="url" name="websiteURL" value={formData.websiteURL} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white pl-10" placeholder="Website URL" />
            <span className="absolute inset-y-0 left-0 flex items-center pl-2"><MdInsertLink className="text-gray-500" /></span>
          </div>
        </div>
     
        <div className="relative">
          
          <label htmlFor="facebookURL" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Facebook URL:</label>
          <div className="relative">
            <input type="url" name="facebookURL" value={formData.facebookURL} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white pl-10" placeholder="Facebook URL" />
         <span className="absolute inset-y-0 left-0 flex items-center pl-2"><ImFacebook2 className="text-gray-500" /></span>
          </div>
        </div>
<div className="relative">
  <label htmlFor="instagramURL" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Instagram URL:</label>
  <div className="relative">
    <input type="url" name="instagramURL" value={formData.instagramURL} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white pl-10" placeholder="Instagram URL" />
    <span className="absolute inset-y-0 left-0 flex items-center pl-2"><FaInstagramSquare  className="text-gray-500" /></span>
  </div>
</div>
{/* Twitter URL Input */}
<div className="relative">
  <label htmlFor="twitterURL" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Twitter URL:</label>
  <div className="relative">
    <input type="url" name="twitterURL" value={formData.twitterURL} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white pl-10" placeholder="Twitter URL" />
    <span className="absolute inset-y-0 left-0 flex items-center pl-2"><FaXTwitter  className="text-gray-500" /></span>
  </div>
</div>

     
  


        {/* Submit Button */}
        <button type="submit" className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded transition duration-150 ease-in-out">Submit</button>
      </div>
      
    </form>
  );
}

export default EmployerDetailsForm;
