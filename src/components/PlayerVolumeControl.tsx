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



const isVolumeSilenced = (loud: number) => loud === 0
const isVolumeLow = (loud: number) => loud > 0 && loud < 0.3
const isVolumeMedium = (loud: number) => loud >= 0.3 && loud < 0.7
const isVolumeFull = (loud: number) => loud >= 0.7


const getVolumeIconByLouder = (loud: number) => {
  return (
    <>
      {isVolumeSilenced(loud) && <VolumeSilenced/>}
      {isVolumeLow(loud) && <VolumeLow/>}
      {isVolumeMedium(loud) && <VolumeMedium/>}
      {isVolumeFull(loud) && <VolumeFull/>}
    </>
  )
}


export const PlayerVolumeIconComponentt = () => {
  const volume = usePlayerStore(state => state.volume)
  return getVolumeIconByLouder(volume)
}

export default function PlayerVolumeIconComponent({ id }: Id) {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const { currentMusic, isPlaying } = usePlayerStore((state) => state);
  const previousVolumeRef = useRef(volume);
  const isButtonVisible = isPlaying && currentMusic?.playlist?.id === id;

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
