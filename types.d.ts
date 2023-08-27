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
interface Actor {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}
interface Actors {
id: number
cast: Actor[]
crew: Crew[]
}

