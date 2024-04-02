// profile/candidate/page.jsx

import React from 'react';
import PortfolioLayout from '@/components/portfolioComponent/PortfolioLayout'; 
import CandidatePortfolio from '@/components/portfolioComponent/CandidatePortfolio'; 

export default function CandidateProfilePage() {
  return (
    <PortfolioLayout>
      < CandidatePortfolio/>
    </PortfolioLayout>
  );
}
