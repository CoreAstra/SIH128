import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EcoIcon from '../components/EcoIcon';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    // Client-side validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    
    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }
    
    if (!formData.agreeToTerms) {
      setMessage({ type: 'error', text: 'Please agree to the terms and conditions' });
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          city: formData.city
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created successfully! Redirecting to dashboard...' });
        // Store the token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to create account' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupContainer>
      {/* Animated Background Elements */}
      <BackgroundElements>
        <FloatingElement 
          as={motion.div}
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '8%', left: '8%' }}
        >
          🌱
        </FloatingElement>
        <FloatingElement 
          as={motion.div}
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ top: '15%', right: '12%' }}
        >
          ♻️
        </FloatingElement>
        <FloatingElement 
          as={motion.div}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 12, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ bottom: '20%', left: '6%' }}
        >
          🍃
        </FloatingElement>
        <FloatingElement 
          as={motion.div}
          animate={{ 
            y: [0, -35, 0],
            rotate: [0, -18, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ bottom: '12%', right: '8%' }}
        >
          🌿
        </FloatingElement>
        <FloatingElement 
          as={motion.div}
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 8, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ top: '50%', left: '3%' }}
        >
          🌍
        </FloatingElement>
      </BackgroundElements>

      {/* Mobile Back Button */}
      <MobileBackButton
        as={motion.button}
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        ← Back to Home
      </MobileBackButton>

      <ContentWrapper>
        <FormContainer
          as={motion.div}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Desktop Back Button */}
          <BackButton
            as={motion.button}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            ← Back to Home
          </BackButton>
          {/* Header Section */}
          <HeaderSection
            as={motion.div}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <LogoContainer>
              <EcoIcon size="48" />
              <Logo>EcoConnect</Logo>
            </LogoContainer>
            <WelcomeText>Join the Green Revolution!</WelcomeText>
            <SubText>Create your account and start earning green rewards</SubText>
          </HeaderSection>

          {/* Message Display */}
          {message.text && (
            <MessageContainer
              as={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              type={message.type}
            >
              {message.text}
            </MessageContainer>
          )}

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            <InputRow>
              <InputGroup
                as={motion.div}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <InputLabel>Full Name</InputLabel>
                <StyledInput
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </InputGroup>
            </InputRow>

            <InputRow>
              <InputGroup
                as={motion.div}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <InputLabel>Email Address</InputLabel>
                <StyledInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </InputGroup>
              <InputGroup
                as={motion.div}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <InputLabel>Phone Number</InputLabel>
                <StyledInput
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone"
                  required
                />
              </InputGroup>
            </InputRow>

            <InputRow>
              <InputGroup
                as={motion.div}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <InputLabel>Password</InputLabel>
                <StyledInput
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  required
                />
              </InputGroup>
              <InputGroup
                as={motion.div}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <InputLabel>Confirm Password</InputLabel>
                <StyledInput
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </InputGroup>
            </InputRow>

            <InputRow>
              <InputGroup
                as={motion.div}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <InputLabel>City</InputLabel>
                <StyledInput
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  required
                />
              </InputGroup>
            </InputRow>

            <CheckboxGroup
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <CheckboxWrapper>
                <StyledCheckbox
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                />
                <CheckboxLabel>
                  I agree to the{' '}
                  <TermsLink href="#">Terms of Service</TermsLink> and{' '}
                  <TermsLink href="#">Privacy Policy</TermsLink>
                </CheckboxLabel>
              </CheckboxWrapper>
            </CheckboxGroup>

            <SignupButton
              as={motion.button}
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              disabled={loading}
              loading={loading}
            >
              {loading ? 'Creating Account...' : 'Create EcoConnect Account'}
            </SignupButton>
          </Form>

          {/* Login Link */}
          <LoginLink
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Already have an account?{' '}
            <LoginLinkText onClick={() => navigate('/login')}>
              Login here
            </LoginLinkText>
          </LoginLink>

          {/* Social Signup */}
          <SocialSection
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <Divider>
              <DividerLine />
              <DividerText>Or sign up with</DividerText>
              <DividerLine />
            </Divider>
            
            <SocialButtons>
              <SocialButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ background: 'linear-gradient(135deg, #4285F4, #34A853)' }}
              >
                <SocialIcon>🔍</SocialIcon>
                Google
              </SocialButton>
            </SocialButtons>
          </SocialSection>
        </FormContainer>

        {/* Decorative Elements */}
        <DecorativeCircle
          as={motion.div}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: '10%', right: '5%' }}
        />
        <DecorativeCircle
          as={motion.div}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.15, 0.08]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          style={{ bottom: '15%', left: '3%' }}
        />
        <DecorativeCircle
          as={motion.div}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          style={{ top: '60%', right: '2%' }}
        />
      </ContentWrapper>
    </SignupContainer>
  );
};

// Styled Components
const SignupContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(200, 230, 201, 0.4) 0%,
    rgba(165, 214, 167, 0.3) 25%,
    rgba(129, 199, 132, 0.4) 50%,
    rgba(102, 187, 106, 0.3) 75%,
    rgba(76, 175, 80, 0.4) 100%
  );
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-top: 2rem;
  }
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const FloatingElement = styled.div`
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.25;
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  top: -10px;
  left: -120px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid var(--primary-green);
  color: var(--primary-green);
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  white-space: nowrap;
  z-index: 10;

  &:hover {
    background: var(--primary-green);
    color: white;
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 992px) and (min-width: 769px) {
    left: -100px;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const MobileBackButton = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid var(--primary-green);
  color: var(--primary-green);
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  white-space: nowrap;
  margin-bottom: 1rem;
  align-self: flex-start;

  &:hover {
    background: var(--primary-green);
    color: white;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-green), var(--accent-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const WelcomeText = styled.h2`
  font-size: 1.4rem;
  color: var(--text-dark);
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  color: var(--text-light);
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  &:first-child,
  &:last-child {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    border-color: var(--primary-green);
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    background: white;
  }

  &::placeholder {
    color: #999;
  }
`;

const CheckboxGroup = styled.div`
  margin: 0.5rem 0;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--primary-green);
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.4;
`;

const TermsLink = styled.a`
  color: var(--primary-green);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const MessageContainer = styled.div`
  background: ${props => props.type === 'success' ? 
    'linear-gradient(135deg, #4CAF50, #66BB6A)' : 
    'linear-gradient(135deg, #f44336, #ef5350)'
  };
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const SignupButton = styled.button`
  background: ${props => props.disabled ? 
    'linear-gradient(135deg, #ccc, #999)' : 
    'linear-gradient(135deg, var(--primary-green), var(--secondary-green))'
  };
  border: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-top: 0.5rem;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    box-shadow: ${props => props.disabled ? 
      '0 8px 25px rgba(76, 175, 80, 0.3)' : 
      '0 12px 35px rgba(76, 175, 80, 0.4)'
    };
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-light);
`;

const LoginLinkText = styled.span`
  color: var(--primary-green);
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialSection = styled.div`
  margin-top: 1.5rem;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: #E0E0E0;
`;

const DividerText = styled.span`
  padding: 0 1rem;
  color: var(--text-light);
  font-size: 0.9rem;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const SocialIcon = styled.span`
  font-size: 1.2rem;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-green), var(--secondary-green));
  pointer-events: none;
  z-index: 1;
`;

export default Signup;