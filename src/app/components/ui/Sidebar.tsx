import React from 'react'
import User from './user'
import SidebarNav from './sidebarNav'
import Volunteer from './Volunteer'

function Sidebar() {
    return (
        <aside className="w-full h-auto md:h-screen flex flex-col sticky top-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md  z-10">
           <div className="space-y-4">
             <User />
             <SidebarNav />
             <Volunteer />
           </div>
        </aside>
    )
}

export default Sidebar

