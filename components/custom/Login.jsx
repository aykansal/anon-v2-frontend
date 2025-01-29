'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ open, setOpenChange }) => {
  const userContext = useContext(UserDetailsContext);
  const { setuserDets } = userContext;
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: 'Bearer ' + tokenResponse?.access_token },
          }
        );
        if (!userInfo?.data) {
          console.error('Failed to fetch user info');
          return;
        }
        const data = await axios.post('/api/signup', {
          name: userInfo?.data.name,
          email: userInfo?.data.email,
          picture: userInfo?.data.picture,
        });
        console.log(data.data);

        const user = userInfo.data;
        console.log('this is the user data', user);

        setuserDets(user);
        if (typeof window !== 'undefined') {
          const user = userInfo.data;
          localStorage.setItem('userdets', user.email);
          console.log(localStorage.getItem('userdets'));
        }
      } catch (error) {
        console.error('Error during login or user creation:', error);
      } finally {
        setLoading(false);
        setOpenChange(false);
      }
    },
    onError: (errorResponse) =>
      console.log('Google Login Error:', errorResponse),
  });

  return (
    <Dialog open={open} onOpenChange={() => setOpenChange(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Continue With ANON 2.0
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center w-full">
          <p className="text-gray-500 text-sm">
            To use ANON you must log into an existing account or create a new
            one.
          </p>
          <Button
            onClick={googleLogin}
            className="bg-blue-500 hover:bg-blue-400 mt-8 mb-4 text-white"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign-in with Google'}
          </Button>
          <p className="text-gray-500 text-sm">
            By using ANON you agree to the collection of usage of data for
            analytics.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
