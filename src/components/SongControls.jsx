import { Slider } from './Slider';
import { useEffect, useState } from "react";

export default function SongControls({ audio }) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audio]);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };

  const formatTime = (time) => {
    if (time < 0) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const duration = audio?.current?.duration ?? 0;

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
          const newValue = value;
          audio.current.currentTime = newValue;
        }}
      />
      {duration ? <span className='opacity-50 w-12'>{formatTime(duration)}</span> : <span className='opacity-50 w-12'>00:00</span>}
    </div>
  );
};