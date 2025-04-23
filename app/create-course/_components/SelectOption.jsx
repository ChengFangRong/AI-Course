import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { UserInputContext } from '@/app/_context/UserInputContext';
import { useContext } from 'react';


function SelectOption() {

    const {userCourseInput, setUserCourseInput} = useContext(UserInputContext)

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    }


    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-2 gap-10'>
                
                
                <div>
                    <label className='text-sm'>Difficulty Level</label>
                    <Select onValueChange={(value) => handleInputChange('level', value)}
                        defaultValue={userCourseInput?.level}>
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className='text-sm'>Course Duration</label>
                    <Select onValueChange={(value) => handleInputChange('duration', value)}
                        defaultValue={userCourseInput?.duration}>
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 Hours">1 Hours</SelectItem>
                            <SelectItem value="2 Hours">2 Hours</SelectItem>
                            <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className='text-sm'>Add Video</label>
                    <Select onValueChange={(value) => handleInputChange('video', value)}
                        defaultValue={userCourseInput?.video}>
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    <label className='text-sm'>No of Chapters</label>
                    <Input type="number"  
                            onChange = {(e) => handleInputChange('noOfChapters', e.target.value)}
                            defaultValue={userCourseInput?.noOfChapters}/>

                   
                </div>

            </div>
        </div>

    )
}

export default SelectOption