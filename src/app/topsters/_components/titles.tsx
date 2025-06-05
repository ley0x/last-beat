import { gridAlbumsAtom, topsterShowTitlesAtom } from "@/lib/store"
import { useAtom } from "jotai"

export const Titles = () => {
  const [albums] = useAtom(gridAlbumsAtom);
  const [showTitles] = useAtom(topsterShowTitlesAtom);
  if (!showTitles) return null;
  return (
    <div className="text-xs h-max gap-y-2">
      {albums.map((album, idx) => {
        if (!album) return null;
        return (
          <div key={idx} className="flex gap-x-2">
            <span className="font-bold text-muted-foreground w-min">{idx + 1}.</span>
            <span className="text-muted-foreground col-span-4 line-clamp-1">{album.artist}</span>
            <span className="col-span-7 line-clamp-1">{album.name}</span>
          </div>
        )
      })}
    </div>
  )
}
