import { Pause, Play } from '../icons/PlayerIcons';
import type { Song } from '../lib/data';
import { usePlayerStore, type CurrentMusic } from '../store/player.Store';

interface Props {
  song: Song;
}

const isNewSongOfAnotherPlaylist = (currentMusic: CurrentMusic, song: Song) => {
  return currentMusic.playlist?.id !== String(song.albumId);
};

export function MusicTablePlay({ song }: Props) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isCurrentSongRun = (song: Song) => {
    return (
      currentMusic.song?.id == song.id &&
      currentMusic.playlist?.albumId == song.albumId &&
      isPlaying
    );
  };

  const handleClick = () => {
    if (isCurrentSongRun(song)) {
      setIsPlaying(false);
      return;
    }

    if (isNewSongOfAnotherPlaylist(currentMusic, song)) {
      fetch(`/api/get-info-playlist?id=${song.albumId}`)
        .then((res) => res.json())
        .then((data) => {
          const { songs, playlist } = data;
          setIsPlaying(true);
          setCurrentMusic({ playlist, songs, song: song });
        });
    }

    if (currentMusic.song?.id !== song.id) {
      setCurrentMusic({
        songs: currentMusic.songs,
        playlist: currentMusic.playlist,
        song: song,
      });
    }

    setIsPlaying(true);
  };

  return (
    <button className="text-white" onClick={handleClick}>
      {isCurrentSongRun(song) ? (
        <Pause className="hover:scale-110" />
      ) : (
        <Play className="hover:scale-110" />
      )}
    </button>
  );
}
