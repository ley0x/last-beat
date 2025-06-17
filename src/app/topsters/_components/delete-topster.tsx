import { Button } from "@/components/ui/button"
import { gridAlbumsAtom, topsterHeightAtom, topsterTitleAtom, topsterWidthAtom } from "@lib/store";
import { useAtom } from "jotai";
import { Trash2 } from "lucide-react"

export const DeleteTopster = () => {
  const [, setAlbums] = useAtom(gridAlbumsAtom);
  const [, setTopsterTitle] = useAtom(topsterTitleAtom);
  const [topsterHeight] = useAtom(topsterHeightAtom);
  const [topsterWidth] = useAtom(topsterWidthAtom);
  const size = topsterWidth * topsterHeight;
  const emptyGrid = Array(size).fill(null);

  const handleDelete = () => {
    setAlbums(emptyGrid);
    setTopsterTitle("Untitled");
  };

  return (
    <Button onClick={() => handleDelete()} size="sm" variant="destructive" className="shrink-0 w-min cursor-pointer">
      <Trash2 />
    </Button>
  )
}
