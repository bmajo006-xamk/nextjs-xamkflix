
import { MongoClient, ObjectId, Collection } from 'mongodb';


const client : MongoClient = new MongoClient(process.env.DB_URI!);

//asiakaspää <--

interface Elokuva {
    _id: ObjectId
    nimi: string
    alkuperainennimi: string
    valmistumisvuosi: number
    ohjaaja: []
    genre: []
    tuotantomaa: []
    kestomin: number
    imdbid: string
    imdburl: string
    tmdbid: number
    tmdbkuva: string
}

export const haeElokuvat = async () : Promise<any> => {
  
    await client.connect();
    const elokuvat : Collection<any> = client.db().collection("elokuvat");

    return elokuvat
    .find({})
    .sort({ "_id" : -1 })
    .limit(40)
    .toArray();
}

export const haeElokuva = async (id : string) : Promise<any> => {

    await client.connect();
    const elokuvat : Collection<Elokuva> = client.db().collection("elokuvat");

    return elokuvat
        .findOne({_id : new ObjectId(id)})
}


export const haeGenrenElokuvat = async ( lajityyppi : any, sivunumero : number ) : Promise<any> => {

    await client.connect();
    const elokuvat : Collection<any> = client.db().collection("elokuvat");

    
    return elokuvat
    .find({genre : { $elemMatch : {$eq : lajityyppi}}})
    .sort({"valmistumisvuosi" : -1})
    .toArray();
}
export const haeGenrenElokuvatSivunMukaan = async ( lajityyppi : any, sivunumero : number) => {

    await client.connect();
    const elokuvat : Collection<any> = client.db().collection("elokuvat");

    return elokuvat
    .find({genre : { $elemMatch : {$eq : lajityyppi}}})
    .sort({"valmistumisvuosi" : -1})
    .skip((sivunumero -1) * 40)
    .limit(40)
    .toArray();


}

export const laskeGenrenElokuvat = async ( lajityyppi: any ) : Promise<any> => {

    await client.connect();
    const elokuvat : Collection<any> = client.db().collection("elokuvat");

    return elokuvat.
    countDocuments({genre : { $elemMatch : {$eq : lajityyppi}}});

}

export const jarjestaAakkosjarjestykseen = async (n : number) => {

    await client.connect();
    const elokuvat : Collection<any> = client.db().collection("elokuvat");

    if (n == 1){

    return elokuvat
    .find({})
    .sort({ "nimi" : n })
    .limit(40)
    .toArray();
    } else {
        return elokuvat
        .find({})
        .sort({ "nimi" : -1 })
        .limit(40)
        .toArray();

    }
}

export const haeKatselulistanElokuvat = async (elokuvaIdList : any) => {

    
    const objectIds = elokuvaIdList.map((id : any) => new ObjectId(id));
    
    await client.connect();
    const elokuvat : Collection<any> = client.db().collection("elokuvat");

    return elokuvat
        .find({_id: {$in : objectIds }}).toArray();
    
}

export const lisaaElokuva = async (elokuva : Elokuva) => {

    await client.connect();
    const elokuvat : Collection<any> = client.db().collection("elokuvat");
    console.log("lisättävä elokuva:", elokuva);

   // return elokuvat
    //.insertOne(elokuva)

}



export const haeNayttelijaData = async (id : number) => {
    try {

        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}`);
        let data = await response.json();

         return data;

    } catch (e : any){
        throw new Error(e.message);
    } 
}
export const haeKuvausTeksti = async (id : number) => {
    try {

        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=fi-FI`);
        let data = await response.json();
        if (!data.overview){

            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=us-US`);
            data = await response.json();

        }

        return (data.overview);

    } catch (e : any){
        throw new Error(e.message);
    }
}

