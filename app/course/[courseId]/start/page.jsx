"use client"

import React, { useEffect, useState } from 'react'
import { Chapters, CourseList } from '@/configs/schema'
import { db } from '@/configs/db'
import { and, eq } from 'drizzle-orm'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({params}) {

    const [course, setCourse] =useState();
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState(); 

    useEffect(()=>{
        GetCourse();
    },[])

    /**
     * used to get course info by course id
     */

    const GetCourse=async()=>{
        const result=await db.select().from(CourseList)
        .where(eq(CourseList?.courseId, params?.courseId))

        setCourse(result[0]);
        GetSelectedChapterContent(0);
    }

    const GetSelectedChapterContent = async(chapterId) => {
        const result=await db.select().from(Chapters)
        .where(and(eq(Chapters.chapterId,chapterId),
        eq(Chapters.courseId,course?.courseId)
        ));

        setChapterContent(result[0]);

        console.log(result);
    }

  return (
    <div>
        {/* Chapter List SideBar */}
        <div className='fixed md:w-64 hidden md:block h-screen bg-blue-50'>
            <h2 className='font-medium text-lg p-3 bg-gray-400 text-white'>{course?.courseOutput?.course?.name}</h2>
        <div>
            {course?.courseOutput?.course?.chapters.map((chapter, index) => (
                <div 
                key={index} 
                className={`cursor-pointer hover:bg-blue-100
                    ${selectedChapter?.name==chapter?.name?'bg-blue-100':''}`} //whel clicked on the chapter, selected chapter will remain the color
                onClick={()=> {
                    setSelectedChapter(chapter);
                    GetSelectedChapterContent(index)


                }}>

                    <ChapterListCard chapter={chapter} index={index}/>
                </div>
            ))}

        </div>
        
        </div>
        
        {/* Course Content */}
        <div className='md:ml-64'>
            <ChapterContent chapter={selectedChapter} content={chapterContent}/>
                
        </div>

    </div>
  )
}

export default CourseStart