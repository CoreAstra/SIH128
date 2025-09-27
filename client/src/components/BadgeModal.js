import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  color: #2d5016;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const BadgeShowcase = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const LargeBadge = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4A574, #C49A6C);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 10px 30px rgba(212, 165, 116, 0.4);
`;

const BadgeDescription = styled.p`
  color: #666;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  font-weight: 500;
  
  &:hover {
    background: #45a049;
  }
`;

const BadgeModal = ({ badge, isOpen, onClose }) => {
  if (!isOpen || !badge) return null;

  const badgeDescriptions = {
    'Eco Warrior': 'You\'ve shown exceptional commitment to environmental protection by consistently participating in eco-friendly activities.',
    'Recycler': 'Your dedication to recycling has made a significant impact on reducing waste in your community.',
    'Green Starter': 'Welcome to the green movement! You\'ve taken your first steps towards a sustainable lifestyle.',
    'Champion': 'Outstanding achievement! You\'ve reached the top tier of environmental consciousness.',
    'Earth Saver': 'Your actions have directly contributed to saving our planet through conscious choices.',
    'Solar Hero': 'You\'ve embraced renewable energy and solar solutions for a cleaner future.'
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalTitle>{badge.name} Badge</ModalTitle>
        <BadgeShowcase>
          <LargeBadge>{badge.icon}</LargeBadge>
        </BadgeShowcase>
        <BadgeDescription>
          {badgeDescriptions[badge.name] || 'Keep up the great work on your environmental journey!'}
        </BadgeDescription>
        <CloseButton onClick={onClose}>
          Continue Your Eco Journey
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BadgeModal;