'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAtom } from 'jotai';

import { lcSelectedLyrics, lcTrackLyrics } from '@/lib/store';

export const TrackLyrics = () => {
  const [, setSelectedText] = useAtom(lcSelectedLyrics);
  const [lyrics] = useAtom(lcTrackLyrics);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString();
      if (!text) return;
      setSelectedText(text);
    }
  };

  return (
    <section className="flex flex-col">
      {lyrics ? (
        <div className="max-w-full prose">
          <div onMouseUp={handleSelection}>
            <pre className="font-sans max-w-full">
              <ReactMarkdown>{lyrics}</ReactMarkdown>
            </pre>
          </div>
        </div>
      ) : (
        <p className="text-card-foreground/80 text-center mt-5">No lyrics found.</p>
      )}
    </section>
  );
};
