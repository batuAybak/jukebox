import express from "express";
const app = express();
export default app;

import tracksRouter from "#api/tracksRouter";
import playlistsRouter from "#api/playlistsRouter";

app.use(express.json()); //body-parsing middleware
app.get('/', (req, res) => {
    res.send('JUKEBOX APP')
})


app.use('/tracks', tracksRouter)
app.use('/playlists', playlistsRouter)


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Sorry! Something went wrong.");
});