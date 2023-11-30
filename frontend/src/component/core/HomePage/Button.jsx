import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({children, active, linkto}) {
  return (
    <Link to={linkto}>
    <div className={`text-center text-[16px] py-3 px-6 rounded-md font-bold
    ${active ? 'bg-yellow-50 text-black': 'bg-richblack-800'} hover:scale-95 transition-all duration-200
    shadow-[1.5px_1.5px_rgba(8,_112,_184,_0.7)] hover:shadow`}>
        {children}
    </div>
        
    </Link>
  )
}
