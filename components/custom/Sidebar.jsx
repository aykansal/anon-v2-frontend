import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: linear-gradient(135deg, #f6f8ff 0%, #f1f5ff 100%);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);
  padding: 2rem 1.5rem;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 240px;
  }
`;

const NavItem = styled(motion.div)`
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  color: #4a5568;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    color: #2d3748;
    transform: translateX(4px);
  }
`;

const Logo = styled.div`
  font-family: 'Merriweather', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 2rem;
  padding: 1rem;
`;

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: '-100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Sidebar = ({ isOpen }) => {
  const navItems = [
    { title: 'Dashboard', icon: '🏠' },
    { title: 'Profile', icon: '👤' },
    { title: 'Settings', icon: '⚙️' },
    { title: 'Help', icon: '❓' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <SidebarContainer
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
        >
          <Logo>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              AnonV2
            </motion.span>
          </Logo>

          {navItems.map((item, index) => (
            <NavItem
              key={index}
              variants={itemVariants}
              initial="closed"
              animate="open"
              exit="closed"
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ marginRight: '12px' }}>{item.icon}</span>
              {item.title}
            </NavItem>
          ))}
        </SidebarContainer>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
