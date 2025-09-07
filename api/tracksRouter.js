import { getAllTracks, getTrackById } from '#db/queries/tracks'
import express from 'express'
const tracksRouter = express.Router()
export default tracksRouter


tracksRouter.route('/').get(async (req, res) => {
    const allTracks = await getAllTracks()
    res.send(allTracks)
})

// id parameter validation
tracksRouter.param('id', async (req, res, next, id) => {
    const track = await getTrackById(id)
    if (!track) return res.status(404).send("Track not found.");

    req.track = track
    next()
})

tracksRouter.route('/:id').get((req, res) => {
    res.send(req.track)
})

tracksRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send("Error on tracksRouter");
});