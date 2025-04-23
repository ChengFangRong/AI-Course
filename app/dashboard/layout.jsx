"use client"

import SideBar from './_components/SideBar'
import React , { useState } from 'react'
import Header from './_components/Header'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

function DashboardLayout ({children}) {

  const [userCourseList, setUserCourseList] = useState([]);


  return (

    <UserCourseListContext.Provider value={{userCourseList, setUserCourseList}}>

    <div>
        <div className='md:w-64 hidden md:block'>
            <SideBar />
        </div>

        <div className='md:ml-64 p-10'>
            <Header />
            <div className="p-5">
            {children} {/* this will render the children of the dashboard layout */}

            </div>
        </div>
    </div>  

    </UserCourseListContext.Provider>


  )
}

export default DashboardLayout