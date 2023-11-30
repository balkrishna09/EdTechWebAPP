import React from 'react';
import HighlightText from './HighlightText';
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import Button from './Button';

export default function LearningLanguageSection() {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center'>

            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife For
                <HighlightText text={"learning any language"} linkto={"/signup"}/>
            </div>

            <div className='text-center text-richblack-600 mt-3 leading-6 mx-auto font-medium lg:w-[75%] text-xl'>
                Using spin making learning multiple languages easy. with 20+ 
                languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex lg:flex-row flex-col items-center justify-center mt-5'>
                <img src={know_your_progress} 
                    alt="knowyourprogressimage"
                    className=' object-contain -mr-32'
                />
                <img src={compare_with_others} 
                    alt="knowyourprogressimage"
                    className=' object-contain'
                />
                <img src={plan_your_lesson} 
                    alt="knowyourprogressimage"
                    className=' object-contain -ml-32'
                />

            </div>
            
            <div className='w-fit'>
            <Button active={true} linto={"/signup"}>
                Learn More
            </Button>
            </div>
            
        </div>
    </div>
  )
}
