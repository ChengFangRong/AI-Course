import React from 'react'
import Youtube from 'react-youtube';

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0
    },
};


function ChapterContent({chapter, content}) {
    console.log(chapter)
  return (
    <div className='p-10'>
        <h2 className='font-medium text-2xl'>{chapter?.name}</h2>
        <p className='text-gray-500'>{chapter?.about}</p>

        {/* Video */}

        <div className='flex justify-center my-6'>
        <Youtube
         videoId={content?.videoId} 
         opts={opts}/>
        </div>

        <div>
            {content?.content?.map((item,index)=>(
                <div className='p-5 bg-sky-50 rounded-lg mb-3'>
                    
                    <h2 className='font-medium text-lg'>
                        {item.title}
                    </h2>

                    {item?.description && <p className='whitespace-pre-wrap'>{item?.description}</p>}
                    {item?.explanation && <p className='whitespace-pre-wrap'>{item?.explanation}</p>}
                    {item.codeExample && 
                    <div className='p-4 bg-gray-800 text-white rounded-md mt-3'>
                        <pre> 
                            <code>{item.codeExample}</code>
                        </pre>                        
                    </div>}

                </div>
            ))}
        </div>



        {/* content */}



    </div>
  )
}

export default ChapterContent