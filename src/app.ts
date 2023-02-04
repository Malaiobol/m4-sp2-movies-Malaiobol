import express, { Application } from "express";
import { startDatabase } from "./database";
import { createMovie, deleteMovie, listMovies, updateMovie } from "./logic";
import { ensureMovieExists, validateMovie, validateName } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/movie", validateName, validateMovie, createMovie);
app.get("/movie", listMovies);
app.patch("/movie:id", ensureMovieExists, validateName, updateMovie);
app.delete("/movie:id", ensureMovieExists, deleteMovie);

const PORT: number = 3000;
const runningMsg: string = `Server is running on ${PORT}!`; 

app.listen(PORT, async()=>{
    await startDatabase();
    console.log(runningMsg);
});