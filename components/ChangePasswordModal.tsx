'use client';
import { supabaseBrowserClient } from '@/lib/supabase';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type FormInputs = {
    salasana : string;
    uusiSalasana : string;
    vahvistusUusiSalasana : string;
  
}

export default function ChangePasswordModal () {

        
    const [virheilmoitus, setVirheilmoitus] = useState<string>("");
    const [ user, setUser] = useState<any>("");
    const router = useRouter();

    const { 
      register, 
      handleSubmit } = 
      useForm<FormInputs>({
          criteriaMode: "all",
      }
      );
  


    const handleChangePassword = async (datat : FormInputs) : Promise<void> => {
    try {

       const { error } = await supabaseBrowserClient.auth.signInWithPassword({email: 'mapajoen@gmail.com', password: datat.salasana});
       if (error){
        setVirheilmoitus("Tarkista salasana");
       } else {
        if (datat.uusiSalasana === datat.vahvistusUusiSalasana){
            const { error } = await supabaseBrowserClient.auth.updateUser({
              password: datat.uusiSalasana
            })
            router.push("/auth/login");
          } else {
            setVirheilmoitus("Salasanat eivat täsmää");
          }
       }

    } catch (error : any){
        console.log(error);
    }


  }
    return (
    <div className="modal" id="change_password">
    <form onSubmit={handleSubmit(handleChangePassword)}
        className="modal-box flex flex-col space-y-6 modal-box bg-vaaleanharmaa dark:bg-stone-800">
          <h3 className="font-bold dark:text-white lg:text-3xl text-2xl">Vaihda salasana</h3>
          <div>
            <label className="block text-lg dark:text-white text-musta font-semibold">Salasana</label>
            <input
              placeholder="Nykyinen salasana"
              type="password"
              className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
              {...register("salasana")}
            />
          </div>
          <div>
          <label className="block text-lg dark:text-white text-musta font-semibold">Uusi salasana</label>
            <input
              type="password" 
              placeholder="Uusi salasana"
              className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
              {...register("uusiSalasana")}
            />
          </div>
          <div>
          <label className="block text-lg dark:text-white text-musta font-semibold">Vahvista uusi salasana</label>
            <input
              type="password" 
              placeholder="Uusi salasana uudelleen"
              className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
              {...register("vahvistusUusiSalasana")}
            />
          </div>
          { Boolean(virheilmoitus) ?
              <div>
                <p className="error text-red-600 text-sm">{virheilmoitus}</p>
              </div>
              : null
          }
          <div className="block float-left modal-action">
           <button type="submit" className="btn">Vahvista</button>
           <a href="/" className="btn bg-stone-800 hover:btn-outlined ml-2">Peruuta</a>
          </div>
      </form>
    </div>

    )
}