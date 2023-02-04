import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { movieResult } from "./interfaces";

const validateName = async (req: Request, resp: Response, next: NextFunction): Promise<Response | void> =>{
    const queryString: string = `
    SELECT
        name
    FROM
        movies_list
    WHERE
        name = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.name]
    };

    const queryResult: movieResult = await client.query(queryConfig);
    if(queryResult.rowCount !== 0){
        return resp.status(409).json({
            message: "This movie already exists!"
        })
    };
    
    return next();
}

const validateMovie = async (req: Request, resp: Response, next: NextFunction): Promise<Response | void> =>{
   
    const requiredKeys = ["name", "price", "duration"];
    const actualKeys = Object.keys(req.body);
    const reqBody = req.body;
    
    if(typeof(reqBody.name) !== "string"){
        return resp.status(400).json({
            message: `Verify your name type`
        })
    };

    let validate = requiredKeys.every(key => actualKeys.includes(key));

    if(!validate){
        return resp.status(400).json({
            message: `Verify your request, required keys are: [${requiredKeys}]`
        })
    };
    return next();
};

const ensureMovieExists =  async ( req: Request, resp: Response, next: NextFunction): Promise<Response | void>  =>{
    const movieID = +req.params.id;
    const queryString = `
        SELECT
            *
        FROM
            movies_list
        WHERE
            id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [movieID]
    };

    const queryResult: movieResult = await client.query(queryConfig);
    if(!queryResult.rowCount){
        return resp.status(404).json({
            message: "Movie not Found"
        })
    };

    return next();
};


export { ensureMovieExists, validateMovie, validateName };