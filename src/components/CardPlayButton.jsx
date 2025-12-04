import { usePlayerStore } from '../store/player.Store';
import { Play, Pause } from '../icons/PlayerIcons';

function CardPlayButton({ id, size = 'small', song }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  const isCurrentSongRun = (song) => {
    return (
      currentMusic.song?.id == song.id &&
      currentMusic.playlist?.albumId == song.albumId &&
      isPlaying
    );
  };

  const handleClick = () => {
    if (isPlayingPlaylist  || isCurrentSongRun(song)) {
      setIsPlaying(false);
      return;
    }

    if (id) {
      fetch(`/api/get-info-playlist?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          const { songs, playlist } = data;
          setCurrentMusic({ playlist, songs, song: songs[0] });
          setIsPlaying(true);
        });
    } else {
      fetch(`/api/get-info-playlist?id=${song.albumId}`)
        .then((res) => res.json())
        .then((data) => {
          const { songs, playlist } = data;
          setCurrentMusic({ playlist, songs, song: song });
          setIsPlaying(true);
        });
    }
  };

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <button
      aria-label="Reproducir"
      className="card-play-button rounded-full bg-red-900 p-4 hover:scale-100 transition hover:bg-red-700"
      onClick={handleClick}
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
}

export default CardPlayButton;
