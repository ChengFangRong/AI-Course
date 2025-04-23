import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useContext } from 'react'
import { UserInputContext } from '../../_context/UserInputContext'

function TopicDescription() {

    const {userCourseInput, setUserCourseInput} = useContext(UserInputContext)

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    }

  return (
    <div className='mx-20 lg:mx-44'>
        {/* Topic */}
        <div className='mt-5'>
            <label>Write a topic for which you want to generate a course (e.g., yoga, python course, etc..) :</label>
            <Input placeholder={'Topic'} className="h-14 text-xl"
            defaultValue={userCourseInput?.topic} //set your input as default so when you go next and come back itll be there
            onChange = {(e) => handleInputChange('topic', e.target.value)}/>
        
        </div>
        <div className='mt-5'>
            <label>Tell us more about your course (What do you want to include?) :</label>
            <Textarea placeholder="About your course" className="h-24 text-xl"
            defaultValue={userCourseInput?.aboutYourCourse}
            onChange = {(e) => handleInputChange('aboutYourCourse', e.target.value)}/>
        </div>

        {/* Text area desc */}
    </div>
  )
}

export default TopicDescription