import React, { useEffect } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { CourseList } from '@/configs/schema'
import { Button } from '@/components/ui/button'

function EditChapters({course, index, refreshData}) {

    const Chapters=course?.courseOutput?.course?.chapters;
    const [name,setName] = useState();
    const [about,setAbout] = useState();

    useEffect(()=>{
        setName(Chapters[index].name);
        setAbout(Chapters[index].about);
    },[course])

    const onUpdateHandler=async ()=>{
        course.courseOutput.course.chapters[index].name=name;
        course.courseOutput.course.chapters[index].about=about; //ensuring that name and about onupdate those with same index selected
        
        const result = await db.update(CourseList).set({ //update database with the new value   
            courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id,course?.id)) //edit only those where the course id in the database should match with the current course id
        .returning({id:CourseList.id});

        console.log(result); // to check if the update is successful
        refreshData(true); // to refresh the data after updating the course
    }// to update the new value name and description that user has edited

  return (
    <Dialog>
  <DialogTrigger><HiPencilSquare /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Chapter</DialogTitle>
      <DialogDescription>
      <div className='mt-1'>
                    <label>Course Title</label>
                    <Input defaultValue={Chapters[index].name}
                    onChange={(event)=>setName(event?.target.value)}
                    />    
                </div>
                <div className='mt-3'>
                    <label>Description</label>
                    <Textarea className='h-50' defaultValue={Chapters[index].about}
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

export default EditChapters