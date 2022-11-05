import React from 'react'

export const Notifi = () => {
    return (
        <div className='bg-white dark:bg-gray-700 dark:text-gray-200 text-gray-500 h-auto shadow-md rounded-md text-sm px-3 py-3 flex gap-2 md:gap-3 items-center'>
            <span
                class="hidden md:inline-block w-3 h-3  bg-red-600 border-2 border-white rounded-full dark:border-gray-200"
            ></span>
            <div className='align-middle rounded-full focus:shadow-outline-purple focus:outline-none'>
                <img
                    class="object-cover w-8 h-8 rounded-full"
                    src="https://pbs.twimg.com/profile_images/1551272248903966721/YXNtcsNT_400x400.jpg"
                    alt=""
                    aria-hidden="true"
                />
            </div>
            <div className='flex flex-col'>
                <span className='font-semibold text-sm'>Admin</span>
                <span className='text-[12px] md:text-[14px]'>You need to verify your account to enjoy the app</span>
            </div>
        </div>
    )
}
