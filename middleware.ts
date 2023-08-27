import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient, Session} from '@supabase/auth-helpers-nextjs';

//tehdään konfigurointia, että pyyntöjä ei tule liian montaa
export const config = {
    matcher : [
        '/((?!auth|login|favicon.ico|_next).*)'
    ]
}

export async function middleware (req : NextRequest){

    const res : NextResponse = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    //katotaan, että onko jokin sessiotieto
    const { data } = await supabase.auth.getSession();
    const sessioData : Session | null = data.session;
    console.log(sessioData);

    const action = req.nextUrl.clone().pathname;



    if (!data.session && action != '#update_password') {
        console.log("pääsy kielletty!");
        const loginUrl = req.nextUrl.clone();

        loginUrl.pathname = "/auth/login";

        return NextResponse.redirect(loginUrl);
    } else {
        if (action === '/admin'){
            console.log("yritetään admin reitille");
        }       //tarkistetaan 
        console.log("tervetuloa!");
        return res;
    }

}