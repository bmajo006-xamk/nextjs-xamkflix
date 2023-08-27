import { genret } from '../lib/genre';
import Link from 'next/link';
import { esittelyfontti } from '@/public/fontit/fontit';

export default function Navbar () {

    const genrelista = genret.map ((genre : String, idx : number) => {
        return <li key={idx} className={`${"dark:text-white text-musta text-lg p-2 ml-6 tracking-normal hover:border-b-[3px] hover:border-sininen dark:border-vaaleansininen hover:scale-105 transition ease-in-out delay-150 hover:rounded-md hover:drop-shadow-lg"}`}><Link href={`/${genre.toLowerCase().replace(/ä/g, "a").replace("-","")}/1`}><p className={esittelyfontti.className} >{genre}</p></Link></li>
    })

    return (
    <>
        <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                      <ul className="p-4 w-65 dark:bg-stone-800 bg-vaaleanharmaa text-base-content cursor-pointer">
                      {genrelista}
                      </ul>
        </div>
    </>
    )



}