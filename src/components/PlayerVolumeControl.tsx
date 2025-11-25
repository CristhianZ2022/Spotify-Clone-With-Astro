import { useRef } from 'react';
import {
  VolumeSilenced,
  VolumeLow,
  VolumeMedium,
  VolumeFull,
} from '../icons/Volums';
import { usePlayerStore } from '../store/player.Store';

interface Id {
  id?: string;
}

const isVolumeSilenced = (volume: number) => volume < 0.1;
const isVolumeLow = (volume: number) => volume >= 0.1 && volume < 0.5;
const isVolumeMedium = (volume: number) => volume >= 0.5 && volume < 0.9;
const isVolumeFull = (volume: number) => volume >= 0.9;

export default function PlayerVolumeIconComponent({ id }: Id) {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const { currentMusic, isPlaying } = usePlayerStore((state) => state);
  const previousVolumeRef = useRef(volume);
  const isButtonVisible = isPlaying && currentMusic?.playlist.id === id;

  const handleClickVolume = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (volume > 0) {
      previousVolumeRef.current = volume;
      setVolume(0);
    } else {
      setVolume(previousVolumeRef.current);
    }
  };

  return (
    <button onClick={handleClickVolume} className='cursor-pointer'>
      {isButtonVisible ? (
        <>
          {isVolumeSilenced(volume) && <VolumeSilenced />}
          {isVolumeLow(volume) && <VolumeLow />}
          {isVolumeMedium(volume) && <VolumeMedium />}
          {isVolumeFull(volume) && <VolumeFull />}
        </>
      ) : (
        null
      )}
    </button>
  );
}
