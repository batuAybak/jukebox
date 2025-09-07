import db from "#db/client";

export async function addPlaylistTracks(trackId, playlistId) {
    const sql = `
    INSERT INTO playlist_tracks (track_id, playlist_id)
    VALUES ($1, $2)
    RETURNING *
    `
    const { rows: [playlistTrack] } = await db.query(sql, [trackId, playlistId])
    return playlistTrack
}

export async function tracksByPlaylistId(playlistId) {
    const sql = `select * from playlist_tracks where playlist_id = $1`
    const { rows: tracksByPlaylistId } = await db.query(sql, [playlistId])
    return tracksByPlaylistId
}