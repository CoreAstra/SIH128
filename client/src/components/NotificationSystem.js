import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContainer = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  width: 100%;
`;

const NotificationItem = styled(motion.div)`
  background: ${props => {
    switch (props.type) {
      case 'success': return 'linear-gradient(135deg, #4CAF50, #45a049)';
      case 'info': return 'linear-gradient(135deg, #2196F3, #1976D2)';
      case 'warning': return 'linear-gradient(135deg, #FF9800, #F57C00)';
      case 'error': return 'linear-gradient(135deg, #f44336, #d32f2f)';
      default: return 'linear-gradient(135deg, #4CAF50, #45a049)';
    }
  }};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const NotificationIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-weight: 600;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.8;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (notification) => {
    const id = Date.now() + Math.random(); // Make ID more unique
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after 5 seconds with proper cleanup
    const timeoutId = setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);

    // Store timeout ID for potential cleanup
    newNotification.timeoutId = timeoutId;
  };

  useEffect(() => {
    // Add some sample notifications for demonstration
    const welcomeNotification = {
      type: 'success',
      title: '🎉 Welcome to EcoConnect!',
      message: 'Your eco-friendly journey starts here. Scan waste to earn points!'
    };

    const tipNotification = {
      type: 'info',
      title: '💡 Green Tip',
      message: 'Did you know? Recycling one aluminum can saves enough energy to power a TV for 3 hours!'
    };

    const welcome = setTimeout(() => addNotification(welcomeNotification), 1000);
    const tip = setTimeout(() => addNotification(tipNotification), 3000);

    // Create a global function to add notifications
    window.addEcoNotification = addNotification;

    return () => {
      clearTimeout(welcome);
      clearTimeout(tip);
      delete window.addEcoNotification;
      // Clear any remaining notification timeouts
      notifications.forEach(notification => {
        if (notification.timeoutId) {
          clearTimeout(notification.timeoutId);
        }
      });
    };
  }, []);

  // Cleanup effect for when notifications change
  useEffect(() => {
    return () => {
      notifications.forEach(notification => {
        if (notification.timeoutId) {
          clearTimeout(notification.timeoutId);
        }
      });
    };
  }, [notifications]);

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '🔔';
    }
  };

  return (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Clear timeout if exists
              if (notification.timeoutId) {
                clearTimeout(notification.timeoutId);
              }
              removeNotification(notification.id);
            }}
          >
            <NotificationIcon>
              {getIcon(notification.type)}
            </NotificationIcon>
            <NotificationContent>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationMessage>{notification.message}</NotificationMessage>
            </NotificationContent>
            <CloseButton 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Clear timeout if exists
                if (notification.timeoutId) {
                  clearTimeout(notification.timeoutId);
                }
                removeNotification(notification.id);
              }}
              title="Close notification"
            >
              ×
            </CloseButton>
          </NotificationItem>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
};

export default NotificationSystem;