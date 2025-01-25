"use client"
import {useEffect, useState} from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { GoogleOAuthProvider } from '@react-oauth/google';

import { MessageContext } from '@/context/MessagesContext'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import axios from 'axios';
import Appbar from '@/components/custom/Appbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ActionContext } from '@/context/ActionContext';

const Provider = ({children ,  ...props}) => {
const [message, setmessage] = useState()
const [userDets, setuserDets] = useState()
const [action , setAction] = useState()

useEffect(() => {
  const fetchUser =async()=>{
    console.log("searching the user")
    const email = localStorage.getItem("userdets")
    console.log(email)
    const response = await axios.post("/api/checkuser",{
      email:email
    })
    if(response.status === 200) {
      console.log(response.data.user)
      setuserDets(response.data.user)
      console.log("the user is already present")
    }
  } 
  fetchUser()
  }, [])


  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
    <UserDetailsContext.Provider value={{userDets , setuserDets}}>
    <MessageContext.Provider value={{message,setmessage}}>
      <ActionContext.Provider value={{action , setAction}}>
    <NextThemesProvider
    {...props}
 >
     <SidebarProvider defaultOpen={false}>
    <Appbar/>
      {children}
     </SidebarProvider>
    </NextThemesProvider>
    </ActionContext.Provider>
    </MessageContext.Provider>
    </UserDetailsContext.Provider>
    </GoogleOAuthProvider>
  )
}

export default Provider