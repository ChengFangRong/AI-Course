import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

export default function Dashboard () {
  return (
    <div>
        {/* <UserButton /> when you sign in to google/ this will show ur pfp to show that u r signed in */}
        <AddCourse />

        <UserCourseList />
    </div>
  )
}
