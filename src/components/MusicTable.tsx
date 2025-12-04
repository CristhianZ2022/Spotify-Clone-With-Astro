import { TimeIcon } from '../icons/MusicTableIcons';
import type { Song } from '../lib/data';
import { usePlayerStore } from '../store/player.Store';
import { MusicTablePlay } from './MusicTablePlay';

interface Props {
  songs: Song[];
}

const isCurrentSong = (song: Song) => {
  const { song: currentSong, playlist } = usePlayerStore(
    (state) => state.currentMusic
  );
  return currentSong?.id === song.id && playlist?.albumId == song.albumId;
};

export default function MusicTable({ songs }: Props) {
  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/50">
      <thead>
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Title</th>
          <th className="px-4 py-2 font-light">Album</th>
          <th className="px-4 py-2 font-light"><TimeIcon /></th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-4"></tr>
        {songs.map((song, index) => {
          const isCurrentSongBoolean = isCurrentSong(song);
          return (
            <tr key={`{song.albumId}-${song.id}`} className="text-gray-300 border-spacing-0 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 group">
              <td className="relative px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">
                {/* Número: visible → sube y desaparece */}
  <span className="
    absolute inset-0 flex items-center justify-center
    transition-all duration-300 ease-out
    group-hover:-translate-y-6 group-hover:opacity-0
  ">
    {index + 1}
  </span>

  {/* Icono Play: empieza abajo oculto → sube al centro */}
  <div className="
    absolute inset-0 flex items-center justify-center
    translate-y-6 opacity-0
    transition-all duration-300 ease-out
    group-hover:translate-y-0 group-hover:opacity-100
  ">
    <MusicTablePlay song={song} />
  </div>
              </td>
              <td className="px-4 py-2 flex gap-3">
                <picture>
                  <img
                    src={song.image}
                    alt={song.title}
                    className="h-11 w-11"
                  />
                </picture>
                <div className="flex flex-col">
                  <h3
                    className={`text-base font-normal
                        ${isCurrentSongBoolean ? 'text-green-400' : 'text-White'}
                        `}
                  >
                    {song.title}
                  </h3>
                  <span className="opacity-70">{song.artists.join(', ')}</span>
                </div>
              </td>
              <td className="px-4 py-2">{song.album}</td>
              <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
                {song.duration}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
