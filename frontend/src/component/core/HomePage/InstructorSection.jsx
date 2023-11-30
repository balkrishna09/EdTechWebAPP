import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'

export default function InstructorSection() {
  return (
    <div className='mt-16'>
        <div className='flex lg:flex-row flex-col gap-20 items-center'>
            <div className='w-[50%]'>
                <img src={Instructor} alt="instructors"
                    className='shadow-white'
                />   
            </div>

            <div className='flex flex-col gap-10'>
                <div className='text-4xl font-semibold lg:w-[50%]'>
                Become an 
                <HighlightText text={"Instructor"}/>
                </div>

                <p className='font-medium text-[16px] leading-6 lg:w-[70%] font-inter text-richblack-300'>
                Instructors from around the world teach millions of students on 
                StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                
                <div className='w-fit'>
                <Button active={true} linkto={"/signup"}>
                    <div className=' flex items-center gap-4'>
                        Start Teaching Today
                        <FaArrowRight/>
                    </div>
                    
                </Button>
                </div>
                
                
                
                
            </div>

        </div>
    </div>

  )
}
