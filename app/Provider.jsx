'use client';
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MessageContext } from '@/context/MessagesContext';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import Appbar from '@/components/custom/Appbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ActionContext } from '@/context/ActionContext';
import Login from '@/components/custom/Login';

const Provider = ({ children, ...props }) => {
  const [message, setmessage] = useState();
  const [userDets, setuserDets] = useState();
  const [action, setAction] = useState();
  const [openSignupDialog, setopenSignupDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('userdets');
      if (!email) {
        setopenSignupDialog(true);
        return;
      }

      try {
        const response = await axios.post('/api/checkuser', {
          email,
        });
        if (response.status === 200) {
          setuserDets(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setopenSignupDialog(true);
      }
    };
    fetchUser();
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
        <AuthContext.Provider value={{ openSignupDialog, setopenSignupDialog }}>
          <UserDetailsContext.Provider value={{ userDets, setuserDets }}>
            <MessageContext.Provider value={{ message, setmessage }}>
              <ActionContext.Provider value={{ action, setAction }}>
                <NextThemesProvider {...props}>
                  <SidebarProvider defaultOpen={false}>
                    <Appbar />
                    <Login
                      open={openSignupDialog}
                      setOpenChange={setopenSignupDialog}
                    />
                    {children}
                  </SidebarProvider>
                </NextThemesProvider>
              </ActionContext.Provider>
            </MessageContext.Provider>
          </UserDetailsContext.Provider>
        </AuthContext.Provider>      
    </GoogleOAuthProvider>
  );
};

export default Provider;
