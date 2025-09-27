import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';

const LandingPage = () => {
  return (
    <PageContainer>
      <Header />
      <HeroSection />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
`;

export default LandingPage;