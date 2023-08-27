import { haeElokuva, haeNayttelijaData, haeKuvausTeksti } from '@/lib/elokuvarekisteri';
import Link from 'next/link';
import { esittelyfontti, fontti } from '@/public/fontit/fontit';

interface Props {
    params : {
        elokuvan_id : string
    }
}
//tmdb-osoite:
// href={`https://www.themoviedb.org/movie/${elokuva.tmdbid}-${elokuva.nimi}

export default async function ElokuvaPage({params} : Props)  {
    'use client';

    const elokuva : Elokuva = await haeElokuva(params.elokuvan_id);
    const nayttelijat : Actors = await haeNayttelijaData(elokuva.tmdbid);
    const kuvaustekstit : string = await haeKuvausTeksti(elokuva.tmdbid);
    const elokuvan_kesto = () => {
        let elokuva_kesto;
        if (elokuva.kestomin < 60) {
            elokuva_kesto = elokuva.kestomin;
        }else {
            let elokuva_kestoh = String(elokuva.kestomin/60).split(".")[0];
            let elokuva_kestomin = elokuva.kestomin- (Number(elokuva_kestoh)*60)
            elokuva_kesto = elokuva_kestoh+ 'h ' + elokuva_kestomin + 'min'
        }
      return elokuva_kesto
    }
    const elokuvan_tuotantomaa = () => {
        let elokuva_tuotantomaat : any = [];
        const maat = new Intl.DisplayNames(
            ['fi'], {type: 'region'}
          );
        
        elokuva.tuotantomaa.map((maa : any) => {
             elokuva_tuotantomaat.push(maat.of(maa));
        })

       return elokuva_tuotantomaat.join(', ');
    }

    const elokuvan_genre = () => {
        let elokuva_genret : any = []; 
        elokuva.genre.map((maa : any) => {
            elokuva_genret.push(maa.charAt(0).toLowerCase() + maa.slice(1));
        })
        return elokuva_genret.join(', ');
    } 
    const nayttelija_lista = () => {
        
        let nayttelijaLista : Actor[] = nayttelijat.cast.slice(0,5);
        let nayttelijaArray : string[] = [];
        nayttelijaLista.forEach((nayttelija: Actor, idx: number) => {
            nayttelijaArray.push(nayttelija.name);
        })
        return nayttelijaArray.join(', ');  
    }

    return (

        <div className="flex content-center p-4" >
            <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal bg-blend-darken">
                    <div className="modal-box dark:bg-vaaleanharmaa lg:w-3/4">
                        <h3 className="font-bold text-xl text text-black">{elokuva.nimi}</h3>
                        <p className="py-4 text-lg">{kuvaustekstit}</p>
                        <div className="modal-action">
                            <label htmlFor="my-modal" className="btn btn-md">Sulje</label>
                        </div>
                    </div>
                </div>
        <div className="shadow-xl dark:bg-stone-800 sm:flex lg:p-6">
            <div className="basis-1/2 flex justify-center sm:shrink-0">
                <img className="h-full w-full object-cover "src={`https://image.tmdb.org/t/p/w342/${elokuva.tmdbkuva}`} alt={elokuva.nimi}/>
            </div>
            <div className="basis-1/2 content-center relative p-6">
                <div className="mb-5">
                <h1 className={`${esittelyfontti.className} ${"text-3xl dark:text-white text-musta"}`}>{elokuva.nimi}</h1>
                    { (elokuva.alkuperainennimi != elokuva.nimi) ?
                    <h2 className="text-2xl dark:text-white text-musta">({elokuva.alkuperainennimi})</h2>
                    : null
                    }
                </div>
            <div className="flex flex-col">
                <ul>
                    <div className={`${fontti.className} ${"h- overflow-hidden basis-1/4 dark:text-stone-400 text-stone-800"}`}>
                    { (kuvaustekstit) ? <li>{kuvaustekstit} </li> : null }
                    </div>
                    <li><label htmlFor="my-modal" className="btn btn-link text-indigo-500 dark:text-sininen lowercase visited:text-sininen float-right mb-3">Lue lisää..</label></li>
                    <div className="mt-10 basis-3/4 h-full w-full dark:text-white text-musta">
                        <div className="mt-10 mb-6">
                        <li>Genre: {elokuvan_genre()}</li>
                        <li>{elokuvan_kesto()}</li>
                        <li>{elokuva.valmistumisvuosi}</li>
                        <li><span className={fontti.className}>Näyttelijät:</span> {nayttelija_lista()}</li>
                        <li>Ohjaaja(t): {elokuva.ohjaaja.join(", ")}</li>
                        <li>Tuotantomaa(t): {elokuvan_tuotantomaa()}</li>
                        <li><a className="text-indigo-500 visited:text-sininen" href={elokuva.imdburl}>iMDb</a></li>
                        </div>
                        <div className="absolute inset-x-0 bottom-1 p-3">
                            <Link href="/"><button className="mt-15 w-full transition ease-in-out delay-150 bg-sininen duration-300 hover:bg-stone-700 hover:-translate-y-1 hover:scale-102 text-white font-bold py-2 px-4 rounded-full block text-center">Palaa listaukseen</button></Link>
                        </div>
                    </div>
                </ul>
            </div>
            </div>
        </div>
        </div>
    )
}