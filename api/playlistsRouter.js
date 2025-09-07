import { addPlaylistTracks, tracksByPlaylistId } from '#db/queries/playlist_tracks'
import { getAllPlaylists, getPlaylistById, addPlaylist } from '#db/queries/playlists'
import express from 'express'
const playlistsRouter = express.Router()
export default playlistsRouter

playlistsRouter.route('/')
    .get(async (req, res) => {
        const allPlaylists = await getAllPlaylists()
        res.send(allPlaylists)
    })
    .post(async (req, res) => {
        const { name, description } = req.body
        if (!name || !description) return res.status(400).send("Request body requires: name, description");
        const newPlaylist = await addPlaylist(name, description)
        res.status(201).send(newPlaylist)
    })

// id parameter validation
playlistsRouter.param('id', async (req, res, next, id) => {
    const playlist = await getPlaylistById(id)
    if (!playlist) return res.status(404).send("PLaylist not found.");

    req.playlist = playlist
    next()
})

playlistsRouter.route('/:id').get((req, res) => {
    res.send(req.playlist)
})

playlistsRouter.route('/:id/tracks')
    .get(async (req, res) => {
        const tracksByPlaylist = await tracksByPlaylistId(req.playlist.id)
        res.send(tracksByPlaylist)
    })
    .post(async (req, res) => {
        const { trackId } = req.body
        if (!req.body) return res.status(400).send("Request body is required.");
        if (!trackId) return res.status(400).send("Request body requires: trackId");
        const tracksByPlaylist = await addPlaylistTracks(trackId, req.playlist.id)
        res.status(201).send(tracksByPlaylist)
    })

playlistsRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send("Error on playlistsRouter");
});