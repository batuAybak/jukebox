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

export async function getAllPlaylists() {
    const sql = `select * from playlist`
    const { rows: playlists } = await db.query(sql)
    console.log(playlists)
    return playlists
}

export async function getPlaylistById(id) {
    const sql = `select * from playlist where id = $1`
    const { rows: [playlistById] } = await db.query(sql, [id])
    return playlistById
}
