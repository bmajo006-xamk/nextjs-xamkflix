import ElokuvaEsittely from '@/components/ElokuvaEsittely';
import { haeKatselulistanElokuvat } from '@/lib/elokuvarekisteri';

interface Props {
    elokuvat : Elokuva[]

}

export default function Katselulista (props : Props) : React.ReactElement {

    const elokuva_lista = props.elokuvat.map((elokuva: Elokuva, idx : number) => {
        return (
        <div key={idx} className="w-1/2 lg:w-1/4 mb-2">
            <ElokuvaEsittely elokuva={elokuva} />
        </div>
        )
    })
    return (
    <div className="relative mt-8 p-3">
        <div className="flex flex-wrap">{elokuva_lista}</div>
    </div>
    )
}