"use client"

import React , {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useEffect } from 'react'
import { eq } from 'drizzle-orm'


const EditCourseBasicInfo = ({course, refreshData}) => {

    const [name,setName] = useState();
    const [description,setDescription] = useState();

    useEffect(()=>{
        setName(course?.courseOutput?.course?.name);
        setDescription(course?.courseOutput?.course?.description);
    },[course])

    const onUpdateHandler=async ()=>{ // to update the new value name and description that user has edited
        course.courseOutput.course.name=name;
        course.courseOutput.course.description=description;
        const result = await db.update(CourseList).set({ //update database with the new value   
            courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id,course?.id)) //edit only those where the course id in the database should match with the current course id
        .returning({id:CourseList.id});

        refreshData(true);

        console.log(result);
    } // no ? cus it cannot be an optional field when assigning values


  return (
    <Dialog>
        <DialogTrigger><HiPencilSquare /></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Course Title & Description</DialogTitle>
            <DialogDescription>
                <div className='mt-1'>
                    <label>Course Title</label>
                    <Input defaultValue={course?.courseOutput?.course?.name}
                    onChange={(event)=>setName(event?.target.value)}
                    />    
                </div>
                <div className='mt-3'>
                    <label>Description</label>
                    <Textarea className='h-50' defaultValue={course?.courseOutput?.course?.description}
                    onChange={(event)=>setDescription(event?.target.value)}
                    />    
                </div>

            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button onClick={onUpdateHandler}>Update</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>

  )
}

export default EditCourseBasicInfo