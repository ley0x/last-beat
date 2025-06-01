"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import { useAtom } from "jotai";

import { cn, getCellId } from "@/lib/utils";
import { LastFmSearchAlbumSchema } from "@/lib/zod/schemas";
import { gridAlbumsAtom, gridSizeAtom } from "@/lib/store";
import { SortableCell } from "./sortable-cell";

type TopsterGridAlbum = z.infer<typeof LastFmSearchAlbumSchema> | null;

const TEMP_DATA: TopsterGridAlbum[] = [
  {
    name: 'QALF infinity',
    artist: 'Damso',
    url: 'https://www.last.fm/music/Damso/QALF+infinity',
    image: [
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/34s/d4587ce82b4a1106cdea7cefa3f93377.png',
        size: 'small'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/64s/d4587ce82b4a1106cdea7cefa3f93377.png',
        size: 'medium'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/174s/d4587ce82b4a1106cdea7cefa3f93377.png',
        size: 'large'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/d4587ce82b4a1106cdea7cefa3f93377.png',
        size: 'extralarge'
      }
    ]
  },
  {
    name: 'Ipséité',
    artist: 'Damso',
    url: 'https://www.last.fm/music/Damso/Ips%C3%A9it%C3%A9',
    image: [
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/34s/2f9701a77896ea4b01bac64b25c584a7.png',
        size: 'small'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/64s/2f9701a77896ea4b01bac64b25c584a7.png',
        size: 'medium'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/174s/2f9701a77896ea4b01bac64b25c584a7.png',
        size: 'large'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/2f9701a77896ea4b01bac64b25c584a7.png',
        size: 'extralarge'
      }
    ]
  },
  {
    name: 'Lithopédion',
    artist: 'Damso',
    url: 'https://www.last.fm/music/Damso/Lithop%C3%A9dion',
    image: [
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/34s/c5c694d3e96dbe60ef085bd42f9efa2b.png',
        size: 'small'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/64s/c5c694d3e96dbe60ef085bd42f9efa2b.png',
        size: 'medium'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/174s/c5c694d3e96dbe60ef085bd42f9efa2b.png',
        size: 'large'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/c5c694d3e96dbe60ef085bd42f9efa2b.png',
        size: 'extralarge'
      }
    ]
  },
  {
    name: 'Batterie Faible',
    artist: 'Damso',
    url: 'https://www.last.fm/music/Damso/Batterie+Faible',
    image: [
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/34s/630b2243ee46c108381c4f03e1da1644.png',
        size: 'small'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/64s/630b2243ee46c108381c4f03e1da1644.png',
        size: 'medium'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/174s/630b2243ee46c108381c4f03e1da1644.png',
        size: 'large'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/630b2243ee46c108381c4f03e1da1644.png',
        size: 'extralarge'
      }
    ]
  },
  {
    name: 'QALF',
    artist: 'Damso',
    url: 'https://www.last.fm/music/Damso/QALF',
    image: [
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/34s/83edbc1b3c6c5ef25c2debcdd551127d.png',
        size: 'small'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/64s/83edbc1b3c6c5ef25c2debcdd551127d.png',
        size: 'medium'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/174s/83edbc1b3c6c5ef25c2debcdd551127d.png',
        size: 'large'
      },
      {
        '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/83edbc1b3c6c5ef25c2debcdd551127d.png',
        size: 'extralarge'
      }
    ]
  },
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
]

export const TopsterGrid = () => {
  const [albums, setAlbums] = useAtom(gridAlbumsAtom);
  const [gridSize] = useAtom(gridSizeAtom);


  useEffect(() => {
    setAlbums(TEMP_DATA.slice(0, gridSize * gridSize));
  }, []);


  return (
    <div className="grow border border-red-500 flex overflow-y-scroll">
      <div
        className={cn("grid gap-1 bg-sidebar rounded-lg p-2 h-min max-w-full mx-auto my-auto", {

        })}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {albums.map((album, idx) => (
          <SortableCell
            key={getCellId(album, idx)}
            id={getCellId(album, idx)}
            album={album}
          />
        ))}
      </div>
    </div>
  );
}
