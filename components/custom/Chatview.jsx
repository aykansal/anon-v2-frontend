"use client"

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { MessageContext } from '@/context/MessagesContext'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import { ArrowRight, Link, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Markdown from "react-markdown"
import Prompt from '@/data/Prompt'

const Chatview = () => {

  const countToken = (inputtext)=>{
    return inputtext.trim().split(/\s+/).filter(word=>word).length
  }

  const { message, setmessage } = useContext(MessageContext)
  const { userDets } = useContext(UserDetailsContext)
  const [userInput, setuserInput] = useState('')
  const [loading, setloading] = useState(false)
  const [responseReceived, setResponseReceived] = useState(false)


  useEffect(() => {
    getMessages()
  }, [])


  const getMessages = async () => {
    const id = localStorage.getItem("chatId")
    console.log(id)
    try {
      const response = await axios.get("/api/messages/getmessages/" + id)
      console.log(response.data.message)
      setmessage(response.data.message)
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
}

  useEffect(() => {
    const getAiresponse = async () => {
      setloading(true)
      const PROMPT = JSON.stringify(message) + Prompt.CHAT_PROMPT
      try {
        const result = await axios.post('api/ai-chat', {
          prompt: PROMPT
        })
        console.log(result.data.res)
        setmessage(prev => [...prev, {
          role: "ai",
          content: result.data.res
        }])
        const token = countToken(JSON.stringify(result.data.res))
        axios.post("/api/updateToken",{
          id:userDets.id,
          token:token
        })
        setResponseReceived(true)  
      } catch (error) {
        console.error("Error generating AI response:", error)
      } finally {
        setloading(false)
      }
    }


    if (message?.length > 0 && !responseReceived) {
      console.log(message[message.length - 1].role)
      let role = message[message.length - 1].role
      if (role == "user") {
        console.log("creating AI response")
        getAiresponse()
      }
    }
  }, [])



const onGenerate = () => {
    setmessage(prev => [...prev, {
      role: "user",
      content: userInput
    }])
    setuserInput("")
    setResponseReceived(false)
  }

  return (
    <div className='w-full relative h-[100%] flex flex-col justify-between'>
      <div className='w-full top-0 z-0 pt-1 min-h-10 max-h-[60%] overflow-y-hidden'>
        <div className='flex flex-col removesc h-full gap-3 overflow-y-scroll'>
          {message?.length > 0 ? (
            message.map((msg, index) => (
              <div className='min-w-[60%] flex items-start gap-3 max-w-[90%] p-3 rounded-xl bg-[#222222]' key={index}>
                {/* Assuming the message object contains a 'content' property */}
                {msg.role === "user" &&
                  <Image className='rounded-full' src={userDets.picture} width={35} height={35} alt="not showing" />}
                <Markdown className='leading-7 '>{msg.content}</Markdown>
              </div>
            ))
          ) : (
            <p>No messages available</p>
          )}
          {loading && <div className='flex items-center gap-3'>
            <Loader2Icon className='animate-spin' />
            <h2>Generating response....</h2>
          </div>}
        </div>
      </div>

      {/* this is the input field */}
      <div className='w-[90%] absolute z-10 top-0 h-[30%] flex py-5 mt-5 flex-col max-w-2xl border border-white/20 rounded-xl '>
        {/* this is the search box area */}
        <div className='flex px-3 items-start justify-between w-full'>
          <textarea
            value={userInput}
            className='w-full max-w-xl h-32 removesc resize-none outline-none px-2 bg-transparent'
            onChange={(e) => setuserInput(e.target.value)}
          >
          </textarea>

          <ArrowRight onClick={onGenerate} className=' bg-blue-500 h-8 w-8 p-1 cursor-pointer hover:bg-blue-400 rounded-lg ' />
        </div>

        <div className='w-full px-3 cursor-pointer'>
          <Link className='opacity-60' />
        </div>
      </div>
    </div>
  )
}

export default Chatview
