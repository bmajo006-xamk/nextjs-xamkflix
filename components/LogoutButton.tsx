'use client';
import { supabaseBrowserClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';


export default function LogoutButton() : React.ReactElement {

    const router = useRouter();

    const handleLogout = async () : Promise<void> => {
        console.log("kirjaudu ulos");
        //täällä tyhjennetään locals!!!'
        await supabaseBrowserClient.auth.signOut();
        router.push("/");

    }
    return (
        <li className="border-t-2 border-52 border-indigo-500 text-white text-sm font-semibold self-center"><a onClick={handleLogout}>Kirjaudu ulos</a></li>
    )
}