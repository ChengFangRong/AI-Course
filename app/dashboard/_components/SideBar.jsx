"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import { HiOutlineHome , HiOutlineRectangleStack , HiOutlineShieldCheck , HiOutlinePower } from "react-icons/hi2";
import { Progress } from "@/components/ui/progress"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { useContext } from 'react';


function SideBar() {
    const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);

    const Menu = [
        {
            id: 1,
            name: 'Home',
            icon: <HiOutlineHome />,
            path: "/dashboard",
        },
        {
            id: 2,
            name: 'Explore',
            icon: <HiOutlineRectangleStack  />,
            path: "/dashboard/explore",
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: <HiOutlineShieldCheck />,
            path: "/dashboard/upgrade",
        },
        {
            id: 4,
            name: 'LogOut',
            icon: <HiOutlinePower />,
            path: "/dashboard/logout",
        },
    ]
    const path = usePathname(); //returns wtv the pathname is. etc /dashboard 



  return (


    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src={"/logo.jpg"} alt="Logo" width={150} height={40} className="logo" />
        <hr className='my-5' />

        <ul>
            {Menu.map((item, index) => (
                <Link href={item.path} key={item.id}>
                <div className={`flex items-center gap-2 p-2
                 hover:bg-gray-200 rounded-md cursor-pointer mb-3
                 ${item.path===path && "bg-gray-200 text-black"}`}
                  key={index}>  

                  {/* the ${item.path.....} above : when ur url active is /dashboard, the button linked to that url will be "selected" */}

                    <div className='text-2xl'>{item.icon}</div>
                    <h2>{item.name}</h2>
                </div>
                </Link>
            ))}

        </ul>
        <div className="absolute bottom-10 w-[80%]">
            <Progress value={(userCourseList?.length/5)*100} />

            <h2 className='text-sm my-2'>{userCourseList?.length} Out of 5 course created</h2>
            <h2 className='text-xs text-gray-500'>Upgrade to Pro for more features</h2>
        </div>


    </div>
  )
}

export default SideBar