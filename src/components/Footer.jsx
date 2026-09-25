import React from 'react'
import icon from '../assets/images/icons.svg'

const Footer = () => {
    return (
        <footer className='flex justify-between items-center px-16 py-5 bg-gray-50 '>
            <div className='flex justify-center items-center gap-4'>
                <img src={icon} alt="" className='w-6' />
                <div>
                    <h2 className='text-xl font-bold inter-font'>WordNest</h2>
                    <p className='text-gray-500 text-xs'>Discover • Understand • Speak</p>
                </div>
            </div>

            <p className='text-gray-400 text-sm'>© 2025 WordNest. All rights reserved - <a href='https://www.artfolio.tech/vinitgite' target='_blank' className='hover:underline cursor-pointer text-blue-500 transition-all ease-in-out duration-300'>Vinit Gite</a></p>
        </footer>
    )
}

export default Footer