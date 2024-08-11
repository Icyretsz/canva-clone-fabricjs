'use client'
import React, {useEffect, useState} from 'react';
import {UserButton} from '@clerk/nextjs'

const Header = () => {
    const [rendered, setRendered] = useState(false)
    useEffect(() => {
        setRendered(true)
    }, [])

    return (
        <div className=' w-full h-[68px] text-white absolute px-4 flex items-center justify-between text-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
            Canza
            { rendered && <UserButton/>}
        </div>
    );
};

export default Header;