"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link';

const Navbar = () => {

  return (
    <nav className='flex items-center top-0 sticky z-50 bg-white border-b p-4 sm:px-12  justify-between'>
      <Link className='font-bold' href={'/'} >
      TRAKKY
      </Link> 
      <div className='flex gap-4 items-center'>
        <Link href={'/mealplan'}>
        <Button className='bg-green-500 rounded'>
            Mealplan
        </Button>
        </Link>
        
             
         <Link href={'/sign-in'}>
        <Button variant={'outline'}  className=''>
            SignIn
        </Button>
         </Link>   
        
      </div>
    </nav>
  )
}

export default Navbar