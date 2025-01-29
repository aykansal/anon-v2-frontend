'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MessageContext } from '@/context/MessagesContext';
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { ArrowRight, Link, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import Markdown from 'react-markdown';
import Prompt from '@/data/PromptAO';
const Chatview = () => {
  const lastCalledRef = useRef(0); // Ref to track the last call timestamp
  const context = useContext(MessageContext);
  const { userDets } = useContext(UserDetailsContext);
  const [userInput, setuserInput] = useState('');
  const [loading, setloading] = useState(false);
  const [responseReceived, setResponseReceived] = useState(false);

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

  if (!context) {
    throw new Error('context is not present');
  }
  const { message, setmessage } = context;
  // useEffect(() => {
  //   console.log(message.content);

  //   const getAiresponse = async () => {
  //     const now = Date.now();
  //     if (now - lastCalledRef.current < 10000) {
  //       console.log("Rate limiter active, skipping call.");
  //       return; // Exit if the function was called within the last 10 seconds
  //     }

  //     lastCalledRef.current = now; // Update the timestamp
  //     console.log("Calling the get AI response here");
  //     setLoading(true);

  //     const PROMPT = JSON.stringify(message) + Prompt.CHAT_PROMPT;

  //     try {
  //       const result = await axios.post("api/ai-chat", {
  //         prompt: PROMPT,
  //       });

  //       console.log("This is the AI response from the entered user prompt", result.data.res);

  //       setmessage((prev) => [
  //         ...prev,
  //         {
  //           role: "ai",
  //           content: result.data.res,
  //         },
  //       ]);

  //       setResponseReceived(true);
  //     } catch (error) {
  //       console.error("Error generating AI response:", error);
  //     } finally {
  //       setloading(false);
  //     }
  //   };

  //   if (message?.length > 0 && !responseReceived) {
  //     console.log(message[message.length - 1].role);
  //     let role = message[message.length - 1].role;
  //     if (role === "user") {
  //       console.log("Creating AI response");
  //       getAiresponse();
  //     }
  //   }
  // }, [message]);

  const onGenerate = () => {
    setmessage((prev) => [
      ...prev,
      {
        role: 'user',
        content: userInput,
      },
    ]);
    setuserInput('');
    setResponseReceived(false);
  };

  return (
    <div className="relative flex flex-col w-full h-[100%]">
      <div className="top-0 z-0 pt-1 w-full min-h-10 max-h-[60%] overflow-y-hidden">
        <div className="flex flex-col gap-3 h-full overflow-y-scroll removesc">
          {/* {message?.length > 0 ? (
            message.map((msg, index) => (
              <div className='flex items-start gap-3 bg-[#222222] p-3 rounded-xl min-w-[60%] max-w-[90%]' key={index}>
                {msg.role === "user" &&
                  <Image className='rounded-full' src={userDets.picture} width={35} height={35} alt="not showing" />}
                <Markdown className='leading-7'>{msg.content}</Markdown>
              </div>
            ))
          ) : (
            <p>No messages available</p>
          )}
          {loading && <div className='flex items-center gap-3'>
            <Loader2Icon className='animate-spin' />
            <h2>Generating response....</h2>
          </div>} */}
        </div>
      </div>

      {/* this is the input field */}

      <div className="bottom-5 z-10 absolute flex flex-col border-white/20 bg-black mt-5 py-5 border rounded-xl w-[90%] max-w-2xl h-[30%]">
        {/* this is the search box area */}
        <div className="flex justify-between items-start px-3 w-full">
          <textarea
            value={userInput}
            className="bg-transparent px-2 w-full max-w-xl h-32 outline-none removesc resize-none"
            onChange={(e) => setuserInput(e.target.value)}
          ></textarea>

          <ArrowRight
            onClick={onGenerate}
            className="bg-blue-500 hover:bg-blue-400 p-1 rounded-lg w-8 h-8 cursor-pointer"
          />
        </div>

        <div className="px-3 w-full cursor-pointer">
          <Link className="opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default Chatview;
