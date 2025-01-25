"use client"
import {useEffect, useState} from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { GoogleOAuthProvider } from '@react-oauth/google';

import { MessageContext } from '@/context/MessagesContext'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import axios from 'axios';

const Provider = ({children ,  ...props}) => {
const [message, setmessage] = useState()
const [userDets, setuserDets] = useState()

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
    <NextThemesProvider
    {...props}
 >
      {children}
    </NextThemesProvider>
    </MessageContext.Provider>
    </UserDetailsContext.Provider>
    </GoogleOAuthProvider>
  )
}

export default Provider