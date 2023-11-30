import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },    
    {
        logo: Logo2,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        logo: Logo3,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        logo: Logo4,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
]

export default function TimelineSection() {
  return (
    <div>
        <div className='lg:flex-row flex flex-col gap-15 items-center'>

            <div className='flex flex-col w-[45%] gap-5'>
                {
                    timeline.map((element, index)=>{
                        return (
                          <div className='flex flex-col gap-6 item-start'>
                            <div className="flex flex gap-6 mt-5" key={index}>
                              <div className=" w-[50px] h-[50px] bg-white rounded-full flex items-center">
                                <img src={element.logo} alt="" />
                              </div>
                              <div>
                                <h2 className="font-semibold text-[18px]">
                                  {element.heading}
                                </h2>
                                <p className="text-base">
                                  {element.description}
                                </p>
                              </div>
                            </div>
                            <div>
                                    {timeline.length -1 === index ? 
                                        <div></div> 
                                        : <div
                                            className='-mt-8 h-20 w-[1px] bg-black absolute ml-3'>   
                                            </div>}
                                </div>
                          </div>
                        );
                    })
                }
                
            </div>

            <div className='relative shadow-blue-200'>
                <img src={timelineImage} alt="timeLineImage"
                    className=' object-cover h-fit  shadow-blue-200 shadow-[10px_-5px_50px_-5px]'
                />

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 gap-4
                        left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className=' text-caribbeangreen-300 text-sm'>Years Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className=' text-caribbeangreen-300 text-sm'>Types of courses</p>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}
