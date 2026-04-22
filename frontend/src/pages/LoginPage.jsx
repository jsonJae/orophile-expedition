import React from 'react'
import LoginForm from '../features/auth/components/LoginForm.jsx'
import LoginHero from  '../features/auth/components/LoginHero.jsx'

const LoginPage = () => {
    return (
        <div className='grid grid-cols-2 w-full h-screen overflow-hidden'>
            <div>
                <LoginHero/>
            </div>

            <div>
                <LoginForm/>
            </div>

        </div>
    )
}

export default LoginPage;