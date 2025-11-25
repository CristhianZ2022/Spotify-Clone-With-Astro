import { useState, useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/player.Store';
import { Slider } from './Slider';
import {
  VolumeFull,
  VolumeLow,
  VolumeMedium,
  VolumeSilenced,
} from '../icons/Volums';
import { Play, Pause } from '../icons/PlayerIcons';

const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover rounded-md"
        />
      </picture>
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="font-extralight text-sm block opacity-70">
          {artists}
        </span>
      </div>
    </div>
  );
};

const SongControls = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audio]);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
    setDuration(audio.current.duration);
  };

  const formatTime = (time) => {
    if (time < 0) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='flex gap-x-3 text-xs pt-2'>
      <span className='opacity-50 w-12 text-right'>{formatTime(currentTime)}</span>
      <Slider
        defaultValue={[0]}
        value={[currentTime]}
        max={duration}
        min={0}
        className="w-[350px]"
        onValueChange={(value) => {
          audio.current.currentTime = value;
        }}
      />
      {duration ? <span className='opacity-50 w-12'>{formatTime(duration)}</span> : <span className='opacity-50 w-12'>00:00</span>}
    </div>
  );
};

const VolumeControl = () => {
  const { volume, setVolume } = usePlayerStore((state) => state);
  const previousVolumeRef = useRef(volume);

  const handleClickVolume = () => {
    if (volume > 0) {
      previousVolumeRef.current = volume;
      setVolume(0);
    } else {
      setVolume(previousVolumeRef.current);
    }
  };

  const volumePercentage = volume * 100;

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button onClick={handleClickVolume}>
        {volume < 0.1 ? (
          <VolumeSilenced />
        ) : volume > 0.1 && volume < 0.33 ? (
          <VolumeLow />
        ) : volume > 0.33 && volume < 0.66 ? (
          <VolumeMedium />
        ) : (
          <VolumeFull />
        )}
      </button>
      <Slider
        value={[volumePercentage]}
        defaultValue={[50]}
        max={100}
        min={0}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

export default function Player() {
  const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef();

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

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[350px]">
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <button
            className="bg-white rounded-full p-2 text-black"
            onClick={handleClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControls audio={audioRef} />
          <audio ref={audioRef}></audio>
        </div>
      </div>
      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
