import React from 'react'
import LoginForm from '../features/auth/components/LoginForm.jsx'
import LoginHero from  '../features/auth/components/LoginHero.jsx'

const LoginPage = () => {
    return (
        <div className='grid grid-cols-5 w-full h-screen overflow-hidden'>
            <div className='col-span-3'>
                <LoginHero/>
            </div>

            <div className='col-span-2'>
                <LoginForm/>
            </div>

        </div>
    )
}

export default LoginPage;