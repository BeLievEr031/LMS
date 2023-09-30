"use client";


import { UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import { LogOut } from "lucide-react"
import Link from 'next/link';

function NavbarRoutes() {
    const pathname = usePathname();
    const router = useRouter();
    const isTeacherPage = pathname?.startsWith("/teacher")
    const isPlayerPage = pathname?.includes("/chapter")
    return (
        <div className='flex items-center gap-x-4 ml-auto pr-2'>
            {
                isTeacherPage || isPlayerPage ? (
                    <Link href={"/"}>
                        <Button variant={"ghost"} size={"sm"} className='flex gap-x-1'>
                            <LogOut />
                            Exit
                        </Button>
                    </Link>
                )
                    : (
                        <Link href={"/teacher/courses"}>
                            <Button variant={"ghost"} size={"sm"}>
                                Teacher Mode
                            </Button>
                        </Link>
                    )
            }
            <UserButton
                afterSignOutUrl='/'
            />
        </div>
    )
}

export default NavbarRoutes