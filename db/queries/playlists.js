import db from "#db/client";

/**
 * 
 * @param {*} name 
 * @param {*} description 
 * @returns id of the added playlist
 */
export async function addPlaylist(name, description) {
    const sql = `
    INSERT INTO playlist (name, description)
    VALUES ($1, $2) RETURNING *
    `
    const { rows: [playlist] } = await db.query(sql, [name, description])
    return playlist.id
}
