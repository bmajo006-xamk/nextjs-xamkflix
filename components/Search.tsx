'use client'


import search from '@/public/svg/search.svg';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';

export default function Search() : React.ReactElement {

    const [naytaInput, setNaytaInput] = useState(false);

    const inputKasittelija = () => {
        setNaytaInput(true);
    }
    const etsiElokuva = () => {
        alert("elokuva");
    }

    return (
    <>
    { (naytaInput) ?
    <div className="lg:w-[320px] w-[200px] mr-3">
        <div className="relative flex w-full flex-wrap items-stretch">
            <input
                type="search"
                className="relative m-0 mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Elokuvan nimi"
                aria-label="Search"
            />
            <button
                type="button"
                className="relative z-[2] flex items-center rounded-r bg-indigo-500 px-3 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                onClick={etsiElokuva}     
            >
                <Image width="25" height="25" src={search} alt="search" />

            </button>
        </div>
    </div>
    :
    <span className="lg:mr-3 ml-32 cursor-pointer" onClick={inputKasittelija}>
        <Image width="25" height="25" src={search} alt="search" />
    </span>
    }
    </>
    )

}
