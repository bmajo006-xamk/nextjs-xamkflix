'use client';

import sun from '@/public/svg/sun.svg';
import moon from '@/public/svg/moon.svg';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeButton () {

    const { systemTheme, theme, setTheme } = useTheme();
    
    const [ mounted, setMounted ] = useState(false);

    const renderThemeChanger = () => {

        if(!mounted) return null;

        const currentTheme = theme === 'system' ? systemTheme : theme;  
        if (currentTheme === 'dark') {
            return (
            <span className="h-auto btn-square flex justify-center p-2 bg-indigo-500 hover:bg-tummanharmaa rounded-md shadow-lg float-right">
                <Image width={25} height={20} src={sun} alt="sun" onClick={() => setTheme('light')} loading="eager" priority={true} />
            </span>
            )
        } else {
            return (
            <span className="h-auto btn-square flex justify-center p-2 bg-indigo-500 hover:bg-tummanharmaa rounded-md shadow-lg float-right">
                <Image width={25} height={20} src={moon} alt="moon" onClick={() => setTheme('dark')} loading="eager" priority={true} />
            </span>
            )
        }
    }

    useEffect(() => {
        setMounted(true);
        
    }, [])
    return (
    <button className="inline-block float-right">
        { renderThemeChanger()}
    </button>
    )


}