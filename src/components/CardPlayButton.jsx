import { usePlayerStore } from '../store/player.Store';
import { Play, Pause } from '../icons/PlayerIcons';

function CardPlayButton({ id, size="small" }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);
    
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ playlist, songs, song: songs[0] });
      });
  };

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <button
      className="card-play-button rounded-full bg-red-900 p-4 hover:scale-100 transition hover:bg-red-700"
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  );
}

export default CardPlayButton;
