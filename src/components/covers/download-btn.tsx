import { Download } from "lucide-react";

import { Button } from "@components/ui/button";


type DownloadBtnProps = {
  link: string;
  filename: string;
  label?: string;
}

export const DownloadBtn = ({ label, link, filename }: DownloadBtnProps) => {

  const toDataURL = async (url: string): Promise<string> => {
    const data = await fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
    return data;
  };

  const download = async () => {
    if (!link) {
      return;
    }
    const a = document.createElement("a");
    a.href = await toDataURL(link);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Button
      variant="outline"
      effect="shineHover"
      size="sm"
      className="px-1 flex justify-center sm:justify-between gap-1"
      onClick={download}
    >
      <Download className="mr-2" /> <span>{label ?? "Download"}</span>
    </Button>
  )
}
