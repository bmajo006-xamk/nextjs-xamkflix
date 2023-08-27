import Link from 'next/link';
import { esittelyfontti, fontti } from '@/public/fontit/fontit';
import LisaaKatselulistaanButton from './LisaaKatselulistaanButton';

interface Props {

    elokuva: Elokuva
}


export default function ElokuvaEsittely({elokuva} : Props) : React.ReactElement {

    const elokuvaId = JSON.stringify(elokuva._id);

  
    return (
    <> 
    <div className="p-2 grid place-items-center">
        <LisaaKatselulistaanButton elokuvaId = {elokuvaId} />
    </div>    
    <Link href={`/elokuva/${elokuva._id}`}>
        <div className="grid place-items-center max-w-3 h-90 shadow-lg dark:bg-stone-900 bg-vaaleanharmaa dark:hover:bg-stone-800">
            <div className="w-48 h-[274px]">   
                <img className="p-2 hover:opacity-50" src={`https://image.tmdb.org/t/p/w185/${elokuva.tmdbkuva}`} alt={elokuva.nimi} loading="eager" />
            </div>
            <div className="h-24 w-44 whitespace-normal mt-5 text-center">
                <h2 className={`${esittelyfontti.className} ${"text-xl dark:text-white text-musta"}`}>{elokuva.nimi}</h2>
            </div>
            <div>
                <h3 className={`${fontti.className} ${"text-lg dark:text-white text-musta"}`}>{elokuva.valmistumisvuosi}</h3>
            </div>
        </div>
    </Link>

    </>
    )
}