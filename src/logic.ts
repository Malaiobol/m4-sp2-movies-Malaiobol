import { Request, Response } from "express";
import format from "pg-format";
import { QueryConfig } from "pg";
import { client } from "./database";
import { Imovie, ImovieRequest, movieResult } from "./interfaces";

const createMovie = async (req: Request, resp: Response): Promise<Response> =>{

    const movieRequest: ImovieRequest = req.body;
    const queryString: string = format(`
        INSERT INTO
            movies_list(%I)
        VALUES
            (%L)
        RETURNING *;
        `,
        Object.keys(movieRequest),
        Object.values(movieRequest)
    );

    const queryResult: movieResult = await client.query(queryString);
    const newMovie: Imovie = queryResult.rows[0];
    return resp.status(201).json(newMovie);
};

const listMovies = async (req: Request, resp: Response): Promise<Response> =>{

    const perPage: any = req.query.per_page === undefined ? 5 : req.query.per_page;
    let page: any = req.query.page === undefined ? 0 : req.query.page;
    page = page * perPage;

    const queryString: string = `
        SELECT
            *
        FROM
            movies_list
        LIMIT $1 OFFSET $2;
    `

    const queryConfig: QueryConfig ={
        text: queryString,
        values: [perPage, page],
    }

    const queryResult: movieResult = await client.query(queryConfig);
    return resp.status(201).json(queryResult.rows);
};

const updateMovie = async (req: Request, resp: Response): Promise<Response> =>{

    if(req.body.id){
        delete req.body["id"]
    };

    const updateData = Object.values(req.body);
    const updateKeys = Object.keys(req.body);
    const movieID: number = +req.params.id;

    const formatString: string = format(`
        UPDATE
            movies_list
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
        updateKeys,
        updateData
    )

    const queryConfig: QueryConfig ={
        text: formatString,
        values: [movieID]
    }

    const queryResult: movieResult = await client.query(queryConfig);
    return resp.status(201).json(queryResult.rows[0]); 
};

const deleteMovie = async (req: Request, resp: Response): Promise<Response> =>{

    const movieID: number = +req.params.id;
    const queryString: string = `
        DELETE FROM
            movies_list
        WHERE
            id = $1;
    `   
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [movieID]
    };

    const queryResult: movieResult = await client.query(queryConfig);
    return resp.status(204);
};

export { createMovie, listMovies, updateMovie, deleteMovie };