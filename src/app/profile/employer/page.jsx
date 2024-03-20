// profile/candidate/page.jsx

import React from 'react';
import ProfileLayout from '@/components/profileComponents/ProfileLayout'; // Adjust this path as needed
import ProfileEmployer from '@/components/profileComponents/ProfileEmployer'; // Adjust this path as needed

export default function CandidateProfilePage() {
  return (
    <ProfileLayout>
      <ProfileEmployer />
    </ProfileLayout>
  );
}



// export default function CandidateProfilePage() {
//     return <ProfileLayout />
// }