'use client';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import  { lisaaKatselulistaan } from '@/lib/supabase';
import { supabaseClient, supabaseBrowserClient } from '@/lib/supabase';
import { useState, useEffect } from 'react';

export default function LisaaKatselulistaanButton({elokuvaId} : any) {

    const [ lisatty, setLisatty ] = useState<Boolean>(false);
    const [ userId, setUserId] = useState<any>("");

    const tarkistaOnkoElokuvaListalla = async (elokuvaId : any) : Promise<any> => {

        const { data, error } = await supabaseClient
        .from('Katselulista')
        .select()
        .eq('kayttaja_id', userId)
        .eq('elokuva_id', elokuvaId);

    
       if (data){
        return true;
       } else {
        return false;
       }   
    }
    const lisaaKatselulistaan = async () : Promise<any> => {

        const { error } = await supabaseClient.from('Katselulista').insert(
            {
                kayttaja_id : userId,
                elokuva_id : elokuvaId
            })
        if (!error){
            console.log("elokuva lisätty");
            console.log(error);
            setLisatty(!lisatty);
        } else {
            return error;
        }
    }
    const poistaKatselulistalta = async () : Promise<any> => {

        const { error } = await supabaseClient
        .from('Katselulista')
        .delete()
        .eq('elokuva_id', elokuvaId)
        .eq('kayttaja_id', userId);

        if (!error){
            setLisatty(!lisatty);
            console.log("elokuva poistettu");
        } else {
            return error;
        } 
    }

    const tilaaKanava = supabaseClient.channel('schema-db-channel').on('postgres_changes', {
    event : '*',
    schema : 'public'
    }, tarkistaOnkoElokuvaListalla).subscribe();

       //kähän parempi? kutsutaan lib-kansion funktiota????
    const getUserId = async () => {
        const { data }  = await supabaseBrowserClient.auth.getUser();
        setUserId(data.user?.id);
    }

    //haetaan kaikki elokuvat, jotka on listalla, ja niiden perusteella näytetään listaa
    //tehdään kanavan kuuntelu!!
    useEffect( () => {

        getUserId();

    }, []);

    return (
        <>
    { (!lisatty) ?
    <button onClick={lisaaKatselulistaan} className="w-44 text-white text-sm py-2 px-4 bg-stone-700"><AddIcon className="float-left" />
    Lisää katselulistaan
    </button>
    : 
    <button onClick={poistaKatselulistalta} className="w-44 text-white text-sm py-2 px-4 bg-stone-700"><RemoveIcon className="float-left" />
    Poista katselulistalta
    </button>
    }
    </>
    )
}