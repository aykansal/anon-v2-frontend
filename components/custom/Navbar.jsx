import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <div className='w-full px-12   flex items-center justify-between'>
               <div>
                              <Image width={85} height={5} src={"/logo.jpeg"} alt='not showing'/>
               </div>

               <div className='flex items-center gap-4'>
                              <Button variant="ghost">SignUp</Button>
                              <Button  className="bg-blue-500 text-white hover:bg-blue-400">Get started</Button>
               </div>
    </div>
  )
}

export default Navbar