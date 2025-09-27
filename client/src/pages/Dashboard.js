import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import EcoIcon from '../components/EcoIcon';
import BadgeModal from '../components/BadgeModal';
import NotificationSystem from '../components/NotificationSystem';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #8FBC8F 0%, #98D982 50%, #66BB6A 100%);
  position: relative;
  overflow-x: hidden;
  padding: 0;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 5%;
    width: 100px;
    height: 100px;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff30"><path d="M12 2L13.09 8.26L18 7L16.74 12.74L22 14L15.74 15.26L17 21L11.26 19.74L10 24L8.74 19.74L3 21L4.26 15.26L0 14L6.26 12.74L5 7L10.91 8.26L12 2Z"/></svg>') no-repeat center;
    background-size: contain;
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
  }
  
  &::after {
    content: '🍃';
    position: absolute;
    bottom: 20%;
    right: 10%;
    font-size: 3rem;
    opacity: 0.15;
    animation: float 8s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }
`;

const TopNavbar = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  margin: 1rem;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d5016;
`;

const NavTitle = styled.h1`
  color: #2d5016;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(45, 80, 22, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(45, 80, 22, 0.2);
    transform: scale(1.1);
  }
`;

const LogoutButton = styled(motion.button)`
  background: #ff6b6b;
  border: none;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
`;

const MainContent = styled(motion.div)`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const BadgesCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const CardTitle = styled.h2`
  color: #2d5016;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const GreenPointsDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const GreenPointsLeft = styled.div`
  flex: 1;
`;

const GreenPointsNumber = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #2d5016;
  margin: 0;
`;

const GreenPointsLabel = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

const CircularProgress = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const ProgressRing = styled.svg`
  width: 100px;
  height: 100px;
  transform: rotate(-90deg);
`;

const ProgressCircle = styled.circle`
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 8;
`;

const ProgressCircleActive = styled.circle`
  fill: none;
  stroke: #4CAF50;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: ${props => `${props.percentage * 2.51} 251`};
  transition: stroke-dasharray 1s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  font-weight: 600;
  color: #4CAF50;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d5016;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
`;

const ScannerSection = styled.div`
  background: rgba(76, 175, 80, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1.5rem 0;
`;

const ScannerTitle = styled.h3`
  color: #2d5016;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const ScanButton = styled(motion.button)`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
  }
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Badge = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.earned ? 'linear-gradient(135deg, #D4A574, #C49A6C)' : 'rgba(200, 200, 200, 0.3)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.earned ? '0 5px 15px rgba(212, 165, 116, 0.3)' : 'none'};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ExtraBadgesRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const SmallBadge = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4A574, #C49A6C);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(212, 165, 116, 0.3);
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ProgramsSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ProgramCard = styled(motion.div)`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 20px;
  padding: 1.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(76, 175, 80, 0.3);
  }
`;

const ProgramImage = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ProgramTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
`;

const ProgramDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  opacity: 0.9;
`;

const RewardsSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const RewardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  align-items: end;
  margin-bottom: 1.5rem;
`;

const RewardItem = styled(motion.div)`
  text-align: center;
  cursor: pointer;
  padding: 1rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(76, 175, 80, 0.1);
    transform: translateY(-3px);
  }
`;

const RewardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const RewardName = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.3rem;
`;

const RewardPoints = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #4CAF50;
`;

const RedeemButton = styled(motion.button)`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
  }
`;

const ActivityFeed = styled.div`
  margin-top: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ActivityText = styled.div`
  flex: 1;
  font-size: 0.9rem;
  color: #666;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: #999;
`;

const ViewAllButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #4CAF50;
  color: #4CAF50;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 500;
  margin-left: auto;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    background: #4CAF50;
    color: white;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greenPoints, setGreenPoints] = useState(1450);
  const [currentRank, setCurrentRank] = useState(2);
  const [impactData, setImpactData] = useState({ co2Saved: 1200, percentage: 85 });
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleScanWaste = () => {
    // Simulate scanning process
    if (window.addEcoNotification) {
      window.addEcoNotification({
        type: 'info',
        title: '📱 Scanner Loading...',
        message: 'Preparing AI waste identification system...'
      });
      
      setTimeout(() => {
        window.addEcoNotification({
          type: 'success',
          title: '� Scanner Ready!',
          message: 'AI scanner will be available in the next update. Stay tuned!'
        });
      }, 2000);
    }
  };

  const handleBadgeClick = (badge) => {
    if (badge.earned) {
      setSelectedBadge(badge);
      setShowBadgeModal(true);
    } else {
      if (window.addEcoNotification) {
        window.addEcoNotification({
          type: 'warning',
          title: '🔒 Badge Locked',
          message: `Keep up your eco activities to unlock the ${badge.name} badge!`
        });
      }
    }
  };

  const handleRewardClick = (reward) => {
    if (window.addEcoNotification) {
      window.addEcoNotification({
        type: 'info',
        title: '🛍️ Reward Selected',
        message: `You selected ${reward.name} for ${reward.points}. Marketplace coming soon!`
      });
    }
  };

  const handleProgramClick = (program) => {
    if (window.addEcoNotification) {
      window.addEcoNotification({
        type: 'success',
        title: '🌱 Program Interest',
        message: `You showed interest in "${program.title}". Registration opens soon!`
      });
    }
  };

  const badges = [
    { icon: '🍃', name: 'Eco Warrior', earned: true },
    { icon: '♻️', name: 'Recycler', earned: true },
    { icon: '�', name: 'Green Starter', earned: true },
    { icon: '🏆', name: 'Champion', earned: false },
    { icon: '🌍', name: 'Earth Saver', earned: true },
    { icon: '☀️', name: 'Solar Hero', earned: false }
  ];

  const programs = [
    { 
      title: 'Community Clean-up Drive',
      duration: '12 minutes',
      rating: 5,
      image: '🏞️'
    },
    {
      title: 'Tree Planting Initiative', 
      duration: 'Tree Planting Initiative',
      rating: 5,
      image: '�'
    }
  ];

  const rewards = [
    { icon: '🍃', name: 'Green Points', points: '88.5' },
    { icon: '🏺', name: 'Local Artisanal', points: '25 $' },
    { icon: '�', name: 'Green Points', points: '88.5' },
    { icon: '☕', name: 'Local Artisanal', points: '580' },
    { icon: '🧺', name: 'Local Artisanal', points: '60' },
    { icon: '♻️', name: 'Green Points', points: '50' },
    { icon: '📦', name: 'Local Artisanal', points: '40' }
  ];

  const recentActivity = [
    { icon: '♻️', text: 'Recycled 5 plastic bottles', time: '2 hours ago' },
    { icon: '🌱', text: 'Earned 50 green points', time: '4 hours ago' },
    { icon: '🏆', text: 'Achieved Eco Warrior badge', time: '1 day ago' },
    { icon: '📱', text: 'Scanned organic waste', time: '2 days ago' }
  ];

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: '#2d5016',
          fontSize: '1.5rem'
        }}>
          Loading your eco dashboard... 🌱
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <BackgroundElements />
      
      <TopNavbar
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Logo>
          <EcoIcon size={32} />
          EcoConnect
        </Logo>
        <NavTitle>Dashboard</NavTitle>
        <NavActions>
          <NavIcon>🔍</NavIcon>
          <NavIcon>🔔</NavIcon>
          <NavIcon>👤</NavIcon>
          <LogoutButton
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </LogoutButton>
        </NavActions>
      </TopNavbar>

      <MainContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <DashboardGrid>
          <ActivityCard
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CardTitle>My Green Activity Overview</CardTitle>
            <GreenPointsDisplay>
              <GreenPointsLeft>
                <GreenPointsNumber>{greenPoints.toLocaleString()}</GreenPointsNumber>
                <GreenPointsLabel>Total Green Points</GreenPointsLabel>
              </GreenPointsLeft>
              <CircularProgress>
                <ProgressRing>
                  <ProgressCircle cx="50" cy="50" r="40" />
                  <ProgressCircleActive 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    percentage={impactData.percentage}
                  />
                </ProgressRing>
                <ProgressText>{impactData.percentage}%</ProgressText>
              </CircularProgress>
            </GreenPointsDisplay>
            
            <StatsRow>
              <StatItem>
                <StatValue>Current Rank: #{currentRank}</StatValue>
                <StatLabel>in Neighbourhood</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>Green Impact:</StatValue>
                <StatLabel>{impactData.co2Saved}kg CO2 Saved</StatLabel>
              </StatItem>
            </StatsRow>

            <ScannerSection>
              <ScannerTitle>Snap & Segregate</ScannerTitle>
              <ScanButton
                onClick={handleScanWaste}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Open Scanner
              </ScanButton>
            </ScannerSection>

            <CardTitle style={{ fontSize: '1rem', marginTop: '1.5rem' }}>📈 Recent Activity</CardTitle>
            <ActivityFeed>
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index}>
                  <ActivityIcon>{activity.icon}</ActivityIcon>
                  <ActivityText>{activity.text}</ActivityText>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityItem>
              ))}
            </ActivityFeed>
          </ActivityCard>

          <BadgesCard
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CardTitle>My Badges</CardTitle>
            <BadgeGrid>
              {badges.map((badge, index) => (
                <Badge 
                  key={index}
                  earned={badge.earned}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={badge.name}
                  onClick={() => handleBadgeClick(badge)}
                >
                  {badge.icon}
                </Badge>
              ))}
            </BadgeGrid>
            <div style={{ marginTop: '1rem' }}>
              <CardTitle style={{ fontSize: '1rem' }}>My Badges</CardTitle>
              <ExtraBadgesRow>
                {badges.filter(b => b.earned).map((badge, index) => (
                  <SmallBadge 
                    key={`extra-${index}`}
                    whileHover={{ scale: 1.1 }}
                    title={badge.name}
                    onClick={() => handleBadgeClick(badge)}
                  >
                    {badge.icon}
                  </SmallBadge>
                ))}
              </ExtraBadgesRow>
            </div>
          </BadgesCard>
        </DashboardGrid>

        <ProgramsSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CardTitle>Upcoming Green Programs</CardTitle>
          <ProgramGrid>
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProgramClick(program)}
              >
                <ProgramImage>{program.image}</ProgramImage>
                <ProgramTitle>{program.title}</ProgramTitle>
                <ProgramDetails>
                  <span>{'⭐'.repeat(program.rating)} {program.duration}</span>
                </ProgramDetails>
              </ProgramCard>
            ))}
          </ProgramGrid>
          <ViewAllButton whileHover={{ scale: 1.05 }}>
            View All Programs
          </ViewAllButton>
        </ProgramsSection>

        <RewardsSection
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <CardTitle>Green Rewards Marketplace</CardTitle>
          <RewardGrid>
            {rewards.map((reward, index) => (
              <RewardItem
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRewardClick(reward)}
              >
                <RewardIcon>{reward.icon}</RewardIcon>
                <RewardName>{reward.name}</RewardName>
                <RewardPoints>🪙 {reward.points}</RewardPoints>
              </RewardItem>
            ))}
          </RewardGrid>
          <RedeemButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🍃 Redeem
          </RedeemButton>
        </RewardsSection>
      </MainContent>

      <NotificationSystem />
      <BadgeModal 
        badge={selectedBadge} 
        isOpen={showBadgeModal} 
        onClose={() => setShowBadgeModal(false)} 
      />
    </DashboardContainer>
  );
};

export default Dashboard;