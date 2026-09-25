import React from 'react'
import icon from '../assets/images/icons.svg'
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-6 py-3 border-b-[0.1px] border-gray-300 sticky top-0 transparent-bg backdrop-blur-md z-10'>
        <div className='flex justify-center items-center gap-4'>
            <img src={icon} alt="" className='w-9'/>
            <div>
                <h2 className='text-2xl font-bold inter-font'>WordNest</h2>
                <p className='text-gray-500 text-xs'>Discover • Understand • Speak</p>
            </div>
        </div>
        {/* <div className='bg-white p-2 rounded-3xl'>
            <MdOutlineLightMode className='text-lg'/>
        </div> */}
    </nav>
  )
}

export default Navbar