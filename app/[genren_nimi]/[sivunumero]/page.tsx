import { haeGenrenElokuvatSivunMukaan } from "@/lib/elokuvarekisteri";
import { laskeGenrenElokuvat } from "@/lib/elokuvarekisteri";
import ElokuvaEsittely from '@/components/ElokuvaEsittely';
import { esittelyfontti } from '@/public/fontit/fontit';

import Pagination from '@/components/Pagination';

interface Props {
    params:{
    genren_nimi: String
    sivunumero: number
    }
}

export default async function GenrePage ({params} : Props) {

    const muutaGenreString = () => {

        let genre : String;

        if (params.genren_nimi == 'scifi'){
            genre = 'Sci-Fi'
        } else if (params.genren_nimi == 'filmnoir'){
            genre = 'Film-Noir'
        } else if (params.genren_nimi == 'jannitys'){
            genre = 'Jännitys'
        } else if (params.genren_nimi == 'elamankerta'){
            genre = 'Elämänkerta'

        } else {
            genre = params.genren_nimi.charAt(0).toUpperCase() + params.genren_nimi.slice(1);
        }
      
            return genre;
    }

    const elokuvat : Elokuva[] = await haeGenrenElokuvatSivunMukaan(muutaGenreString(), params.sivunumero);
    const elokuvat_maara : number = await laskeGenrenElokuvat(muutaGenreString());
    const sivut : number = Math.round(elokuvat_maara/40);
    
    const elokuva_lista = elokuvat.map((elokuva: Elokuva, idx : number) => {
        return (
        <div key={idx} className="w-1/2 lg:w-1/4 mb-2">
            <ElokuvaEsittely elokuva={elokuva} />
        </div>

        )
    })


    return (
        <>
            <div className='bg-gradient-to-tl from-vaaleansininen to-tummanharmaa opacity-80 h-52 lg:h-72 flex justify-center relative'>
                <img height={14} src='https://www.themoviedb.org/t/p/original/1AjHJ0NP7BTI4zOVvmrmTXwGwvv.jpg' className='absolute w-full h-full object-cover mix-blend-overlay' />
                <div className="bg-vihreä flex  justify-center items-end relative">
                    <h1 className={`${esittelyfontti.className} ${"lg:text-5xl text-3xl dark:text-white text-black drop-shadow-md absolute bottom-16"}`}>{muutaGenreString()}</h1>
                </div>
                <div className="absolute bottom-0 lg:w-80 lg:h-12 w-64 h-10 dark:bg-stone-900 bg-vaaleanharmaa grid grid-cols-2">
                    <div className="flex justify-center items-center">
                        <h1 className={`${esittelyfontti.className} ${"lg:text-xl text-lg dark:text-white text-black text-center hover:border-b-4 border-indigo-500 cursor-pointer"}`}>Uusimmat</h1>
                    </div>
                    <div className="flex justify-center items-center">
                        <h1 className={`${esittelyfontti.className} ${"lg:text-xl text-lg dark:text-white text-black text-center hover:border-b-4 border-indigo-500 cursor-pointer"}`}>Suositut</h1>
                    </div>
                </div>
            </div>
            <div className="relative mt-8 p-3">
                <Pagination genre={params.genren_nimi} sivut={sivut} nykyinenSivu={params.sivunumero} />
                <div className="flex flex-wrap">{elokuva_lista}</div>
            </div>
        </>
    )
}