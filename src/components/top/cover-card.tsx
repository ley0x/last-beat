import { X } from "lucide-react";
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  show: boolean;
  url: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CoverCard = ({ setShow, show, url }: Props) => {

  useEffect(() => {
    const escKeyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShow(false);
      }
    };
    document.addEventListener("keydown", escKeyHandler);
    return () => {
      document.removeEventListener("keydown", escKeyHandler);
    };
  }, [setShow]);

  if (!show) return null;
  return (
    <div onClick={() => setShow(false)} className="fixed z-50 inset-0 bg-black/80 flex justify-center items-center">
      <Button className="cursor-pointer absolute right-10 top-10" variant="ghost" size="icon" onClick={() => setShow(false)}>
        <X />
      </Button>
      <Image src={url} alt="cover" width={500} height={500} className="size-72 sm:size-96 md:size-[500px] max-w-full" onClick={(e) => e.stopPropagation()} unoptimized loading="lazy" />
    </div>
  )
}
