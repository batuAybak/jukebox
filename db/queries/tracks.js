import db from "#db/client";

/**
 * 
 * @param {*} name 
 * @param {*} durationMs 
 * @returns id of the added track
 */
export async function addTrack(name, durationMs) {
    const sql = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ($1, $2) RETURNING *
    `
    const { rows: [track] } = await db.query(sql, [name, durationMs])
    return track.id
}

export async function getAllTracks() {
    const sql = 'select * from tracks'
    const { rows: tracks } = await db.query(sql)
    return tracks
}

export async function getTrackById(id) {
    const sql = 'select * from tracks where id = $1'
    const { rows: [trackById] } = await db.query(sql, [id])
    return trackById
}