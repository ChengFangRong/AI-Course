import React from 'react'
import { HiOutlineChartBar } from 'react-icons/hi'
import { HiOutlineClock } from 'react-icons/hi'
import { HiOutlineCamera } from 'react-icons/hi'
import { HiOutlineBookOpen } from 'react-icons/hi'

function CourseDetail({course}) {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>

        {/* md:grid-cols-4 -> how many cols // how many items can fit in a row */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>

            <div className='flex gap-2'>
                <HiOutlineChartBar className='text-4xl text-gray-500' />
            <div>
                <h2 className='text-xs text-gray-500'>Skill Level</h2>
                <h2 className='font-medium text-lg'>{course?.level}</h2>
            </div>
            </div>


            <div className='flex gap-2'>
                <HiOutlineClock className='text-4xl text-gray-500' />
            <div>
                <h2 className='text-xs text-gray-500'>Duration</h2>
                <h2 className='font-medium text-lg'>{course?.courseOutput?.course?.duration}</h2>
            </div>
            </div>


            <div className='flex gap-2'>
                <HiOutlineBookOpen className='text-4xl text-gray-500' />
            <div>
                <h2 className='text-xs text-gray-500'>No. of Chapters</h2>
                <h2 className='font-medium text-lg'>{course?.courseOutput?.course?.numberOfChapters}</h2>
            </div>
            </div>


            <div className='flex gap-2'>
                <HiOutlineCamera className='text-4xl text-gray-500' />
            <div>
                <h2 className='text-xs text-gray-500'>Video Included?</h2>
                <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
            </div>
            </div>




        </div>


    </div>
  )
}

export default CourseDetail