import React from 'react'
import Image from 'next/image'
// import { Button } from '@/components/ui/button'
function Header() {
  return (//p-5 > padding 5
    <div className="flex justify-between p-5 shadow-md items-center"> 
        <Image src="/logo.jpg" alt="Logo" width={150} height={80} className="logo" />
        {/* <Button>Get Started</Button> */}
    </div>
  )
}

export default Header