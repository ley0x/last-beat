import { gridAlbumsAtom, topsterHeightAtom, topsterShowTitlesAtom, topsterWidthAtom } from "@lib/store"
import { cn } from "@lib/utils";
import { useAtom } from "jotai"

export const Titles = () => {
  const [albums] = useAtom(gridAlbumsAtom);

  const [showTitles] = useAtom(topsterShowTitlesAtom);
  const [topsterHeight] = useAtom(topsterHeightAtom);
  const [topsterWidth] = useAtom(topsterWidthAtom);

  const total = topsterWidth * topsterHeight; // 4 <= total <= 100

  if (!showTitles) return null;
  return (
    <div className="grow w-full lg:w-min sm:min-w-80 gap-y-2">
      {albums.map((album, idx) => {
        if (!album) return null;
        return (
          <div key={idx} className={cn("line-clamp-1 justify-start gap-x-3", {
            "flex text-xs sm:text-sm lg:text-md": total <= 25,
            "flex text-xs sm:text-sm lg:text-xs": total > 25 && total <= 50,
            "flex text-xs sm:text-sm lg:text-[0.45rem]": total > 50 && total <= 75,
            "flex text-xs sm:text-sm lg:text-[0.38rem]": total > 75 && total <= 100
          })}>
            <span className="font-bold text-muted-foreground w-min">{idx + 1}.</span>
            <span className="text-muted-foreground line-clamp-1 break-all">{album.artist}</span>
            <span className="line-clamp-1 break-all">{album.name}</span>
          </div>
        )
      })}
    </div>
  )
}
