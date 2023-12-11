'use client';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginHelpModal from './LoginHelpModal';
import { supabaseBrowserClient } from "@/lib/supabase";

type FormInputs = {
    kayttajatunnus: string
    salasana: string
    salasanaUudelleen: string
}
export default function LoginForm () : React.ReactElement {

    const { 
        register, 
        handleSubmit,
        formState : {errors}
    } = useForm<FormInputs>({
        criteriaMode: "all",
    });

    const router = useRouter();
    const [ virheteksti, setVirheteksti] = useState<string>();

    const onSubmit = async (datat : FormInputs) : Promise<void> => {

        const { data, error } = await supabaseBrowserClient.auth.signInWithPassword({
            email: datat.kayttajatunnus,
            password: datat.salasana
        });

        if (!error){
            console.log("kirjautuminen onnistui");
            router.push("/");

        } else {
            setVirheteksti("Virheellinen käyttäjätunnus tai salasana");
        }
    }
    return (
    <>
        <form
                onSubmit={handleSubmit(onSubmit)}
                className="justify-self-center">
                <div className="pb-3 w-full">
                    <label className="block text-xl dark:text-white text-musta font-semibold">Käyttäjätunnus</label>
                    <input 
                        className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
                        type="text"
                        id="kayttajatunnus"
                        {...register("kayttajatunnus", {required : "Anna kelvollinen sähköposti"})} />
                    { (errors.kayttajatunnus) ?
                        <p className="error text-red-600 text-sm">{errors.kayttajatunnus.message}</p>
                        : null
                    }
                </div>
                <div className="pb-6">
                    <label className="block text-xl dark:text-white text-musta font-semibold">Salasana</label>
                    <input 
                        type="password"
                        id="salasana"
                        autoComplete='currentPassword'
                        className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
                        {...register("salasana", {required : "Anna kelvollinen salasana", minLength: 1})}/>
                    { (errors.salasana) ?
                        <p className="error text-red-600 text-sm">{errors.salasana.message}</p>
                        : null
                    }
                         

                </div>
                <div className="pb-3">
                    { Boolean(virheteksti) ?
                    <div className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md alert alert-error rounded-md text-red-600 text-xs">{virheteksti}</div>
                    : null
                    }
                </div>

                <div>
                    <label className="block text-black dark:text-white"><a href="#reset_password">Unohditko salasanan?</a></label>
                    <button type="submit" className="py-2 px-4 w-[260px] lg:w-[400px] lg:h-[50px] text-white rounded-md bg-indigo-500 font-semibold shadow-md">Kirjaudu sisään</button>
                </div>
            </form>

        <LoginHelpModal />
        
    </>
    )
}