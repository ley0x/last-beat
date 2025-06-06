import { Button } from "@/components/ui/button"
import { gridAlbumsAtom, topsterTitleAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { Trash2 } from "lucide-react"

export const DeleteTopster = () => {
  const [, setAlbums] = useAtom(gridAlbumsAtom);
  const [, setTopsterTitle] = useAtom(topsterTitleAtom);

  const handleDelete = () => {
    setAlbums(albums => albums.map(() => null));
    setTopsterTitle("Untitled");
  };

  return (
    <Button onClick={() => handleDelete()} size="sm" variant="destructive" className="shrink-0 w-min">
      <Trash2 />
    </Button>
  )
}
