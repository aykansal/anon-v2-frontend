import { CircleArrowOutUpLeftIcon, HelpCircle, Settings, Subscript } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSidebar } from '../ui/sidebar'

const SideFooter = () => {
  const {toggleSidebar} = useSidebar()
  return (

    <div className='w-[100%] pl-3 flex text-sm flex-col gap-3'>
      <Button variant='ghost' className='flex items-center justify-start opacity-75 hover:opacity-100 cursor-pointer  gap-2'>
        <Settings className='scale-[90%]'/>
        <h2>Settings</h2>
      </Button>
      <Button variant='ghost' className='flex items-center opacity-75 justify-start hover:opacity-100 cursor-pointer gap-2'>
        <HelpCircle className='scale-[90%]'/>
        <h2>Help center</h2>
      </Button>
      <Link onClick={toggleSidebar} href='/workspace/pricing'  className='flex pl-3 items-center gap-2 opacity-75 justify-start hover:opacity-100 cursor-pointer'>
        <Subscript className='scale-[90%]'/>
        <h2>My Subscription</h2>
      </Link>
      <Button variant='ghost' className='flex items-center gap-2 opacity-75 justify-start hover:opacity-100 cursor-pointer'>
        <CircleArrowOutUpLeftIcon className='scale-[90%]'/>
        <h2>Sign Out</h2>
      </Button>
    </div>
  )
}

export default SideFooter