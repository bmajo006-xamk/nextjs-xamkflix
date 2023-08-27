'use client';
import { useForm} from "react-hook-form";
import { useState } from 'react';
import { supabaseBrowserClient } from "@/lib/supabase";

type FormInputs = {
    kayttajatunnus: string
    salasana: string
    salasanaUudelleen : string

}

export default function RegisterForm () {

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            kayttajatunnus : '',
            salasana: '',
            salasanaUudelleen: ''
        }
    });
    const [ virheilmoitus, setVirheilmoitus ] = useState("");
    const [ ilmoitus, setIlmoitus ] = useState("");

    const onSubmit = async (formdata : FormInputs ) : Promise<void> => {
     
        if (formdata.salasana === formdata.salasanaUudelleen){ 
            const { data, error } = await supabaseBrowserClient.auth.signUp({email: formdata.kayttajatunnus, password : formdata.salasana});

            if (!error){
                setIlmoitus("Lähetimme sähköpostiisi linkin rekisteröitymistä varten.");

            } else {
                console.log("Rekisteröityminen ei onnistunut");
                setVirheilmoitus("Rekisteröityminen ei onnistunut. Tarkistathan, että salasana on vähintään 6 merkkiä.")
                        
            }
        } else {

            setVirheilmoitus("Salasanat eivät vastaa toisiaan");
        }
    }
    const onError = (errors : any) => {
        return (errors.message);
    }

    //peruuta-nappi:
    const onCancel = () => {
        reset();
        //pitäis navigoida myös pois rekisteröitymsiestä??
    }

    const handleInputChange = () => {

        setVirheilmoitus("");

    }

    return(
        <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="justify-self-center">
                <div className="pb-3 w-full">
                    <label className="block text-xl dark:text-white text-musta font-semibold">Käyttäjätunnus</label>
                    <input 
                        className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
                        type="text"
                        {...register("kayttajatunnus", { required : "Anna voimassa oleva sähköposti"})} />
                        { (errors.kayttajatunnus) ?
                        <p className="error text-red-600 text-sm">{onError(errors.kayttajatunnus)}</p>
                        : null
                        }
                </div>
                <div className="pb-3">
                    <label className="block text-xl dark:text-white text-musta font-semibold">Salasana <span>(minimipituus 6)</span></label>
                    <input 
                        type="password"
                        autoComplete='currentPassword'
                        className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
                        {...register("salasana", { required : "Syötä salasana"})}
                        onChange={handleInputChange}
                    />
                        { (errors.salasana) ?
                        <p className="error text-red-600 text-sm">{onError(errors.salasana)}</p>
                        : null
                        }
                </div>
                <div className="pb-3">
                    <label className="block text-xl dark:text-white text-musta font-semibold">Salasana uudelleen</label>
                    <input 
                        type="password"
                        className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
                        {...register("salasanaUudelleen", { required : "Vahvista salasana"})}
                        onChange={handleInputChange}
                    />
                    { (errors.salasanaUudelleen) ?
                        <p className="error text-red-600 text-sm">{onError(errors.salasanaUudelleen)}</p>
                        : null
                    }
                </div>
                <div className="w-[260px] lg:w-[400px] lg:h-[50px]">
                {
                    (virheilmoitus) ? 
                    <p className="error text-red-600 text-sm">{virheilmoitus}</p>
                    :    (ilmoitus) ?
                        <p className="error text-indigo-500 text-sm">{ilmoitus}</p>
                    : null
                }
                </div>
                <div>
                    <button type="submit" className="py-2 px-4 w-[260px] lg:w-[400px] lg:h-[50px] text-white rounded-md mt-6 bg-indigo-500 font-semibold shadow-md">Rekisteröidy</button>
                </div>
                <div>
                    <a href="/auth/login" onClick={onCancel} className="btn py-2 px-4 w-[260px] lg:w-[400px] lg:h-[50px] text-white rounded-md mt-3 bg-stone-700 opacity-0.5 font-semibold shadow-md">Peruuta</a>
                </div>
            </form>

    )
}
