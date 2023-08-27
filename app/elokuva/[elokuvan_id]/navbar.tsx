import { genret } from '@/lib/genre';
import Link from 'next/link';

export default function Navbar () {

    const genrelista = genret.map ((genre : String, idx : number) => {
        return <li key={idx}><Link href={`/${genre.toLowerCase().replace(/ä/g, "a").replace("-","")}`}>{genre}</Link></li>
    })

    return (
    
        <div>
            <h3>Lajityypit</h3>
            <div>
                    <ul>
                    {genrelista}
                    </ul>
                </div>
        </div>
    )



}