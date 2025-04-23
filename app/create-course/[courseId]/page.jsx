
"use client"

import { db } from '@/configs/db';
import React, { useEffect } from 'react';
import { Chapters, CourseList } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateChapterContent_AI } from '@/configs/AiModel'; 
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service'
import { useRouter } from 'next/navigation';

function CourseLayout({params}) {
    const { user } = useUser();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        params && GetCourse();
    }, [params,user])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
          .where(and(eq(CourseList.courseId, params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))
        
            setCourse(result[0]);
            console.log(result);
    }

    const GenerateChapterContent=()=>{
      setLoading(true);
      const chapters=course?.courseOutput?.course?.chapters;
      chapters.forEach(async(chapter,index)=>{

        const PROMPT='Explain the concept in Detail on Topic:'+course?.name+', Chapter:'+chapter?.name+', in JSON Format with list of array with field as title, description in detail, Code Example(Code field in <precode> format) if applicable';
      console.log(PROMPT)
      // if(index<3)
      //   {
        try{
          let videoId='';

          //Generate Video URL
          service.getVideos(course?.name+':'+chapter?.name).then(resp=>{
            console.log(resp);
            videoId=resp[0]?.id?.videoId;
          })

          //generate chapter content
          const result=await GenerateChapterContent_AI.sendMessage(PROMPT);
          console.log(result?.response?.text());
          const content=JSON.parse(result?.response?.text())


          //Save Chapter content + Video URL
          await db.insert(Chapters).values({
            chapterId:index,
            courseId:course?.courseId,
            content:content,
            videoId:videoId
          })

          setLoading(false);
        }catch(e)
        {
          setLoading(false);
          console.log(e);
        } 
        await db.update(CourseList).set({
          publish:true
        })
        
        router.replace('/create-course/'+course?.courseId+"/finish");
      //}

      })
    }
  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
        <h2 className="text-2xl font-bold text-center"> 
            Course Layout
        </h2>

        <LoadingDialog loading={loading} />
        {/* Basic Info */}
        
        {/* Passing course infomation */}
        <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/> 
            {/* refresh data updates data so you dont have to refresh page after editing data to see changes */}
        

        {/* Course Detail */}
        <CourseDetail course={course} />


        {/* List of Lesson */}
        <ChapterList course={course} refreshData={()=>GetCourse()}/>


        <Button onClick={GenerateChapterContent} className='my-10'>Generate Course Content</Button>
    </div>
  )
}

export default CourseLayout