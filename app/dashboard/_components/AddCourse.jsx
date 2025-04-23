"use client";

import React, { useContext } from 'react';
import {useUser} from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function AddCourse() {

    const {user} = useUser();
    const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
  return (

    <div>
        
        <div>
            <h2 className='text-2xl'>Hello, <span className='font-bold'>{user?.fullName}</span> </h2>
            <p className='text-sm text-gray-500'>Create new course with AI, and share it with the world</p>
        

        </div>

        <div>
        <Link href={userCourseList>=5?'dashboard/upgrade':"/create-course"}>
            <Button>+ Create AI Course</Button>
        </Link> 
        </div>


    </div>

  )
}

export default AddCourse