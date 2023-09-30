'use client'
import { usePathname } from 'next/navigation';
import { Layout, Compass, List, BarChart } from 'lucide-react'
import React from 'react'
import SideBarItem from './SideBarItem';


const guestRoute = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics"
    }
]

function SideBarRoutes() {
    const pathname = usePathname();
    const isTeacher = pathname?.includes("/teacher")
    const route = isTeacher ? teacherRoutes : guestRoute;
    return (
        <div className='flex flex-col w-full'>
            {
                route.map(({ icon, label, href }) => <SideBarItem key={href} icon={icon} label={label} href={href} />)
            }
        </div>
    )
}

export default SideBarRoutes