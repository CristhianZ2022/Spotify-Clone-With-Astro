// import { songs as allSongs, allPlaylists } from '../../lib/data.ts'

// export async function GET(params, request) {
//   const { url } = request;
//   const urlObject = new URL(url);
//   const id = urlObject.searchParams.get('id');

//   const playlist = allPlaylists.find((playlist) => playlist.id === id);
//   const songs = allSongs.filter((song) => song.albumId === playlist?.albumId);

//   return new Response(JSON.stringify({ playlist, songs }), {
//     headers: {
//       'content-type': 'application/json',
//     },
//   });
// }


// src/pages/api/get-info-playlist.ts
import { songs as allSongs, allPlaylists } from '../../lib/data';
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url }) => {
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  if (!playlist) {
    return new Response(JSON.stringify({ error: 'Playlist not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
  }

  const songs = allSongs.filter((song) => song.albumId === playlist.albumId);

  return new Response(JSON.stringify({ playlist, songs }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};