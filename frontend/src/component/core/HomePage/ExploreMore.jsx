import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName= ["Free","New to coding","Most popular", "Skills paths","Career paths"];


export default function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMycards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock the
            <HighlightText text={"Power Of Code"}/>
        </div>

        <p className=' text-center text-richblack-300 text-lg font-semibold mt-3 mb-5'>
            Learn to build anything you can imagine
        </p>

        <div className='lg:flex flex-row rounded-full hidden bg-richblack-800 mb-5 border-richblack-100 gap-2
        px-1 py-1'>
            {
                tabsName.map((element, index)=>{
                    return(
                        <div   
                            className={` text-[15px] flex items-center gap-5
                            ${currentTab === element? "bg-richblack-900 text-richblack-5 gap-2 font-medium":
                            "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                            hover:bg-richblack-900 hover:text-richblack-5 px-7 py-[7px] p-1`}
                            key={index}
                            onClick={()=>{setMycards(element)}}>
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-[150px]'></div>

        <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between 
        flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]
         text-black lg:-mb-5 mb-7 lg:px-0 px-3'>
            {
                courses.map((element, index)=>{
                    return(
                        <CourseCard
                            key={index}
                            cardData={element}
                            currentCard = {currentCard}
                            setCurrentCard ={setCurrentCard}
                        />
                    )
                })
            }
        </div>

    </div>
  )
}
