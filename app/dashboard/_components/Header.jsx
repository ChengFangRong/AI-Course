import React from 'react'
import Image from "next/image";
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className='flex justify-between items-center'>
        <Image src={"/meow.jpg"} alt="Logo" width={40} height={40}/>
        <UserButton />
    </div>
  )
}

export default Header