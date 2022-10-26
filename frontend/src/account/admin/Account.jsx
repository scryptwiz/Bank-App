import React, { useState } from 'react'
import { Header } from '../../public/Header'
import { Sidebar } from '../../public/Sidebar'

export const Account = () => {
    const [status, setStatus] = useState(false);
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="flex flex-col gap-2 h-full overflow-y-auto dark:bg-black p-3">
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                        <div
                            className="flex items-center w-64 px-5 py-8 mx-auto lg:mx-0 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                        >
                            <div
                                className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <p
                                    className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                                >
                                    Account Number
                                </p>
                                <p
                                    className="text-lg font-semibold text-gray-700 dark:text-gray-200"
                                >
                                    6262629087
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setStatus(!status)} className='bg-purple-600 mx-auto lg:mx-0 w-36 h-10 lg:mt-10 rounded-sm px-8 text-center text-white'>Reset Pin</button>
                    </div>
                    {status && <div className='w-full lg:w-5/12 shadow dark:bg-gray-800 mx-auto px-10 py-9'>
                        <h2 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>Reset your Pin</h2>
                        <form className='flex flex-col gap-1'>
                            <div>
                                <label className="text-gray-700 text-sm font-semibold"> Old Pin</label>
                                <input
                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                    placeholder="" type="number" name='email'
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm font-semibold"> New Pin</label>
                                <input
                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                    placeholder="" type="number" name='email'
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 text-sm font-semibold"> Confirm New Pin</label>
                                <input
                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                    placeholder="" type="number" name='email'
                                />
                            </div>
                            <button type='submit'
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                            >
                                Reset Pin
                            </button>
                        </form>
                    </div>}
                </main>
            </div>
        </div>
    )
}
