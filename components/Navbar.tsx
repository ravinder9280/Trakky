"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
const Navbar = () => {
const {user}= useUser()
  return (
    <nav className='flex items-center top-0 sticky z-50 bg-black/50 backdrop-blur-xl  border-b p-4 sm:px-12  justify-between'>
      <Link className='font-bold' href={'/'} >
      TRAKKY
      </Link> 
      <div className='flex gap-4 items-center'>
        <Link href={'/mealplan'}>
        <Button className=' text-foreground  rounded'>
            Mealplan
        </Button>
        </Link>
        
           {user?<UserButton  />:

             <Link href={'/sign-in'}>
        <Button variant={'outline'}  className=''>
            SignIn
        </Button>
         </Link>   
           }  
        
      </div>
    </nav>
  )
}

export default Navbar