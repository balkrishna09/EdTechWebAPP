import React from 'react'
import Button from "./Button"
// import HighlightText from './HighlightText'
import {FaArrowRight} from "react-icons/fa"
import {TypeAnimation} from "react-type-animation"
import "../../../../src/App.css"

export default function CodeBlocks({position, heading, subheading, btn1, btn2, codeblock, backgroundGradient, codeColor, bg_colour}) {
  return (
    <div className={`lg:flex flex-col ${position} my-20 justify-between gap-10 lg:space-y-0 space-y-10 lg:p-0 p-8`}>
        
        {/* section 1 */}
        <div className={`lg:w-[50%] flex flex-col gap-8`}>
            {heading}
            <div className={`text-richblack-300 font-bold`}>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <Button active={btn1.active} linkto={btn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {btn1.btnText}
                        <FaArrowRight/>
                    </div>
                </Button>
                <Button active={btn2.active} linkto={btn2.linkto}>
                        {btn2.btnText}   
                </Button>
            </div>

        </div>

        {/* section 2 coding animation */}
        <div className='h-fit flex flex-row  w-[100%] py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 lg:w-[470px] code-border'>
            <div className={`absolute ${bg_colour}`}>
            </div>
            <div className='text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                <TypeAnimation
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                />

            </div>
        </div>

    </div>
  )
}
