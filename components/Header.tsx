import Logo from '@/components/Logo';
import ThemeButton from '@/components/ThemeButton';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown';


export default function Header() {

  const supabase = createPagesBrowserClient();

  const haeSposti = async () : Promise<any> => {
        
    const { data } = await supabase.auth.getSession();
    //console.log("email", data.session?.email);
  }
  //katotaan, että onko jokin sessiotieto
  haeSposti();

    return (

    <div className="fixed top-0 w-full z-10 dark:bg-gradient-to-r dark:from-stone-800 dark:to-musta bg-gradient-to-r from-vaaleanharmaa to-harmaa py-4 px-10 flex items-center justify-between">   
            <Logo />
              <Search />
              <ThemeButton/>
              <Dropdown />
      </div>


    )
}
