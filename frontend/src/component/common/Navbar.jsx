import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import { categories } from '../../services/api'
import { apiConnector } from '../../services/apiconnector'
import { IoIosArrowDown } from "react-icons/io";

export default function Navbar() {

    const subLinks = [
        {
            title:"python",
            link:"/catalog/python"
        },
        {
            title:"web dev",
            link:"/catalog/web-dev"
        },
    ]
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart)
    const location = useLocation();

    // const [subLinks, setSubLinks] = useState([])

    // const fetchSublinks = async()=>{
    //     try {
    //         const result = await apiConnector("GET", categories)
    //         setSubLinks(result.data.data);
    //         console.log("data",result)
            
    //     } catch (error) {
    //         console.log("could not the fetch list ",error)
    //     }
    // }
    // useEffect(()=>{
    //     fetchSublinks();
    // },[])

    const matchRoute = (route) =>{
        return matchPath({path:route}, location.pathname)
    }
  return (
    <div className=' flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            {/* logo */}
            <Link to='/'>
                <img src={logo} alt="" width={160} height={32} loading='lazy'/>
            </Link>

            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, index)=>{
                            return(
                                <li key={index}>
                                {
                                    link.title=== "Catalog" ? (
                                        <div className='relative flex items-center gap-1 group'>
                                            <p>{link.title}</p>
                                            <IoIosArrowDown />

                                            <div className=" invisible absolute left-[50%] top-[50%] flex translate-x-[-50%]
                                             translate-y-[60%]
                                             flex-col rounded-md bg-richblack-5 p-4 text-pure-greys-900 opacity-0
                                             transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]
                                             ">
                                                <div className='abosulte left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-45%]
                                                translate-x-[80%]'>
                                                </div>
                                                {
                                                    subLinks.length ? (
                                                    
                                                            subLinks.map ((sublink, index)=>(
                                                                <Link to={sublink.link} key={index}>
                                                                    <p>{sublink.title}</p>
                                                                </Link>
                                                            ))
                                                        
                                                    ) : (<div></div>)
                                                }
                                            </div>
                                        </div>
                                    ) : 
                                    (
                                        <Link to={link?.path}>
                                        <p className={`${matchRoute (link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>
                                        
                                        </Link>
                                    )
                                }
                            </li>
                            )

                        })
                    }
                </ul>
            </nav>

            {/* login and signup dashboard */}
            <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblue-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/>
                    }
            </div>

        </div>
    </div>
  )
}
