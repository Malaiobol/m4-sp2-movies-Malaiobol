import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { ImovieRequest, movieResult } from "./interfaces";

const createMovie = async (req: Request, resp: Response): Promise<Response> =>{

    const MovieRequest: ImovieRequest = req.body;
    const queryString: string = `
    INSERT INTO
        movies_list(name, description, duration, price)
    VALUES
        ($1, $2, $3, $4)
    RETURNING *;
    `;

    const queryConfig: QueryConfig ={
        text: queryString,
        values: Object.values(MovieRequest)
    };
    const queryResult: movieResult = await client.query(queryConfig);
    return resp.status(201).json();
};

const listMovies = async (req: Request, resp: Response): Promise<Response> =>{

    const query: string = `
        SELECT
            *
        FROM
            movies_list;
    `
    const queryResult: movieResult = await client.query(query);
    
    return resp.status(201).json(queryResult.rows);
};

const updateMovie = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(201).json();
};

const deleteMovie = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(204);
};

export { createMovie, listMovies, updateMovie, deleteMovie };