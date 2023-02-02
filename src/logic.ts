import { Request, Response } from "express";
import { client } from "./database";

const createMovie = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(201).json(req)
};

const listMovies = async (req: Request, resp: Response): Promise<Response> =>{

    const query: string = `
        SELECT
            *
        FROM
            movies_list;
    `
    const queryResult = await client.query(query);
    
    return resp.status(201).json(queryResult.rows);
};

const updateMovie = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(201).json();
};

const deleteMovie = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(204);
};

export { createMovie, listMovies, updateMovie, deleteMovie };