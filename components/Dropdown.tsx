'use client';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import ChangePasswordModal from './ChangePasswordModal';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { supabaseBrowserClient } from '@/lib/supabase';
import {useState, useEffect } from 'react';





export default function Dropdown() : React.ReactElement {

    const [ user, setUser] = useState<any>("");
    const getUsername = async () => {
        const { data }  = await supabaseBrowserClient.auth.getUser();
        setUser(data.user?.email);
    }
    useEffect( () => {

        getUsername();

    }, []);
    
    return (
    <>
        <div className="dropdown dropdown-left ">
            <div className="avatar placeholder">
                <div tabIndex={0} className="text-neutral-content rounded-full w-12 ml-3 mr-3 justify-self-center dark:bg-tummanharmaa bg-vaaleanharmaa shadow-lg float-right border-indigo-500 border-2 cursor-pointer">
                    <span className="text-white">MJ</span>
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-stone-800 w-56">
                <li className="text-white font-semibold text-sm"><div><PersonOutlineIcon />{user}</div></li>
                {/* Open the modal using ID.showModal() method */}
                <li className="text-white font-semibold text-sm"><a href="#change_password"><EditOutlinedIcon /> Vaihda salasana</a></li>
                <li className="text-white font-semibold text-sm"><Link href="/katselulista"><SlideshowIcon />Katselulista</Link></li>
                <LogoutButton />
            </ul>
        </div>
        <ChangePasswordModal />
    </>
    )
}

