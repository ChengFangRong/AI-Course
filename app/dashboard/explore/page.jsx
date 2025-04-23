'use client'

import React from 'react'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema';
import { useEffect , useState } from 'react';
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';
function Explore() {

  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  useEffect(() => {
    GetAllCourses();
  }, [pageIndex])

// in the explore page, will show up to 9 avail courses
  const GetAllCourses = async () => {

    const result = await db.select().from(CourseList)
    .limit(9)
    .offset(pageIndex*9) // if pageIndex is 0, will show 0-9, if pageIndex is 1, will show 9-18
    setCourseList(result);

  }

  return (
    <div>
      <h2 className='font-bold text-3xl'>Explore More Projects</h2>
      <p>Explore more project build with AI by other users</p>

      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
        {courseList?.map((course,index)=>(
          <div key={index}>
            <CourseCard course={course} displayUser={true}/>
          </div>
        ))}
      </div>

        <div className='flex justify-between mt-5'>

          {pageIndex!=0&& <Button onClick={()=>setPageIndex(pageIndex-1)}>Previous Page</Button>}

          <Button onClick={()=>setPageIndex(pageIndex+1)}>Next Page</Button>

        </div>


    </div>

  )
}

export default Explore