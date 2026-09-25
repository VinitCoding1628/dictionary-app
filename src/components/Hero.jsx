import React from 'react'
import { PiStarBold } from "react-icons/pi";
import { MdOutlineHeadset } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi";
import hero_img from '../assets/images/hero_img.svg'

const Hero = () => {

    const features = [
        {
            icon: MdOutlineHeadset,
            icon_color: '#9333EA',
            icon_bg_color: '#F3E8FF',
            title: 'Audio',
            description: 'Pronunciations'
        },
        {
            icon: HiOutlineBookOpen,
            icon_color: '#2563EB',
            icon_bg_color: '#DBEAFE',
            title: 'Detailed',
            description: 'Definitions'
        },
        {
            icon: MdOutlineHeadset,
            icon_color: '#0D9488',
            icon_bg_color: '#CCFBF1',
            title: 'Example',
            description: 'Sentences'
        },


    ];
    return (
        <section className='hero-bg-image lg:flex justify-between items-center rounded-xl border border-white p-10'>
            <div className='flex flex-col lg:justify-start lg:items-start md:justify-center md:items-center sm:justify-center sm:items-center justify-center items-center gap-6 lg:w-160 md:w-fit sm:w-fit w-fit'>
                <p className='text-blue-500 text-xs font-semibold bg-white flex gap-2 items-center w-fit justify-center px-4 rounded-2xl py-1 uppercase'> <PiStarBold className='text-blue-500 text-sm shadow' /> A Modern Dictionary </p>
                <h2 className='lg:text-6xl md:text-5xl sm:text-4xl text-4xl font-extrabold'>Words open <span className='text-blue-500'>new worlds.</span></h2>
                <p className='text-gray-500 text-lg'>
                    Search meanings, hear pronunciations, explore examples and grow your vocabulary — one word at a time.
                </p>

                {/* Features */}
                <div className='flex flex-wrap gap-3'>
                    {
                        features.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <div key={index} className='bg-white px-3.5 py-2 rounded-xl w-max'>
                                    <span className='flex items-center justify-center gap-3'>
                                        <Icon style={{ color: `${item.icon_color}`, backgroundColor: `${item.icon_bg_color}` }} className='p-1.5 text-4xl rounded-lg' />
                                        <div>
                                            <h3 className='font-semibold'>{item.title}</h3>
                                            <p className='text-gray-600 font-semibold'>{item.description}</p>
                                        </div>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex lg:justify-end md:justify-center sm:justify-center justify-center lg:items-end md:items-center sm:items-center items-center'>
            <img src={hero_img} alt="" className='w-120 pt-10' />
            </div>
        </section>
    )
}

export default Hero