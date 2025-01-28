"use client";

import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { MessageContext } from '@/context/MessagesContext';
import { Menu, TimerReset } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { ActionContext } from '@/context/ActionContext';
import { toast } from '@/hooks/use-toast';
import { time } from 'framer-motion';
import { Description } from '@radix-ui/react-dialog';

const Navbar = () => {
  const context = useContext(UserDetailsContext);
  const msgContext = useContext(MessageContext);
  const actionContext = useContext(ActionContext)
  const {toggleSidebar} = useSidebar()
  const { userDets } = context;
  const { message } = msgContext;
  const {setAction} = actionContext

  const OnAction = (actionType) =>{
    setAction({
      Action:actionType,
      timeStamp : Date.now()
    })

  
    
  }

  return (
    <div className="w-full px-12 flex items-center justify-between">
      <div>
        <Image width={85} height={85} src="/logo.jpeg" alt="Logo" />
      </div>

      {userDets &&  message?.length > 0 ? 
     (
        <div className="w-[50%] flex justify-between">
          <div className='flex  items-center gap-4'>

          <Button onClick={()=>OnAction("export") } variant="ghost ">Export</Button>
          <Button onClick={()=>OnAction("deploy")} className="bg-blue-500 text-white hover:bg-blue-400">Deploy</Button>
          </div>
          
          <div className='cursor-pointer'>
            <Menu onClick={toggleSidebar}/>
          </div>
        </div>
      ) : (
         (
          <div className="flex  items-center gap-4">
            <Button variant="ghost">Sign Up</Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-400">Get Started</Button>
          </div>
        )
      )}
    </div>
  );
};

export default Navbar;
