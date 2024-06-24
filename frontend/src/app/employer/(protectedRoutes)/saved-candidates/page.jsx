'use client';
import React, { useEffect, useState } from 'react';
import { cn, getCountryCode } from '@/lib/utils';
import { ImSpinner2 } from 'react-icons/im';
import { CandidateCard } from '@/components/ui/bento-grid';
import { Button, IconButton } from '@material-tailwind/react';
import {ArrowRightIcon, ArrowLeftIcon} from "@heroicons/react/24/outline";
import { useAppContext } from '@/Context/Candidate_Employer_Data';

function Page(props) {
    const [savedCandidates, setSavedCandidates] = useState([
        {
            _id: {
                $oid: '66141e7ae03adb773da13ba0'
            },
            candidateId: {
                $oid: '6613fe12c67946b9213620d6'
            },
            fullName: 'M.ABUBAKAR SIDDIQUE',
            email: 'dev.abubakarsiddique@gmail.com',
            phone: '+923494101609',
            preferredJobLocation: 'Lahore, Punjab, Pakistan',
            profession: 'Python Developer',
            skills: [
                'Problem Solving',
                'Communications',
                'HyperText Markup Language (HTML)',
                'Amazon S3',
                'Management',
                'Agile Software Development',
                'Amazon Web Services',
                'Firebase',
                'MongoDB',
                'Leadership',
                'Operations',
                'Cascading Style Sheets (CSS)',
                'Node.js',
                'Application Programming Interface (API)',
                '3D Printing',
                'Agile Methodology',
                'RESTful API',
                'Team Leadership',
                'Express.js',
                'GraphQL',
                'Web Development',
                'TypeScript',
                'Server-Side'
            ],
            workExperiences: [
                {
                    title: 'Frontend Developer',
                    companyName: 'Softpers',
                    location: 'Lahore, Punjab, Pakistan',
                    duration: '2023-03-01 - 2023-10-01',
                    description:
                        'Softpers is a leading software house, known for its rapid-paced development and innovative solutions in the realm of demanding projects.',
                    _id: {
                        $oid: '6613ff2cc67946b9213620e3'
                    }
                }
            ],
            education: [
                {
                    degree: 'B.S. in Software Engineering',
                    universityName: 'COMSATS Unversity',
                    location: 'Lahore, Punjab, Pakistan',
                    duration: '01/02/2020 - 08/04/2024',
                    description: 'Grade: 3.5',
                    _id: {
                        $oid: '6613ff2cc67946b9213620e4'
                    }
                }
            ],
            profilePictureUrl:
                'https://res.cloudinary.com/dy5yzo1ji/image/upload/v1712586539/cbdh12eadqojstsrnxgr.png',
            bookmarked: false,
            __v: {
                $numberInt: '0'
            }
        }
    ]);
    const { setCandidateCardData } = useAppContext();
    const [active, setActive] = useState(1);
    const [itemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const next = () => {
        if (active === 5) return;
        setActive(active + 1);
        setCurrentPage(currentPage + 1);
    };
    const numberButtonHandler = index => {
        setActive(index);
        setCurrentPage(index);
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        setCurrentPage(currentPage - 1);
    };

    const getItemProps = index => ({
        variant: active === index ? 'filled' : 'text',
        color: 'gray',
        onClick: () => setActive(index)
    });

    const currentData =
        savedCandidates && savedCandidates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={'flex flex-col p-8 gap-3 justify-center lg:justify-normal items-center lg:items-start'}>
            <h2 className={cn('text-3xl font-bold text-slate-50 dark:text-neutral-100', 'mt-10 mb-4')}>
                All Saved Candidates
            </h2>
            {!currentData ? (
                <ImSpinner2 size={30} className="animate-spin w-full text-slate-50" />
            ) : (
                currentData.map((candidateItem, index) => {
                    const [city, state, country] = candidateItem.preferredJobLocation.split(',').map(item => item.trim());
                    getCountryCode(country).then(countryCode => {
                        return (
                            <div className="p-1" key={candidateItem._id}>
                                <CandidateCard
                                    id={candidateItem._id}
                                    saved={false}
                                    fullName={candidateItem.fullName}
                                    email={candidateItem.email}
                                    phone={candidateItem.phone}
                                    profession={candidateItem.profession}
                                    city={city}
                                    state={state}
                                    country={countryCode}
                                    skills={candidateItem.skills}
                                    workExperiences={candidateItem.workExperiences}
                                    education={candidateItem.education}
                                    imageUrl={candidateItem.profilePictureUrl}
                                />
                            </div>
                        );
                    });
                })
            )}
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
                <Button
                    variant="text"
                    className="items-center justify-center gap-2 active:bg-slate-400 flex bg-slate-50 hover:bg-slate-200 text-slate-950 bg-opacity-100"
                    onClick={prev}
                    disabled={currentPage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                    <IconButton
                        className={
                            'items-center justify-center gap-2 active:bg-slate-400 flex bg-slate-50 hover:bg-slate-200 text-slate-950  font-bold bg-opacity-100'
                        }
                        variant={'filled'}
                    >
                        {currentPage}
                    </IconButton>
                </div>
                <Button
                    variant="text"
                    className="items-center justify-center gap-2 hover:bg-slate-200 active:bg-slate-400 flex bg-slate-50 text-slate-950 bg-opacity-100"
                    onClick={next}
                    disabled={currentPage === Math.ceil(savedCandidates?.length / itemsPerPage)}
                >
                    Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export default Page;
