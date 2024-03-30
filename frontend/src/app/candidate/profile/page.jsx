// profile/candidate/page.jsx

import React from 'react';
import ProfileLayout from '@/components/profileComponents/ProfileLayout'; // Adjust this path as needed
import ProfileDetails from '@/components/profileComponents/ProfileCandidate'; // Adjust this path as needed

export default function CandidateProfilePage() {
  return (
    <ProfileLayout>
      <ProfileDetails />
    </ProfileLayout>
  );
}
