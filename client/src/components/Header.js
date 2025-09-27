import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import EcoIcon from './EcoIcon';

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <EcoIcon size="40" />
          <LogoText>EcoConnect</LogoText>
        </Logo>
        
        <NavLinks
          as={motion.ul}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NavItem>
            <NavLink href="#home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#features">Features</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#rewards">Rewards</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#contact">Contact</NavLink>
          </NavItem>
        </NavLinks>

        <AuthButtons
          as={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <LoginBtn onClick={() => window.location.href = '/login'}>Login</LoginBtn>
          <SignupBtn onClick={() => window.location.href = '/signup'}>Sign Up</SignupBtn>
        </AuthButtons>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 0 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    height: 70px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-green), var(--accent-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: var(--primary-green);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-green);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const LoginBtn = styled.button`
  background: transparent;
  border: 2px solid var(--primary-green);
  color: var(--primary-green);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-green);
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

const SignupBtn = styled.button`
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  border: none;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

export default Header;