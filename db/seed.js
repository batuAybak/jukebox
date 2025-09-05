import db from "#db/client";
import { tracks } from "./data.js";
import { addPlaylistTracks } from "./queries/playlist_tracks.js";
import { addPlaylist } from "./queries/playlists.js";
import { addTrack } from "./queries/tracks.js";
import { faker } from "@faker-js/faker";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // For 30 tracks
  for (let i = 0; i < tracks.length; i++) {
    await addTrack(tracks[i].name, tracks[i].durationMs)
  }

  // For 10 playlists
  for (let i = 1; i < 11; i++) { //10 playlists
    await addPlaylist(`Playlist ${i}`, `Description for Playlist ${i}`)
  }

  // For 15 playlist_tracks
  for (let i = 1; i < 15; i++) { //track id between 1-30 , playlist between id 1-10
    await addPlaylistTracks(faker.number.int({ min: 1, max: 30 }), faker.number.int({ min: 1, max: 10 }))
  }
}
