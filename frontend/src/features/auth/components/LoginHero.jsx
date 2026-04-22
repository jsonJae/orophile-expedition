import React from 'react'
import LoginPic from "../../../assets/pics/loginPic.jpg"
const LoginHero = () => {
    return (
        <div className='col-span-1 w-full h-screen relative'>
            <img 
                src={ LoginPic } 
                alt="Description" 
                className=" w-full h-full object-fill" 
            /> 
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60"></div>

            <div className='z-10 absolute left-20 bottom-20'>
                <p className='font-optica font-black text-5xl text-white leading-none tracking-wide'>
                    The summit<br/>is waiting.<br/>Tara!
                </p>
                {/* Subtitle */}
                <div className='flex justify-start items-center mt-4 gap-2'>
                    <div className='w-1/7 h-0.5 bg-gray-500'></div>
                    <p className='text-sm tracking-widest text-gray-300'>
                        OROPHILE EXPEDITIONS
                    </p>
                </div>

            </div>   
        </div>
    )
}

export default LoginHero