import React from 'react'
import Image from 'next/image'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { HiMiniEllipsisVertical } from 'react-icons/hi2'
import DropdownOption from './DropdownOption'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link';

  

// classname -> hover:scale-105 transition-all --> makes the card scale up when hovered
function CourseCard({course, refreshData, displayUser=false}) {

    const handleOnDelete=async()=>{ 
        const resp = await db.delete(CourseList)
        .where(eq(CourseList.id,course?.id))
        .returning({id:CourseList?.id});

        if(resp)
        {
            refreshData();
        }
     }


  return (
    <div className='shadow-sm rounded-lg border p-2 
     cursor-pointer mt-4 hover:border-secondary'>
        <Link href={'/course/'+course?.courseId}>
            <Image src={course?.courseBanner} width={300} height={200} 
            alt="course banner" className='w-full h-[200px] object-cover rounded-lg'/>
        </Link>
    <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>
            {course?.courseOutput?.course?.name}


            {/* disables the abilty to delete course when user is displayed (can delete in home but not explore) */}
            {!displayUser&&<DropdownOption
            handleOnDelete={()=>handleOnDelete()}><HiMiniEllipsisVertical/></DropdownOption>
} 
        </h2>


        <p className='text-sm text-gray-400'>{course?.courseOutput?.course?.category}</p>
    <div className='flex items-center justify-between'>
        <h2 className="flex gap-2 items-center p-1 text-sm bg-gray-50 text-gray-500 rounded-sm">
            <HiOutlineBookOpen />{course?.courseOutput?.course?.numberOfChapters} Chapters</h2>
        <h2 className=" p-1 text-sm bg-gray-50 text-gray-500 rounded-sm">{course?.level}</h2>
    </div>
    {displayUser&&<div className='flex items-center gap-2 mt-2'>
    <Image src={course?.userProfileImage} width={35} height={35}
                className='rounded-full' alt="user profile"
                />
                <h2 className='text-sm'>{course?.userName}</h2>
    </div>}
    
    
    </div>
    </div>
  )
}

export default CourseCard