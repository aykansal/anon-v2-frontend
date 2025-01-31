"use client"

import { useContext , useState } from 'react'
import { ArrowRight, Link, Loader2Icon,} from 'lucide-react'
import { MessageContext } from '@/context/MessagesContext'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import Login from './Login'
import axios from 'axios'
import { redirect } from 'next/navigation'

const Hero = () => {
  const [userInput, setuserInput] = useState(null)
  const [openSignupDialog, setopenSignupDialog] = useState(false)
  const Msgcontext = useContext(MessageContext)
  const [loading , setloading] = useState(false)
  
  const userContext = useContext(UserDetailsContext)
  const {setmessage} = Msgcontext


  const OnGenerate = async (input) => {
    setloading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Proper delay

    setmessage({
        role: "user",
        content: input
    });

    localStorage.setItem("messageArray", JSON.stringify({
        role: "user",
        content: input
    }));

    setloading(false);
    redirect('/workspace');
};



  return (
    <div className='w-full flex  flex-col items-center mt-28  h-full'>
      <Login open={openSignupDialog} setOpenChange={setopenSignupDialog}/>
        <h1 className='text-4xl font-bold '>What do you want to build?</h1>

        <p className=' text-gray-500 mt-1'>prompt, run, edit, and deploy fullstack web apps. </p>

    {/* this is the search box  */}
        <div className='w-full relative flex py-5 mt-5 flex-col max-w-2xl border border-white/20  rounded-xl '>


            {/* this is the search box area */}
            <div className='flex px-3  items-start justify-between  w-full'>

              <textarea 
              className='w-full max-w-xl h-32 removesc resize-none outline-none  px-2 bg-transparent'
              onChange={(e)=>setuserInput(e.target.value)}
              >   
              </textarea>

              <ArrowRight onClick={()=>OnGenerate(userInput)} className=' bg-blue-500  h-8 w-8 p-1 cursor-pointer hover:bg-blue-400 rounded-lg '/>

            </div>

            <div className='w-full px-3 cursor-pointer'>

              <Link  className='opacity-60'/>

            </div>

            {loading&&
  <div className='w-full h-full absolute bg-gray-900 opacity-90 top-0 scale-105 rounded-xl flex items-center justify-center'>
    <div className='flex items-center gap-2'>
      <Loader2Icon className='animate-spin'/>
      <h2>Creating your project.....</h2>
    </div>
  </div>}

        </div>
        {/* this is the example fields  */}

        <div className='w-full mt-3 px-2 max-w-2xl justify-center flex items-center flex-wrap gap-3'>

{["create a TODO app in react" , "create a Budget track app" , "create a flappy bird game" , "write backend for authentication" , "create a landing page"].map((input,index)=>(

        <div 
         key={index}
         className='px-3 text-gray-400 hover:text-gray-200 cursor-pointer py-1 text-sm border border-white/30 rounded-full'
         onClick={()=>OnGenerate(input)}
        >
             <h2>{input}</h2>

          </div>

))}
        </div>



    </div>
  )
}

export default Hero