'use client';
import { supabaseBrowserClient } from '@/lib/supabase';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormInputs = {
    salasana : string;
    uusiSalasana : string;
    vahvistusUusiSalasana : string;
  
}

export default function ResetPasswordForm () {

        
    const [virheilmoitus, setVirheilmoitus] = useState<string>("");
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

        if (datat.uusiSalasana === datat.vahvistusUusiSalasana){
            const { error } = await supabaseBrowserClient.auth.updateUser({
              password: datat.uusiSalasana
            })
            if (!error){
                router.push("/auth/login");
            } else {
                setVirheilmoitus("Salasanan vaihtaminen ei jostain syystä onnistunut");
            }
          } else {
            setVirheilmoitus("Salasanat eivat täsmää");
        
          }
    } catch (error : any){
        console.log(error);
    }  
  }
  
    return (

    <form onSubmit={handleSubmit(handleChangePassword)}
        className="flex flex-col space-y-6">
          <h3 className="font-bold dark:text-white lg:text-3xl text-xl">Vaihda salasana</h3>
            <input
              type="password" 
              placeholder="Uusi salasana"
              className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
              {...register("uusiSalasana")}
            />
            <input
              type="password" 
              placeholder="Uusi salasana uudelleen"
              className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
              {...register("vahvistusUusiSalasana")}

            />
          { Boolean(virheilmoitus) ?
              <div>
                <p className="error text-red-600 text-sm">Salasanat eivät täsmää</p>
              </div>
              : null
          }
          <div className="block float-left">
           <button type="submit" className="btn">Vahvista</button>
           <a href="/" className="btn bg-stone-800 hover:btn-outlined ml-2">Peruuta</a>
          </div>
      </form>

    )
}