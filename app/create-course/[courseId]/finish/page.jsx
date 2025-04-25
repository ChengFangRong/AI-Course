"use client"
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';

import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { useRouter } from 'next/navigation';
import { HiOutlineClipboardDocumentCheck, HiCheck } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';

function FinishScreen({ params }) {
	const { user } = useUser();
	const [course, setCourse] = useState([]);
	const [copied, setCopied] = useState(false);
	const router = useRouter();
	useEffect(() => {
		params && GetCourse();
	}, [params, user])

	const GetCourse = async () => {
		const result = await db.select().from(CourseList)
			.where(and(eq(CourseList.courseId, params?.courseId),
				eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))
		setCourse(result[0]);
		console.log(result);
	}

	return (
		<div className='px-10 md:px-20 lg:px=44 my-7'>
			<h2 className='text-center font-bold text-2xl my-3 text-gray-600'>Congrats! Your course is ready</h2>

			<CourseBasicInfo course={course} refreshData={() => console.log()} />
			<h2 className='mt-5 p-1 font-medium'>Course URL:</h2>
			<h2 className='text-center text-grap-400 border p-2 rounded-xl flex gap-5 items-center'>
				{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
				{copied ? (
					<HiCheck className="h-6 w-6" />
				) : (
					<HiOutlineClipboardDocumentCheck
						className="h-6 w-6 cursor-pointer"
						onClick={async () => {
							await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`);
							setCopied(true);
							setTimeout(() => setCopied(false), 5000); // Reset after 2 seconds
						}}
					/>
				)}
			</h2>

			<Button onClick={() => router.push("/dashboard")}>Back to Home</Button>


		</div>
	)
}

export default FinishScreen