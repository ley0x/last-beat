'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAtom } from 'jotai';

import { SearchBar } from './searchbar';

import { lcSelectedLyrics, lcTrackLyrics } from '@/lib/store';

export const TrackLyrics = () => {
  const [_, setSelectedText] = useAtom(lcSelectedLyrics);
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
    <section className="overflow-x-auto">
      <SearchBar />
      <div className="prose max-w-none">
        <pre>
          <div onMouseUp={handleSelection}>
            <ReactMarkdown>{lyrics}</ReactMarkdown>
          </div>
        </pre>
      </div>
    </section>
  );
};
