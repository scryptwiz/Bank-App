import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
             <nav className="navbar fixed-top">
            <div className="container sm:px-4 lg:px-8 flex flex-wrap items-center justify-between lg:flex-nowrap">
                
                <a className="inline-block mr-4 py-0.5 text-xl whitespace-nowrap hover:no-underline focus:no-underline" href="index.html">
                    Banka International Limited
                    {/* <img src="assets/images/logo.svg" alt="alternative" className="h-8" /> */}
                </a>

                <button className="background-transparent rounded text-xl leading-none hover:no-underline focus:no-underline lg:hidden lg:text-gray-400" type="button" data-toggle="offcanvas">
                    <span className="navbar-toggler-icon inline-block w-8 h-8 align-middle"></span>
                </button>

                <div className="navbar-collapse offcanvas-collapse lg:flex lg:flex-grow lg:items-center" id="navbarsExampleDefault">
                    <ul className="pl-0 mt-3 mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row">
                        <li>
                            <a className="nav-link page-scroll active" href="#header">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li>
                            <a className="nav-link page-scroll" href="#features">Features</a>
                        </li>
                        <li>
                            <a className="nav-link page-scroll" href="#details">Details</a>
                        </li>
                        <li>
                            <Link className="nav-link page-scroll" to="/signup">Create Account</Link>
                            {/* <a className="nav-link page-scroll" href="">Create Account</a> */}
                        </li>
                        <li className='flex justify-center items-center'>
                            <Link className="bg-blue-700 border text-white px-4 py-2.5 hover:border-blue-700 hover:bg-transparent rounded-md transition-all ease-in-out duration-700 hover:text-blue-700" to="/login">Log in</Link>
                        </li>
                    </ul>
                    <span className="block lg:ml-3.5">
                        <a className="no-underline" href="#your-link">
                            <i className="fab fa-apple text-indigo-600 hover:text-pink-500 text-xl transition-all duration-200 mr-1.5"></i>
                        </a>
                        <a className="no-underline" href="#your-link">
                            <i className="fab fa-android text-indigo-600 hover:text-pink-500 text-xl transition-all duration-200"></i>
                        </a>
                    </span>
                </div> 
            </div> 
        </nav>
        {/* Header */}
        <header id="header" className="header py-28 text-center md:pt-36 lg:text-left xl:pt-44 xl:pb-32">
            <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
                    <h1 className="h1-large mb-5">Banka management banking system</h1>
                    <p className="p-large mb-8">Banka Management team are here to help when you need your financial support</p>
                    <a className="btn-solid-lg" href="#your-link"><i className="fab fa-apple"></i>Get Started</a>
                    {/* <a className="btn-solid-lg secondary" href="#your-link"><i className="fab fa-google-play"></i>Log in</a> */}
                </div>
                <div className="xl:text-right">
                    <img className="inline" src="assets/images/landing-page.svg" alt="alternative" />
                </div>
            </div>
        </header>
    </div>
  )
}
