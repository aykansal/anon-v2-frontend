import React from 'react'
import { Button } from '../ui/button'

const PriceCard = () => {
  return (
    <div className='w-full flex gap-3 px-10 justify-center'>
               <div className='w-[18%] rounded-xl flex flex-col p-3 gap-2 h-[35vh] border'>
                              <h1 className='text-3xl font-semibold'>Free</h1>
                              <h2 className='font-bold '>50k Tokens</h2>
                              <p className='text-sm leading-1 opacity-70'>Ideal for hobbyiest and casual users for light exploratory use.</p>

                              <h1 className='text-4xl mt-5 font-bold'>$4.99</h1>

                              <Button className="bg-red-500 text-white">upgrade to Free</Button>
               </div>
               <div className='w-[18%] rounded-xl flex flex-col p-3 gap-2 h-[35vh] border'>
                              <h1 className='text-3xl font-semibold'>Starter</h1>
                              <h2 className='font-bold '>120k Tokens</h2>
                              <p className='text-sm leading-1 opacity-70'>Designed for professional who needs to use ANON multiple times a week </p>

                              <h1 className='text-4xl mt-5 font-bold'>$9.99</h1>

                              <Button  className="bg-pink-500 text-white">upgrade to starter</Button>
               </div>
               <div className='w-[18%] rounded-xl flex flex-col p-3 gap-2 h-[35vh] border'>
                              <h1 className='text-3xl font-semibold'>Pro</h1>
                              <h2 className='font-bold '>2.5M Tokens</h2>
                              <p className='text-sm leading-1 opacity-70'>Ideal for hobbyiest and casual users for light exploratory use.</p>

                              <h1 className='text-4xl mt-5 font-bold'>$15.99</h1>

                              <Button className="bg-blue-500 text-white">upgrade to Pro</Button>
               </div>
               <div className='w-[18%] rounded-xl flex flex-col p-3 gap-2 h-[35vh] border'>
                              <h1 className='text-3xl font-semibold'>Pro+</h1>
                              <h2 className='font-bold '>Unlimited Tokens</h2>
                              <p className='text-sm leading-1 opacity-70'>Ideal for hobbyiest and casual users for light exploratory use.</p>

                              <h1 className='text-4xl mt-5 font-bold'>$49.99</h1>

                              <Button  className="bg-purple-500 text-white">upgrade to Pro+</Button>
               </div>
    </div>
  )
}

export default PriceCard