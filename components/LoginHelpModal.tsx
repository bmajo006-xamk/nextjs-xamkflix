'use client';
import { useForm } from 'react-hook-form';
import { supabaseBrowserClient } from '@/lib/supabase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormInputs = {
  kayttajatunnus : string

}
export default function LoginHelpModal() : React.ReactElement {

  const router = useRouter();

  const { 
    register, 
    handleSubmit,
    }= useForm<FormInputs>({
        criteriaMode: "all",
    }
    );

    const [virheilmoitus, setVirheilmoitus] = useState<string>("");
    const [ilmoitus, setIlmoitus] = useState<string>("");

  const onSubmit = async (datat : FormInputs) : Promise<void> => {

    const { data, error } = await supabaseBrowserClient.auth.resetPasswordForEmail( datat.kayttajatunnus, {
      redirectTo: 'http://localhost:3000/auth/update-password',
    })
    if (error){
      console.log(error);
      setVirheilmoitus('Linkin lähettäminen ei jostain syystä onnistunut. Syötäthän voimassa olevan sähköpostin.');
    } else {
      setIlmoitus('Tarkista sähköposti. Lähetimme sinne linkin salasanan päivittämistä varten.');
    }
   
  }
  const handleInputChange = () => {

    console.log("inputissa tapahtuu");
    setVirheilmoitus('');
    setIlmoitus('');
  }


    return (
    <div className="modal" id="reset_password">
        <form onSubmit={handleSubmit(onSubmit)}
        className="modal-box flex flex-col space-y-6 bg-vaaleanharmaa dark:bg-stone-800">
          <h3 className="font-bold lg:text-3xl text-xl dark:text-white text-musta">Vaihda salasana</h3>
          <h2 className="lg:text-xl text-md dark:text-white text-musta">Syötä ensin sähköposti, niin lähetämme ohjeet salasanan päivittämistä varten.</h2>
            <input
              placeholder="Sähköposti"
              className="w-[260px] lg:w-[400px] lg:h-[50px] rounded-md shadow-md py-2 px-4 dark:text-white"
              {...register("kayttajatunnus")}
              onChange={handleInputChange}
            />
          { Boolean(virheilmoitus) ?
              <div>
                <p className="error text-red-600 text-sm">{virheilmoitus}</p>
              </div>
              : <p className="text-sm text-indigo-500">{ilmoitus}</p>
          }
          <div className="modal-action block float-left">
           <button type="submit" className="btn text-white">Lähetä</button>
           <a href="#" className="btn bg-stone-800 hover:btn-outlined text-white">Peruuta</a>
          </div>
      </form>
    </div>
    )
}