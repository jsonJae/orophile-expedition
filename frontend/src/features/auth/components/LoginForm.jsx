import React, { useState } from 'react'
import { Link } from 'react-router';
import authApi from '../api/authApi.js'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null)
        setLoading(true)

        try{
            const response = await authApi.login(email, password);

            if(response.login){
                localStorage.setItem('token', response.token);
                console.log("Logged in!");
            }

        } catch (err) {
            setError(err.response?.data?.message || "An unexpected error occurred.");    
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className='flex flex-col items-center justify-center bg-background h-screen'>
            <div className='flex flex-col w-1/2 gap-2'>
                <div className='flex flex-col gap-1.5'>
                    <p className='font-poppins font-bold text-secondary text-4xl'>
                        Welcome Back, Trailblazer!
                    </p>
                    <p className='font-opensans text-[#1A202C] text-sm'>
                        Log in to book upcoming hiking expeditions.
                    </p>
                </div>

                <div className='flex flex-col align mt-4'>
                    <div>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                            <div className='flex flex-col'>
                                <label className='font-opensans font-semibold mb-1.5 text-xs'>
                                    Email Address
                                </label>
                                <input 
                                    type="email"
                                    placeholder="name@example.com"
                                    value = {email}
                                    onChange = {(e) => setEmail(e.target.value)}
                                    required
                                    className='font-opensans bg-[#BFBDB8]/10 border border-secondary focus:outline-none focus:border-accent [&:not(:placeholder-shown):invalid]:text-error [&:not(:placeholder-shown):invalid]:border-error text-sm px-3 py-2.5 rounded-md shadow-gray-400 shadow-xs transition-colors'
                                />  
                            </div>

                            <div className='flex flex-col '>
                                <label className='font-opensans font-semibold mb-1.5 text-xs'>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder='*********'
                                    value = {password}
                                    onChange = {(e) => setPassword(e.target.value)}
                                    required
                                    className='font-opensans bg-[#BFBDB8]/10 border border-secondary focus:outline-none focus:border-accent text-sm px-3 py-2.5 rounded-md shadow-gray-400 shadow-xs'
                                />
                            </div>
                            {/* This is the part that makes the error visible to the user */}
                                {error && (
                                    <div style={{ color: 'red', marginBottom: '10px' }}>
                                        {error}
                                    </div>
                            )}

                            <div className='flex flex-row justify-end pr-2 mt-1'>
                                <Link className='font-opensans font-semibold text-xs text-accent underline hover:brightness-80 transition-all'>
                                    Forgot password
                                </Link>
                            </div>

                            <div className='flex justify-center mt-4'>
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className='font-opensans bg-primary text-white w-full h-8 border border-transparent rounded-md hover:bg-primary-dark transition-all cursor-pointer'
                                >
                                    Login
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <p className='font-opensans font-extralight text-xs mt-2'>
                        Don't have an account?  {' '}
                        <Link 
                            to="/register" 
                            className="underline text-accent hover:brightness-70 transition-all font-semibold"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>

        </div>

        
    )
}

export default LoginForm