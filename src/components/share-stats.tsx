import React from 'react';

import { Share } from 'lucide-react';
import { Button } from './ui/button';

import { toast } from "sonner"

export const ShareStats = () => {
  const copyURLToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL)
      .then(() => {
        toast.success(`URL copied to clipboard!`, {
          description: "Share your stats with your friends!",
          "richColors": true,
        })
      })
  };

  return (
    <Button variant="outline" size="icon" className="rounded-full hover:cursor-pointer" onClick={copyURLToClipboard}> <Share /> </Button>
  );
};
