import { createPagesBrowserClient, Session } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';



export const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export const supabaseBrowserClient = createPagesBrowserClient<Session>({

});

// voi käyttää sovelluksen eri osissa
export const getSessionId = async () => {

    const { data } = await supabaseBrowserClient.auth.getUser();
    console.log("userId", data.user?.id);
    return data.user?.id;

}

export const getUser = async () => {
    const { data }  = await supabaseBrowserClient.auth.getUser();
    return data.user?.email;
}

export const getSessionData = async () => {
    //katotaan, että onko jokin sessiotieto
    const { data } = await supabaseClient.auth.getSession();
    const sessioData : Session | null = data.session;
    console.log("sessio", sessioData);
}


