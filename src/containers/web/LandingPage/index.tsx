'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FilledButton from '@/components/ui/buttons/FilledButton';
import ContactUs from '@/components/web/landing-page/ContactUs';
import ContactUsForm from '@/components/web/landing-page/ContactUsForm';
import DiscoverBookagri from '@/components/web/landing-page/DiscoverBookagri';
import AboutUs from '@/components/web/landing-page/AboutUs';
import DownloadApp from '@/components/web/landing-page/DownloadApp';
import Statistics from '@/components/web/landing-page/Statistics';

interface LandingPageProps {
  // Add props here when needed
}

// Styled Components
const HomePageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background-image: url('/images/home/BgHomePage.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 80vh;
    min-height: 500px;
  }

  @media (max-width: 480px) {
    height: 70vh;
    min-height: 400px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      183deg,
      rgba(0, 0, 0, 0.33) 8.42%,
      rgba(0, 0, 0, 0) 38.77%
    ),
    linear-gradient(92deg, rgba(0, 0, 0, 0.44) 18.39%, rgba(0, 0, 0, 0) 107.81%);
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
`;

const HeroContent = styled.div`
  position: absolute;
  z-index: 2;
  text-align: left;
  color: #ffffff;
  width: 100%;
  max-width: 800px;
  top: 65%;
  left: 6%;
  transform: translateY(-50%);
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 768px) {
    max-width: 90%;
    top: 60%;
    left: 5%;
    transform: translateY(-50%);
  }

  @media (max-width: 480px) {
    max-width: 95%;
    top: 65%;
    left: 5%;
    padding: 0 15px;
  }
`;

const HeroTitle = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  line-height: 68px;
  color: #ffffff;
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 42px;
    line-height: 50px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    line-height: 38px;
  }
`;

const HeroSubtitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 30px;
  color: #ffffff;
  margin: 0 0 40px 0;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 24px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 20px;
    margin: 0 0 30px 0;
  }
`;

const SearchButton = styled.button`
  background: #47c409;
  border-radius: 16px;
  border: none;

  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  padding: 20px 40px;
`;

const ContentSection = styled.div`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 15px;
  }
`;

const ContentTitle = styled.h2`
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 58px;
  color: #222222;
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 44px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 34px;
  }
`;

const ContentText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #999999;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <HomePageContainer>
      {/* Hero Section with Header */}
      <HeroSection>
        <HeroOverlay />
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <HeroContent>
          <HeroTitle>
            Connecting you with
            <br />a world of agritourism
          </HeroTitle>
          <HeroSubtitle>
            Book or become a host for agritourism experiences and rural stays
          </HeroSubtitle>
          <FilledButton
            text='Discover More'
            width='w-[200px]'
            height='h-[60px]'
            buttonType='button'
            isButton={false}
            path='/collections'
            className='rounded-custom-16'
          />
        </HeroContent>
      </HeroSection>

      {/* Statistics Section */}
      <Statistics />

      {/* About Us Section */}
      <AboutUs />

      {/* Discover Bookagri Section */}
      <DiscoverBookagri />

      {/* Download App Section */}
      <DownloadApp />

      {/* Contact Us Section */}
      <ContactUs />

      {/* Contact Us Form Section */}
      <ContactUsForm />

      {/* Footer */}
      <Footer />
    </HomePageContainer>
  );
};

export default LandingPage;
