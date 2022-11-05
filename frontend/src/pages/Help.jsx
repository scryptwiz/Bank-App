import React from 'react';
import { Header } from '../public/Header';
import { Sidebar } from '../public/Sidebar';

export const Help = () => {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="h-full overflow-y-auto dark:bg-black">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center p-10">We're Here to Help You!</h2>
                    <div className='w-full lg:w-7/12 px-8 lg:px-20 md:py-9 mx-auto flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label className="text-gray-700 text-sm font-semibold dark:text-gray-300"> Hi! How can we help?</label>
                            <input type="text" className='block w-full mt-1 text-sm border px-3 py-3 rounded border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500' placeholder='How can we help?' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className="text-gray-700 text-sm font-semibold dark:text-gray-300"> Which section isn't working?</label>
                            <select name="" id="" className='block w-full mt-1 text-sm border px-3 py-3 rounded border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500'>
                                <option value="">Transaction</option>
                                <option value="">Deposit</option>
                                <option value="">Insights</option>
                                <option value="">Wallet</option>
                                <option value="">Account</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className="text-gray-700 text-sm font-semibold dark:text-gray-300"> Please describe your issue so we can help you more quickly.</label>
                            <input type="text" className='block w-full mt-1 text-sm border px-3 py-3 rounded border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500' placeholder='Please describe your issue' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className="text-gray-700 text-sm font-semibold dark:text-gray-300"> Pls Include a screenshot(or video) of the issue if applicable.</label>
                            <input type="text" className='block w-full mt-1 text-sm border px-3 py-3 rounded border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500' placeholder='A decription of the screenshot (or video)' />
                        </div>
                        <button type='submit'
                                        className="block w-full px-4 py-3 mt-4 text-base font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    >
                                        Send Email
                                    </button>
                    </div>
                </main>
            </div>
        </div>
    )
}
