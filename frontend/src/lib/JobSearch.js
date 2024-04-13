import {jobs} from "@/lib/dummyData";
import {HOST} from "@/lib/utils";

export const searchJobs = async (querySearch, location, giveRecommended) => {
    let formattedSkills = "";
    if(giveRecommended) formattedSkills = querySearch.map(skill => encodeURIComponent(skill)).join('%20OR%20');
    const formattedLocation = encodeURIComponent(location);

    const url = `https://jsearch.p.rapidapi.com/search?query=${giveRecommended ? formattedSkills : querySearch}%20in%20${formattedLocation}&page=10&num_pages=10`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8a1326e09amshb6fa253ec61c44ap1a0580jsn385ebe3bbb1d',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return jobs.data; //replace with actual data

    } catch (error) {
        console.log("Abubakar",jobs.data)
        return jobs.data;
        console.error(error);
    }
};



export const getMostRecommendedJobs = async (jobsData, resumeData) => {
    try {
        const response = await fetch('http://localhost:8080/recommend-jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jobsData,
                resumeData
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommended jobs');
        }

        const recommendedJobs = await response.json();
        return recommendedJobs;
    } catch (error) {
        console.error('Error fetching recommended jobs:', error.message);
        return null;
    }
};

export const getMostRecommendedCandidates = async (candidatesData, jobDescription) => {
    try {
        const response = await fetch('http://localhost:8080/recommend-candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                candidatesData,
                jobDescription
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommended Candidate');
        }

        const recommendedCandidates = await response.json();
        return recommendedCandidates;
    } catch (error) {
        console.error('Error fetching recommended Candidates:', error.message);
        return null;
    }
};

export const getSearchedCandidates = async (candidatesData, searchQuery, location) => {
    try {
        const response = await fetch('http://localhost:8080/search-candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                candidatesData,
                searchQuery,
                location
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recommended Candidate');
        }

        const searchedCandidates = await response.json();
        return searchedCandidates;
    } catch (error) {
        console.error('Error fetching recommended Candidates:', error.message);
        return null;
    }
};
export async function allCandidates() {
    const response = await fetch(`${HOST}/candidates`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    try {
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching candidates:', error.message);
        return null;
    }
}