import React from 'react'
import MobileSideBar from './MobileSideBar'
import NavbarRoutes from '@/components/NavbarRoutes'

function NavBar() {
    return (
        <div className='h-full border-b flex items-center bg-white'>
            <MobileSideBar />
            <NavbarRoutes />
        </div>
    )
}

export default NavBar