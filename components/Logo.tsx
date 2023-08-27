'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import xamkflix_logo_valkoinen from '@/public/img/xamkflix_logo_valkoinen.png';
import xamkflix_logo_musta from '@/public/img/xamkflix_logo_musta.png';
import { useTheme } from 'next-themes';


function Logo() : React.ReactElement {

    const { systemTheme, theme } = useTheme();
    const [ mounted, setMounted ] = useState(false);

    const renderLogoColor = () => {

        if(!mounted) return null;
        const currentTheme = theme === 'system' ? systemTheme : theme;

        return (
            <Image width={200} height={25} src={ currentTheme ===  'dark' ? xamkflix_logo_valkoinen : xamkflix_logo_musta} alt="xamkflix" loading="eager" priority={true}/>
        )
    }

    useEffect(() => {
        setMounted(true);
        
    }, [])

    return (
        <>
         <div className="inline-block lg:float-left flex justify-self-center lg:w-full lg:h-full sm:w-[180px] sm:h-[27px] w-[120px] h-[24px]">
            { renderLogoColor() }
        </div>
        </>
    )
}
export default Logo;