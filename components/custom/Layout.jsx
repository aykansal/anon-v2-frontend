import { useState } from 'react';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: ${(props) => (props.sidebarOpen ? '280px' : '0')};
  transition: margin-left 0.3s ease;
  padding: 2rem;

  @media (max-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen ? '240px' : '0')};
  }
`;

const MenuButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <LayoutContainer>
      <MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '✕' : '☰'}
      </MenuButton>

      <Sidebar isOpen={sidebarOpen} />

      <MainContent sidebarOpen={sidebarOpen}>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
