import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import HighlightText from '../component/core/HomePage/HighlightText'
import Button from '../component/core/HomePage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../component/core/HomePage/CodeBlocks'
import TimelineSection from '../component/core/HomePage/TimelineSection'
import LearningLanguageSection from '../component/core/HomePage/LearningLanguageSection';
import InstructorSection from '../component/core/HomePage/InstructorSection';
import ExploreMore from '../component/core/HomePage/ExploreMore';
import Footer from '../component/common/Footer'

export default function Home() {
  return (
    <div className=''>
        {/* section 1  */}
            <div className=' relative flex mx-auto flex-col max-w-maxContent items-center
             text-white justify-between  '>

                <Link to={"/signup"}>
                    <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold 
                    text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] 
                        transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower your Future with
                    <HighlightText text={"Coding Skills"}/>
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from 
                    anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-16'>
                    <Button active={true} linkto={"/signup"}>
                        Learn More
                    </Button>
                        
                    <Button active={false} linkto={"/login"}>
                        Book a Demo
                    </Button>
                </div>

                <div className= " shadow-blue-200 mx-3 my-12 shadow-[10px_-5px_50px_-5px]">
                    <video muted loop autoPlay className='shadow-[20px_20px_rgba(255,255,255)] '>
                        <source src={Banner} type="video/mp4"/>
                    </video>
                </div>

                {/* code section 1 */}
                <div >
                    <CodeBlocks 
                        position={"lg:flex-row"}
                        

                        heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={"coding potential"}/>
                            {" "}
                            with our online courses
                        </div>}

                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        btn1={
                            {
                                btnText:"try it yourself",
                                linkto: "/signup",
                                active: true
                            }
                            }
                        btn2={
                            {
                                btnText:"learn more",
                                linkto: "/login",
                                active: false
                            }
                            }
                        
                        codeblock={
                                    `<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">\nTwo</a><ahref="three/">Three</a>\n/nav>`
                                }
                        codeColor = {"text-yellow-25"}
                        bg_colour={"codeblock1"}

                    />
                </div>

                {/* code section 2  */}
                <div>
                    <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        

                        heading={
                        <div className='text-4xl font-semibold'>
                            Start 
                            <HighlightText text={"coding in seconds"}/>
                            {" "}
                        </div>}

                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        btn1={
                            {
                                btnText:"Continue Lesson",
                                linkto: "/signup",
                                active: true
                            }
                            }
                        btn2={
                            {
                                btnText:"learn more",
                                linkto: "/login",
                                active: false
                            }
                            }
                        
                        codeblock={
                                    `<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">\nTwo</a><ahref="three/">Three</a>\n/nav>`
                                }
                        codeColor = {"text-yellow-25"}
                        bg_colour={"codeblock2"}

                    />
                </div>
                
                <ExploreMore/>
            </div>

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 '>
            <div className='homepage_bg h-[320px]'>
                <div className='w-11/12 max-w-maxContent h-[500px] flex items-center justify-center gap-5 mx-auto '>
                    
                    <div className='flex flex-row gap-7 text-white'>
                        <Button active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore full catalog
                                <FaArrowRight/>
                            </div>
                        </Button>
                        <Button active={false} linkto={"/signup"}>
                                <div className='flex items-center'>
                                    Learn more
                                    <FaArrowRight/>
                                </div>
                        </Button>

                    </div>
                </div>

            </div>

            <div className='mx-auto max-w-maxContent w-11/12 flex flex-col items-center justify-between gap-7'>
                <div className='lg:flex flex-col space-y-5 mb-10 mt-[100px]'>
                    <div className='text-4xl font-semibold  lg:w-[45%]'>
                        Get the Skills you need for a 
                        <HighlightText text={"Job that is in demand"}/>
                    </div>

                    <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
                        <p>The modern StudyNotion is the dictates its own terms. Today, to be a 
                        competitive specialist requires more than professional skills.</p>
                        <Button active={true} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </Button>
                    </div>
                </div>
                <TimelineSection/>

                <LearningLanguageSection/>
            </div>
                                

        </div>

        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-richblack-900
        text-white items-center'>
            <InstructorSection/>
            <h2 className='text-center font-semibold text-4xl mt-10'>
                Review from other learner
            </h2>
            
        </div>

        {/* Footer */}
        <Footer/>


    </div>
  )
}
