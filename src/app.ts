import express, { Application } from "express";
import { startDatabase } from "./database";
import { createMovie, deleteMovie, listMovies, updateMovie } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/movie", createMovie);
app.get("/movie", listMovies);
app.patch("/movie", updateMovie);
app.delete("/movie", deleteMovie);

const PORT: number = 3000;
const runningMsg: string = `Server is running on ${PORT}!`; 

app.listen(PORT, async()=>{
    await startDatabase();
    console.log(runningMsg);

});