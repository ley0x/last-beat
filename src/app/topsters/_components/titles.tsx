import { gridAlbumsAtom, topsterShowTitlesAtom } from "@/lib/store"
import { useAtom } from "jotai"

export const Titles = () => {
  const [albums] = useAtom(gridAlbumsAtom);
  const [showTitles] = useAtom(topsterShowTitlesAtom);
  if (!showTitles) return null;
  return (
    <div className="pl-2 flex-1 w-96 border border-red-500 gap-y-2">
      {albums.map((album, idx) => {
        if (!album) return null;
        return (
          <div key={idx} className="flex min-w-96 gap-x-0 text-[0.35rem]">
            <span className="font-bold text-muted-foreground w-min">{idx + 1}.</span>
            <span className="text-muted-foreground col-span-4 line-clamp-1">{album.artist}</span>
            <span className="col-span-7 line-clamp-1">{album.name}</span>
          </div>
        )
      })}
    </div>
  )
}
