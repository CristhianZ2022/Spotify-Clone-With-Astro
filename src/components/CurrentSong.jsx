export default function CurrentSong({ image, title, artists }) {
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
          {artists?.join(', ')}
        </span>
      </div>
    </div>
  );
};