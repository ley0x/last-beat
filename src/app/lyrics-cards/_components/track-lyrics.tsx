'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAtom } from 'jotai';

import { SearchBar } from './searchbar';

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
    <section className="flex flex-col h-full">
      <SearchBar />
      <div className="max-h-full overflow-y-scroll max-w-full prose">
        <div onMouseUp={handleSelection}>
          <pre className="font-sans w-96 max-w-fit">
            <ReactMarkdown>{lyrics}</ReactMarkdown>
          </pre>
        </div>
      </div>
    </section>
  );
};
