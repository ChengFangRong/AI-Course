import React from 'react'
import { HiOutlineCheckCircle,HiOutlineClock} from 'react-icons/hi'  
import EditChapters from './EditChapters';
function ChapterList({course, refreshData, edit=true}) {

  return (
    <div className='mt-3'>
        <h2 className='font-medium text-xl'>
            Chapters
        </h2>

        <div className='mt-2'>
            {course?.courseOutput?.course?.chapters.map((chapter, index) => (
                
                <div className='border p-5 rounded-lg mb-2 flex items-center justify-between' key={index}>
                <div className='flex gap-5 items-center' key={index}>
                    <h2 className='bg-gray-400 flex-none h-10 w-10 text-white rounded-full text-center p-2'>
                        {index + 1}
                    </h2>
                    <div>
                        <h2 className='font-medium text-lg'>{chapter?.name} 
                            {edit&&<EditChapters course={course} index={index} refreshData={refreshData}/>}
                        </h2>
                        <p className='text-sm text-gray-500'>{chapter?.about}</p>
                        <p className='flex gap-2 text-blue-700 item-center'><HiOutlineClock />{chapter?.duration}</p>
                    </div>


                </div>
                <HiOutlineCheckCircle className='text-4xl text-gray-300 flex-none' />
                </div>

            ))}
        </div>




    </div>
  )
}

export default ChapterList;