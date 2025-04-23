"use client"

import React from 'react'
import { HiClipboardDocumentCheck, HiMiniSquares2X2, HiLightBulb } from 'react-icons/hi2';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { useContext, useEffect} from 'react';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { useUser } from '@clerk/nextjs';
import uuid4 from 'uuid4';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useRouter } from 'next/navigation';

function CreateCourse() {
    const StepperOptions=[
    {
        id:1,
        name:"Category",
        icon:<HiMiniSquares2X2 />
    },
    {
        id:2,
        name:"Topic & Desc",
        icon:<HiLightBulb />
    },
    {
        id:3,
        name:"Options",
        icon:<HiClipboardDocumentCheck />
    },


]

const {userCourseInput, setUserCourseInput}=useContext(UserInputContext)
const [loading, setLoading] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);
const {user} = useUser();
const router = useRouter();

useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

const checkStatus=()=>{
    if (userCourseInput.length === 0) {
        return true; // Disable the button if no input is provided
    }
    if (activeIndex==0 && (userCourseInput?.category?.length == 0||userCourseInput?.category==undefined))
    {
        return true; 
    }
    if (activeIndex==1 && (userCourseInput?.topic?.length === 0|| userCourseInput?.topic===undefined)) 
    {
        return true; // Disable the button if no input is provided
    }

    else if (activeIndex==2&& (userCourseInput?.level==undefined||userCourseInput?.duration==undefined||userCourseInput?.video==undefined||userCourseInput?.noOfChapters==undefined))
    {
        return true; // Disable the button if no input is provided
    }

        

    return false; // Enable the button if input is provided

}


const GenerateCourseLayout = async() => {
    setLoading(true);
    const BASIC_PROMPT = 'Generate a Course Tutorial on Following Detail With field Course Name, Description, Along with Chapter Name, about, Duration:'
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', Topic: ' + userCourseInput?.topic + ', About Your Course: ' + userCourseInput?.aboutYourCourse + ', Level: ' + userCourseInput?.level + ', Duration: ' + userCourseInput?.duration + ', NoOfVideos: ' + userCourseInput?.video + ', NoOfChapters: ' + userCourseInput?.noOfChapters +', in JSON format'
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT)
    const result=await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    console.log(JSON.parse(result.response?.text()))
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response?.text()));

}

const SaveCourseLayoutInDb=async(courseLayout)=>{
    var id = uuid4(); //random generates a new id 
    setLoading(true);
    const result=await db.insert(CourseList).values({
        courseId:id,
        name:userCourseInput?.topic,
        level:userCourseInput?.level,
        category:userCourseInput?.category,
        courseOutput:courseLayout,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName,
        userProfileImage:user?.imageUrl,

})

    console.log("finish");
    router.replace('/create-course/' + id) //change to create course plus new created id
    setLoading(false);
}

  return (
    <div>
        {/* progress bar */}
        <div className='flex flex-col justify-center items-center mt-10'>
            <h2 className='text-4xl text-primary font-medium mb-8'>Create Course</h2>

            <div className='flex'>
                {StepperOptions.map((item, index) => (
                    <div className='flex items-center' key={item.id}>
                        <div className='flex flex-col items-center w-[50px] md:w-[100px]'>


                            {/* icon + to show which is active when next is clicked on */}
                            <div className={
                                `bg-gray-200 p-3 rounded-full text-white
                                ${activeIndex>=index&&"bg-slate-600 text-white"}
                                `}>
                                {item.icon}
                                </div>



                            <h2 className="hidden md:block md:text-sm">{item.name}</h2>



                        </div>


                        {index !== StepperOptions.length - 1 && <div 
                        className={`h-1 w-[50px] md:w-[100px] bg-gray-200
                        ${activeIndex>=index&&"bg-slate-600 text-white"}
                        `}></div> } 
                        {/* not show a extra line at the end */}
                        {/* Adding colour for the line when active */}


                    </div>
                ))}
            </div>
        </div>

                <div className='px-10 md:px-20 lg:px-44 mt-10'></div>
                {/* component */}
                    {activeIndex==0?<SelectCategory/>:
                    activeIndex==1?<TopicDescription/>:
                    <SelectOption/>
                    }

                {/* next prev button */}

                <div className='flex justify-between p-5 mt-10'>
                    <Button variant='outline' onClick={() => setActiveIndex(activeIndex - 1)} disabled={activeIndex===0}>Previous</Button>
                    {activeIndex<2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
                    {activeIndex===2 && <Button disabled={checkStatus()} onClick={() => GenerateCourseLayout()}>Generate Course Layout</Button>}
                </div>

            <LoadingDialog loading={loading} setLoading={setLoading}/>
    </div>
  )
}

export default CreateCourse