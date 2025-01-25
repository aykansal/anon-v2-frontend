"use client"

import { UserDetailsContext } from "@/context/UserDetailsContext"
import { useContext } from "react"

const ChatHistory = () => {
const context = useContext(UserDetailsContext)

const {userDets} = context

  return (
    <div>
               <h1 className='text-xl pl-4 font-semibold mt-2'>Your Chats</h1>
               {/* this is the chat container n */}
               <div className='w-full flex flex-col gap-5 mt-7 pl-3 text-2xl font-light text-gray-400'>
                              <h2 className='cursor-pointer hover:text-white transition-all duration-100'>Project#1</h2>
                              <h2 className='cursor-pointer hover:text-white transition-all duration-100'>Project#2</h2>
                              <h2 className='cursor-pointer hover:text-white transition-all duration-100'>Project#3</h2>
                              <h2 className='cursor-pointer hover:text-white transition-all duration-100'>Project#4</h2>
               </div>

    </div>
  )
}

export default ChatHistory