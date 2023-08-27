import { haeGenrenElokuvatSivunMukaan } from "@/lib/elokuvarekisteri";
import ElokuvaEsittely from '@/components/ElokuvaEsittely';

interface Props {
    genren_nimi : String
    sivunumero : number


}
export default async function Elokuvalista(props: Props) : Promise<React.ReactElement> {



    const muutaGenreString = () => {

        let genre : String;

        if (props.genren_nimi == 'scifi'){
            genre = 'Sci-Fi'
        } else if (props.genren_nimi == 'filmnoir'){
            genre = 'Film-Noir'
        } else if (props.genren_nimi == 'jannitys'){
            genre = 'Jännitys'
        } else if (props.genren_nimi == 'elamankerta'){
            genre = 'Elämänkerta'

        } else {
            genre = props.genren_nimi.charAt(0).toUpperCase() + props.genren_nimi.slice(1);
        }
      
            return genre;
    }

    const elokuvat : Elokuva[] = await haeGenrenElokuvatSivunMukaan(muutaGenreString(), props.sivunumero);

    const elokuva_lista = elokuvat.map((elokuva: Elokuva, idx : number) => {
        return (
        <div key={idx} className="w-1/2 lg:w-1/4 mb-2">
            <ElokuvaEsittely elokuva={elokuva} />
        </div>

        )
    })

    return (

        <div className="flex flex-wrap">{elokuva_lista}</div>

    )
}
