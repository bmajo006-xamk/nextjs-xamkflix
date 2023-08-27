import { suositutelokuvat } from '@/lib/suositutelokuvat';
import downton from '@/public/svg/downton-abbey.svg';
import Image from 'next/image';
import { moonfallFontti, worstFontti, fontti } from '@/public/fontit/fontit';


export default function Carousel() : React.ReactElement {


    return (
    <>
        <div className="carousel content-center w-full">
            <div id="item1" className="carousel-item relative w-full flex justify-center rounded-lg dark:bg-gradient-to-tr dark:from-stone-400 dark:to-stone-900 bg-gradient-to-tr from-vaaleanharmaa to-stone-800">
                <img className="dark:opacity-80 opacity-110 rounded-lg w-18 mix-blend-overlay" src={`https://image.tmdb.org/t/p/w342/${suositutelokuvat[0].tausta}`} />
                <div className="absolute self-center bottom-10 left-5 sm:bottom-15 sm:left-10 lg:left-20 p-5">
                    <h1 className={`${worstFontti.className} ${"uppercase text-white tracking-normal text-3xl lg:text-6xl w-48 lg:w-80 pmb-3"}`}>{suositutelokuvat[0].nimi}</h1>
                    <h2 className={`${fontti.className} ${"lg:text-xl text-stone-200 relative w-full"}`}>{suositutelokuvat[0].genre.join(" | ")}</h2>
                </div>
            </div> 
            
            <div id="item2" className="carousel-item relative w-full flex justify-center rounded-lg dark:bg-gradient-to-tr dark:from-stone-400 dark:to-stone-800 bg-gradient-to-tr from-vaaleanharmaa to-stone-800">
                <img className="relative dark:opacity-80 opacity-110 rounded-lg w-18 mix-blend-overlay w-full" src={`https://image.tmdb.org/t/p/w342/${suositutelokuvat[1].tausta}`}/>
                <div className="absolute self-center text-center bottom-3 p-3">
                    <h1 className={`${moonfallFontti.className} ${"uppercase text-white tracking-widest lg:text-5xl sm:text-2xl mb-3"}`}>{suositutelokuvat[1].nimi}</h1>
                    <h2 className={`${fontti.className} ${"lg:text-xl text-center text-stone-200"}`}>{suositutelokuvat[1].genre.join(" | ")}</h2>
                </div>
            </div>

            <div id="item3" className="carousel-item relative w-full flex justify-center rounded-lg dark:bg-gradient-to-tr dark:from-stone-400 dark:to-stone-800 bg-gradient-to-tr from-vaaleanharmaa to-stone-800">
                <img className="dark:opacity-80 opacity-110 rounded-lg w-full mix-blend-overlay" src={`https://image.tmdb.org/t/p/w185/${suositutelokuvat[2].tausta}`}/>
                <div className="absolute self-center bottom-3 p-10">
                    <Image alt="logo" src={downton} />
                    <h2 className={`${fontti.className} ${"lg:text-xl text-center text-stone-200 mt-3"}`}>{suositutelokuvat[2].genre.join(" | ")}</h2>
                </div>
            </div> 
        </div> 
        <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" className="text-white btn btn-md bg-indigo-500 rounded-md shadow-xl cursor-pointer hover:scale-110">1</a> 
            <a href="#item2" className="text-white btn btn-md bg-indigo-500 rounded-md shadow-xl cursor-pointer hover:scale-110">2</a> 
            <a href="#item3" className="text-white btn btn-md bg-indigo-500 rounded-md shadow-xl cursor-pointer hover:scale-110">3</a> 
        </div>
    </>
    )
}