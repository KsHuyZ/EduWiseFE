import React from 'react';

import BecomeSection from '@/feature/landing/components/become-section';
import BlogSection from '@/feature/landing/components/blog-section';
import CategorySection from '@/feature/landing/components/category-section';
import CompanySection from '@/feature/landing/components/company-section';
import FeatureSection from '@/feature/landing/components/feature-section';
import HeroSection from '@/feature/landing/components/hero-section';
import IntroduceSection from '@/feature/landing/components/introduce-section';
import MentorSection from '@/feature/landing/components/mentor-section';
import TrendingSection from '@/feature/landing/components/trending-section';

const LandingPage = () => {
  return (
    <div className='flex flex-col space-y-14 min-h-[calc(100vh-80px)]'>
      <HeroSection />
      <CategorySection />
      <FeatureSection />
      <IntroduceSection />
      <TrendingSection />
      <CompanySection />
      <MentorSection />
      <BecomeSection />
      <BlogSection />
    </div>
  );
};

export default LandingPage;
