import { Button } from "@/components/ui/button";
import { cn, copyImageToClipboard } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

type CopyBtnProps = {
  link: string;
  label?: string;
}

export const CopyBtn = ({ label, link }: CopyBtnProps) => {
  const [copied, setCopied] = useState<boolean>(false)

  const copy = async (link: string) => {
    if (!link) {
      return;
    }
    await copyImageToClipboard(link);
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  };

  return (
    <Button
      onClick={() => copy(link)}
      variant="outline"
      effect="shineHover"
      size="sm"
      className="w-full sm:w-auto disabled:pointer-events-none disabled:cursor-not-allowed"
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied}
    >
      <div
        className={cn(
          "flex items-center gap-1 transition-all",
          "w-full justify-center sm:justify-between px-2",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        <CheckIcon
          className="stroke-emerald-500"
          size={16}
          aria-hidden="true"
        />
        Copied
      </div>
      <div
        className={cn(
          "flex items-center gap-1 absolute transition-all",
          "w-full justify-center sm:justify-between px-2",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <CopyIcon size={16} aria-hidden="true" />
        {label ?? "Copy"}
      </div>
    </Button>
  )
}
