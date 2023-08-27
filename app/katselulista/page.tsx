import { haeKatselulistanElokuvat } from '@/lib/elokuvarekisteri';
import { supabaseClient } from '@/lib/supabase';
import { esittelyfontti } from '@/public/fontit/fontit';
import Katselulista from '@/components/Katselulista';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'

export default async function KatselulistaPage() : Promise<React.ReactElement> {
    
    const supabaseServer = await createServerComponentClient({ cookies });
    const { data : { session}} = await supabaseServer.auth.getSession();
    const  userId=session?.user.id;

    let elokuvaIdt : any = [];
    const {data, error} = await supabaseClient
                                .from('Katselulista')
                                .select('*')
                                .eq('kayttaja_id', userId);
    if (data){
        data.map( (elokuva : any) => {
                elokuvaIdt.push(JSON.parse(elokuva.elokuva_id));
        } )
    }
     
    const elokuvat : Elokuva[] = await haeKatselulistanElokuvat(elokuvaIdt);

    return (
    <>
        <Katselulista elokuvat={elokuvat} />
    </>
    )
}