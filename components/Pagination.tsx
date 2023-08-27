import Link from 'next/link';

interface Props {
    genre: String
    sivut: number
    nykyinenSivu : number
}


export default function Pagination (props: Props) {

    const seuraavaSivu : number = Number(props.nykyinenSivu) + 1;
    const edellinenSivu : number = Number(props.nykyinenSivu) -1;


    return (
        <div className="btn-group flex justify-center mb-2 mr-2 space-x-2">
            { (edellinenSivu > 0) ?
             <Link href={`${props.genre}/${edellinenSivu}`}>
                <button className="btn btn-sm lg:btn-md hover:bg-indigo-500 rounded-full">«</button>
            </Link>
            : null
            }
            { (props.sivut > 0 && props.sivut >= seuraavaSivu ) ?
            <Link href={`${props.genre}/${seuraavaSivu}`}>
                <button className="btn btn-xs lg:btn-md hover:bg-indigo-500 rounded-full">»</button>
            </Link>
            : null
            }
        </div>

    )
}