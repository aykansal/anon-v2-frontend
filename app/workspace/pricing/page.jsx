import Navbar from '@/components/custom/Navbar'
import PriceCard from '@/components/custom/PriceCard'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen '>
               {/* this is the navbar section */}

               <div className='w-full px-10 py-2 flex justify-between items-center'>

                              <Image width={110} height={30} src={"/logo.jpeg"} alt='not showing'/>
                              <MenuIcon/>

               </div>

               {/* this is the main content screen  */}

               <div className='w-full flex flex-col'>
                              <div className='w-full  text-center'>
                                             <h1 className='text-5xl  font-semibold'>Pricing</h1>
                                             <p className=' opacity-60 mt-5 font-light'>Start with a free account to speed up your  workflow on public projects or boost</p>
                                             <p className=' font-light opacity-60'>your entire team with instantly-opening production enviroments.</p>
                              </div>
               </div>

{/* this is the left tokens indicator */}
               <div className='w-full flex items-center justify-between mt-5 py-10 px-32'>
                              <div className='flex items-end gap-1 text-lg'>
                                             <span className='font-bold'>4000 </span>
                                             <p className='opacity-80'>Tokens left</p>
                              </div>
                              <div className='flex flex-col items-start leading-none opacity-80 gap-1 text-lg'>
                                             <p>Need more tokens?</p>
                                             <p>upgrade your plan below</p>
                              </div>
               </div>

               <PriceCard/>

    </div>
  )
}

export default page