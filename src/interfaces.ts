import { QueryResult } from "pg";

interface ImovieRequest{
    name: string,
    description: string,
    duration: number,
    price: number,
}

interface Imovie extends ImovieRequest{
    id: number
}

type movieResult =  QueryResult<Imovie>;

export { ImovieRequest, Imovie, movieResult };