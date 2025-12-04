import { useEffect, useRef } from 'react';
import CurrentSong from './CurrentSong';
import SongControls from './SongControls';
import VolumeControl from './VolumeControl';
import ControlsButtonBar from './ControlsButtonBar';
import { usePlayerStore } from '../store/player.Store';
import { PlayerVolumeIconComponentt } from './PlayerVolumeControl';

export default function Player() {
  const { currentMusic, isPlaying, volume, setVolume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();
  const previousVolumeRef = useRef(volume);

  const handleClickVolume = () => {
    if (volume > 0) {
      previousVolumeRef.current = volume;
      setVolume(0);
    } else {
      setVolume(previousVolumeRef.current);
    }
  };

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song) {
      audioRef.current.src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[350px]">
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <ControlsButtonBar />
          <SongControls audio={audioRef} />
          <audio ref={audioRef}></audio>
        </div>
      </div>
      <div className="flex gap-x-2" aria-label='Volumen'>
        <button onClick={handleClickVolume}>
          <PlayerVolumeIconComponentt />
        </button>
        <VolumeControl />
      </div>
    </div>
  );
}