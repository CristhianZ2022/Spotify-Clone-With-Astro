import { Slider } from './Slider';
import { usePlayerStore } from "../store/player.Store";

export default function VolumeControl() {
  const { volume, setVolume } = usePlayerStore((state) => state);
  const volumePercentage = volume * 100;

  return (
    <div className="flex justify-center gap-x-2 text-white">
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