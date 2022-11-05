import React from 'react';
import { Notifi }  from '../components/Notifi';
import { Header } from '../public/Header';
import { Sidebar } from '../public/Sidebar';

export const Notification = () => {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="h-full overflow-y-auto dark:bg-black">
                    <div className='container px-4 md:px-6 py-8 mx-auto grid'>
                        <div className='mb-10'>
                            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Notification</h2>
                            <span className='w-16 rounded h-1 bg-purple-600'></span>
                        </div>
                        <div className='flex flex-col gap-5'>
                           <Notifi />
                           <Notifi />
                           <Notifi />
                           <Notifi />
                           <Notifi />
                           <Notifi />
                           <Notifi />
                           <Notifi />
                           <Notifi />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
