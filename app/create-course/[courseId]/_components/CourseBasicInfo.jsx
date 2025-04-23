import React, { useEffect } from 'react'
import Image from 'next/image';
import {HiOutlinePuzzle} from 'react-icons/hi'
import { Button } from '@/components/ui/button';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { useState } from 'react';
import { storage } from '@/configs/firebaseConfig'; 
import { uploadBytes, ref } from 'firebase/storage';
import {eq} from 'drizzle-orm';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import Link from 'next/link';

function CourseBasicInfo({course , refreshData , edit=true}) {

  const [selectedFile , setSelectedFile] = useState();

  useEffect(()=>{
    {
      setSelectedFile(course?.courseBanner); // this will set the selected file to the course banner if it exists
    }
  },[course])


  /**
   * Select file and Upload to Firebase Storage
   * @param {*} event 
   */


  const onFileSelected = async(event) => {
    const file=event.target.files[0]; //gets the first file from a filelist
    setSelectedFile(URL.createObjectURL(file)); // this will create a url for the file so you can preview it before uploading it
    const fileName=Date.now() + '.jpg' // this will create a unique name for the file 
    const storageRef=ref(storage,'ai-course/'+fileName)
    await uploadBytes(storageRef,file).then((snapshot) => {
      console.log('upload file completed!')
  }).then(resp=>{
    getDownloadUrl(storageRef).then(async(downloadURL)=>{
      console.log(downloadURL);

      await db.update(CourseList).set({
        courseBanner:downloadURL
      }).where(eq(CourseList.id,course?.id))
    })
  })
}

  return (
    
    <div className='p-10 border rounded-xl shadow-sm mt-5'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className="font-bold text-2xl">{course?.courseOutput?.course?.name} 
                  {edit&& <EditCourseBasicInfo course={course} refreshData={refreshData}/>} {/*shows edit function if its tru (fasle when showing course)*/}
                </h2>
                <p className='text-sm text-gray-400 mt-3'>{course?.courseOutput?.course?.description}</p>
                <h2 
                className='font-medium mt-2 flex gap-2 items-center text-blue-700'
                ><HiOutlinePuzzle />{course?.category}
                </h2>
            {!edit && <Link href={course?.courseId+"/start"}> {/* only show start button if edit is false. While editing course page, canot see start*/}
            <Button className='w-full mt-5 bg-gray-400'>Start</Button>
            </Link>}
            </div>


            <div>
              <label htmlFor='upload-image'> {/* gets the id for the input so you are able to add an image by clicking on the placeholder instead of a choose file button */}
                <Image src={selectedFile?selectedFile:'/placeholder.png'} //if there is no selected file, display placeholder
                alt="course" width={300} height={300} 
                className='w-full rounded-xl h-[250px] object-cover cursor-pointer'/>
              </label>

              {edit&& <input type="file" id="upload-image" className='opacity-0'
               onChange={onFileSelected}/>} {/*make it so course/id image cannot b edited*/}
            </div>
        </div>
        
    </div>
  )
}

export default CourseBasicInfo