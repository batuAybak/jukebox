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

