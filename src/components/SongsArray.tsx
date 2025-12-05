import { useRef } from 'react';
import { NextIcon, PrevIcon } from '../icons/PrevNextIcons';
import { songs } from '../lib/data';
import CardPlayButton from './CardPlayButton';

export default function SongsArray() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 200;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm text-white opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-black/90"
      >
        <PrevIcon />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm text-white opacity-0 hover:opacity-100 transition-all duration-300 hover:bg-black/90"
      >
        <NextIcon />
      </button>
      <h1 className="text-4xl font-bold text-white mb-6 pl-2">
        Canciones del Momento
      </h1>

      <div
        ref={scrollContainer}
        className="overflow-x-auto scrollbar-hide scroll-smooth py-4 -mx-6 px-6"
      >
        <div className="inline-flex gap-6">
          {songs.map((song, index) => {
            const artistsString = song.artists.join(', ');

            return (
              <article
                key={song.id || index}
                className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300 w-44 shrink-0"
              >
                <div className="absolute right-4 bottom-20 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
                  <CardPlayButton id={''} song={song} />
                </div>
                <a
                  href={`/playlist/${song.albumId}`}
                  className="block p-4 pb-8"
                >
                  <picture className="aspect-square block">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-full h-full object-cover rounded-md shadow-lg"
                    />
                  </picture>

                  <div className="mt-3">
                    <h4 className="text-white text-sm font-medium truncate">
                      {song.title}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {artistsString}
                    </span>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
