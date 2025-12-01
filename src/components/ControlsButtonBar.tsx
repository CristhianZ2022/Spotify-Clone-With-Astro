import { usePlayerStore } from '../store/player.Store';
import { useCurrentMusic } from '../hook/UseCurrentMusic';
import { Next, Pause, Play, Prev } from '../icons/PlayerIcons';

export default function ControlsButtonBar() {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayerStore((state) => state);
  const { onNextSong, onPreviousSong } = useCurrentMusic(currentMusic);

  const handleClickPlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const clickNextSong = () => {
    const nextSong = onNextSong();
    if (nextSong) setCurrentMusic({ ...currentMusic, song: nextSong });
  }

  const clickPreviousSong = () => {
    const previousSong = onPreviousSong();
    if (previousSong) setCurrentMusic({ ...currentMusic, song: previousSong });
  }

  return (
    <div className='flex gap-4'>
      <button className='hover:scale-110 cursor-pointer' onClick={clickPreviousSong}>
        <Prev />
      </button>
      <button
        aria-label="Reproducir"
        className="bg-white rounded-full p-2 text-black cursor-pointer"
        onClick={handleClickPlayPause}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <button className='hover:scale-110 cursor-pointer' onClick={clickNextSong}>
        <Next />
      </button>
    </div>
  );
}
