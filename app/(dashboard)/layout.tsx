import React from "react";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";

const DahboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">

            <div className="md:pl-56 h-[60px] shadow-sm inset-y-0">
                <NavBar />
            </div>

            <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
                <SideBar />
            </div>
            <main className="h-4/5 md:pl-56">
                {children}
            </main> 
        </div>
    );
}

export default DahboardLayout;