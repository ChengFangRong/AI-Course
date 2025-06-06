'use client'
import Header from '@/app/_components/Header';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import { CourseList } from '@/configs/schema'
import React from 'react'
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react'
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';

function Course({params}) {
    const [course,setCourse] = useState();
        useEffect(()=>{
            params&&GetCourse();
        },[params])
    const GetCourse=async()=>{

        const result=await db.select().from(CourseList)
        .where(eq(CourseList?.courseId, params?.courseId))

        console.log(result);
        setCourse(result[0]);
    }

  return (
    <div>
        <Header/> 
        <div className='px-10 p-10 md:px-20 lg:px-44'>
        <CourseBasicInfo course={course} edit={false}/> 

        <CourseDetail course={course}/>     

        <ChapterList course={course} edit={false}/>      
        </div>


    </div>
  )
}

export default Course