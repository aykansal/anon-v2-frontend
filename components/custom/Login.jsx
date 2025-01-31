'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useState } from 'react';

const Login = ({ open, setOpenChange }) => {
  const [loading] = useState(false);



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
