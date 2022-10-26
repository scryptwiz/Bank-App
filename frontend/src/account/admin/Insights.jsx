import React from 'react'
import { Header } from '../../public/Header'
import { Sidebar } from '../../public/Sidebar'

export const Insights = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar />
    <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full overflow-y-auto dark:bg-black"></main>
    </div>
</div>
  )
}
