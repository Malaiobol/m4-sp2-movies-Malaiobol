import { Request, Response } from "express";

const createMovie = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(201).json(req)
}

const listMovies = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(201).json(req)
}

const updateMovie = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(201).json();
}

const deleteMovie = async (req: Request, resp: Response): Promise<Response> =>{
    return resp.status(204);
}