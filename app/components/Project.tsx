import React from 'react'
import Image from 'next/image'

interface ProjectProps {
}

const Project: React.FC<ProjectProps> = () => {
  return (
    <div className='container mx-auto flex gap-6'>
      <div className='w-full flex flex-col items-center'>
        <h2 className='text-3xl text-white font-bold text-center'>Project</h2>
        <p className='text-white text-center'>This is a project</p>
      </div>
      <div className='w-full'>
        <div className='w-full min-h-[200px] relative'>
          <Image 
            src='https://www.starkcloud.com/hubfs/Futuro%20del%20Desarrollo%20de%20Software.webp' 
            alt='Project Image'
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </div>
    </div>
  )
}

export default Project