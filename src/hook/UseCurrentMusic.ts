import type { Song } from '../lib/data';
import type { CurrentMusic } from './../store/player.Store';

export function useCurrentMusic(currentMusic: CurrentMusic) {
  const getCurrentSongId = () => {
    if (currentMusic.songs.length === 0 || currentMusic.song === null) return -1;

    return currentMusic.songs.findIndex(
      (song) => song.id === currentMusic.song!.id
    ) ?? -1;
  };

  const onNextSong = (): Song | null => {
    const { songs } = currentMusic;
    const songsInPlaylist = songs.length;

    if (songsInPlaylist === 0) return null;

    const i = getCurrentSongId();
    if (i +1 >= songsInPlaylist) return null;

    return songs[i + 1];
  }

  const onPreviousSong = (): Song | null => {
    const i = getCurrentSongId();
    if (i === 0) return null;

    return currentMusic.songs[i - 1];
  }

  return { onNextSong, onPreviousSong };
}
