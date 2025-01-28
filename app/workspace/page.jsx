import Chatview from '@/components/custom/Chatview'
import Codeview from '@/components/custom/Codeview'
import Navbar from '@/components/custom/Navbar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-screen overflow-hidden'>
        <Navbar/>
        <div className='w-full gap-5 h-full px-10 grid grid-cols-1 md:grid-cols-3'>
          <div className='w-full h-[80%] overflow-hidden relative'>
     
            <Chatview/>        {/* chatview section done checking  */} 
            </div>
            <div className='col-span-2'>
              <Codeview/>
            </div>
        </div>
    </div>
  )
}

export default page