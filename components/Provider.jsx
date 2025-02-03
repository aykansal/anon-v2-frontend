'use client';
import { useState } from 'react';
import Appbar from '@/components/custom/Appbar';
import { ActionContext } from '@/context/ActionContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MessageContext } from '@/context/MessagesContext';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const Provider = ({ children, ...props }) => {
  const [message, setmessage] = useState();
  const [userDets, setuserDets] = useState();
  const [action, setAction] = useState();

  return (
    <UserDetailsContext.Provider value={{ userDets, setuserDets }}>
      <MessageContext.Provider value={{ message, setmessage }}>
        <ActionContext.Provider value={{ action, setAction }}>
          <NextThemesProvider {...props}>
            <SidebarProvider defaultOpen={false}>
              <Appbar />
              {children}
            </SidebarProvider>
          </NextThemesProvider>
        </ActionContext.Provider>
      </MessageContext.Provider>
    </UserDetailsContext.Provider>
  );
};

export default Provider;
