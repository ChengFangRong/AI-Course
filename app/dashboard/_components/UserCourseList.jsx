"use client"
import { CourseList } from '@/configs/schema';
import React from 'react'
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';  
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { index } from 'drizzle-orm/gel-core';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'


function UserCourseList() {

  const [courseList, setCourseList] =useState([]);
  const {userCourseList, setUserCourseList}=useState();
  const {user}=useUser();

  useEffect(() => {
    getUserCourses();
  }, [user])

  const getUserCourses = async() => {
    const result = await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress))
    setCourseList(result);
  }
  
  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'>My AI Courses</h2>

      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.length>0?courseList?.map((course,index)=>(
          <CourseCard course={course} key={index} refreshData={()=>getUserCourses()}/>
        ))
      : //while the courses is loading, a loading skeleton will be shown (5 gray boxes)
        [1,2,3,4,5].map((item,index)=>(
          <div key={index} className='w-full mt-5
          bg-slate-200 animate-pulse rounded-lg h-[270px]'>
          </div>
        ))
       
      }
      </div>
    </div>
  )
}

export default UserCourseList