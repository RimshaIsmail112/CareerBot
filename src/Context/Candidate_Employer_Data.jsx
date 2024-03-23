'use client'
import React, {createContext, useEffect, useState} from 'react';

export const AppConext = createContext(null);
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
        <AppConext.Provider value={{candidateData, setCandidateData, employerData, setEmployerData, candidateID,setCandidateID}}>
            {children}
        </AppConext.Provider>
    );

}

export default CandidateEmployerData;