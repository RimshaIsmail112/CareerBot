// Candidate_Employer_Data.jsx


'use client'
import React, {createContext, useEffect, useState} from 'react';

export const AppContext = createContext(null);
function CandidateEmployerData({children}) {
    const [candidateID, setCandidateID] = useState(null);
    const [candidateData, setCandidateData] = useState({});
    const [employerData, setEmployerData] = useState({});

    const getCandidateData = async () => {
        const response = await fetch("/api/candidate");
        const data = await response.json();
        setCandidateData(data);
    }

    useEffect(() => {

    }, []);
    return (
        <AppContext.Provider value={{candidateData, setCandidateData, employerData, setEmployerData, candidateID,setCandidateID}}>
            {children}
        </AppContext.Provider>
    );

}

export default CandidateEmployerData;

