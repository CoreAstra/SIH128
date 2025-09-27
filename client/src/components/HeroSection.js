import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <HeroContainer id="home">
      {/* Animated Background Elements */}
      <BackgroundElements>
        <CloudElement 
          as={motion.div}
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '10%', left: '10%' }}
        />
        <CloudElement 
          as={motion.div}
          animate={{ x: [0, -15, 0], y: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '15%', right: '15%' }}
        />
        <LeafElement 
          as={motion.div}
          animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '20%', left: '5%' }}
        />
        <LeafElement 
          as={motion.div}
          animate={{ rotate: [0, -8, 0], y: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '25%', right: '8%' }}
        />
      </BackgroundElements>

      <ContentContainer>
        <LeftContent>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MainTitle>
              <GradientText>EcoConnect</GradientText>
            </MainTitle>
            
            <Subtitle>
              Swadeshi Green Rewards for an<br />
              <HighlightText>Atmanirbhar Bharat</HighlightText>
            </Subtitle>

            <Description>
              Join India's largest waste management ecosystem. Earn rewards for every green action, 
              connect with local recyclers, and contribute to a cleaner, sustainable future.
            </Description>

            <CTAButton
              as={motion.button}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onClick={() => navigate('/signup')}
            >
              Join the Green Movement
            </CTAButton>

            <StatsContainer
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <StatItem>
                <StatNumber>50K+</StatNumber>
                <StatLabel>Active Users</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>1M+</StatNumber>
                <StatLabel>KG Waste Recycled</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>500+</StatNumber>
                <StatLabel>Partner Collectors</StatLabel>
              </StatItem>
            </StatsContainer>
          </motion.div>
        </LeftContent>

        <RightContent>
          <IllustrationContainer
            as={motion.div}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Main Characters */}
            <CharactersGroup>
              <Character1
                as={motion.div}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <CharacterAvatar style={{ background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' }}>
                  👨‍💼
                </CharacterAvatar>
                <PhoneIcon>📱</PhoneIcon>
              </Character1>

              <Character2
                as={motion.div}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <CharacterAvatar style={{ background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)' }}>
                  👨‍🎓
                </CharacterAvatar>
                <RecycleIcon>♻️</RecycleIcon>
              </Character2>

              <Character3
                as={motion.div}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <CharacterAvatar style={{ background: 'linear-gradient(135deg, #96CEB4, #FFEAA7)' }}>
                  👩‍💻
                </CharacterAvatar>
                <BottleIcon>🍃</BottleIcon>
              </Character3>
            </CharactersGroup>

            {/* Floating Elements */}
            <FloatingElements>
              {/* Wind Turbines */}
              <WindTurbine
                as={motion.div}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ left: '10%', top: '10%' }}
              >
                🏭
              </WindTurbine>
              <WindTurbine
                as={motion.div}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ right: '15%', top: '15%' }}
              >
                🏭
              </WindTurbine>

              {/* Green Points Floating */}
              <GreenPoint
                as={motion.div}
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                style={{ top: '20%', left: '20%' }}
              >
                Green Points
              </GreenPoint>
              <GreenPoint
                as={motion.div}
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                style={{ top: '60%', right: '20%' }}
              >
                Green Points
              </GreenPoint>
              <GreenPoint
                as={motion.div}
                animate={{ 
                  y: [0, -18, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                style={{ bottom: '30%', left: '25%' }}
              >
                Green Points
              </GreenPoint>

              {/* Tree with rewards */}
              <RewardTree
                as={motion.div}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ bottom: '10%', right: '10%' }}
              >
                <TreeBase>🌳</TreeBase>
                <RewardBadge
                  as={motion.div}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏆
                </RewardBadge>
              </RewardTree>

              {/* River/Path */}
              <RiverPath
                as={motion.div}
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%']
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </FloatingElements>
          </IllustrationContainer>
        </RightContent>
      </ContentContainer>
    </HeroContainer>
  );
};

// Styled Components
const HeroContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(200, 230, 201, 0.3) 0%,
    rgba(165, 214, 167, 0.2) 25%,
    rgba(129, 199, 132, 0.3) 50%,
    rgba(102, 187, 106, 0.2) 75%,
    rgba(76, 175, 80, 0.3) 100%
  );
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  display: flex;
  align-items: center;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const CloudElement = styled.div`
  position: absolute;
  font-size: 3rem;
  opacity: 0.3;
  
  &::before {
    content: '☁️';
  }
`;

const LeafElement = styled.div`
  position: absolute;
  font-size: 2rem;
  opacity: 0.4;
  
  &::before {
    content: '🍃';
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    padding: 0 1rem;
  }
`;

const LeftContent = styled.div`
  z-index: 3;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, var(--primary-green), var(--accent-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  line-height: 1.3;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const HighlightText = styled.span`
  color: var(--primary-green);
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  border: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  cursor: pointer;
  margin-bottom: 3rem;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 35px rgba(76, 175, 80, 0.4);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 2rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-green);
  margin-bottom: 0.2rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
  font-weight: 500;
`;

const RightContent = styled.div`
  position: relative;
  height: 500px;

  @media (max-width: 768px) {
    height: 400px;
    order: -1;
  }
`;

const IllustrationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CharactersGroup = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 5;
`;

const Character1 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Character2 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -1rem;
`;

const Character3 = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
`;

const CharacterAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
`;

const PhoneIcon = styled.div`
  font-size: 1.2rem;
  background: white;
  padding: 0.3rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const RecycleIcon = styled.div`
  font-size: 1.2rem;
  background: white;
  padding: 0.3rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const BottleIcon = styled.div`
  font-size: 1.2rem;
  background: white;
  padding: 0.3rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const WindTurbine = styled.div`
  position: absolute;
  font-size: 2rem;
  opacity: 0.6;
`;

const GreenPoint = styled.div`
  position: absolute;
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
`;

const RewardTree = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TreeBase = styled.div`
  font-size: 3rem;
  margin-bottom: -1rem;
`;

const RewardBadge = styled.div`
  font-size: 1.5rem;
  background: white;
  padding: 0.3rem;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const RiverPath = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(33, 150, 243, 0.3) 25%,
    rgba(33, 150, 243, 0.5) 50%,
    rgba(33, 150, 243, 0.3) 75%,
    transparent 100%
  );
  background-size: 200% 100%;
  border-radius: 30px;
  opacity: 0.6;
`;

export default HeroSection;