import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import Image from "next/image"
  

function LoaingDialog({loading}) {
  return (
    <div>
        
        <AlertDialog open={loading}>
            
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogDescription>
                  <div className='flex flex-col items-center py-10'>
                    <Image src="/loader.gif" alt="Loading..." width={100} height={100} />
                    <h2>One moment please... Creating course</h2>
                  </div>

                </AlertDialogDescription>
                </AlertDialogHeader>

            </AlertDialogContent>
            </AlertDialog>



    </div>
  )
}

export default LoaingDialog