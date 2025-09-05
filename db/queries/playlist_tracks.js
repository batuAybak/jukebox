import db from "#db/client";

export async function addPlaylistTracks(trackId, playlistId) {
    const sql = `
    INSERT INTO playlist_tracks (track_id, playlist_id)
    VALUES ($1, $2)
    RETURNING *
    `
    const { rows: playlistTrack } = await db.query(sql, [trackId, playlistId])
    return playlistTrack
}
