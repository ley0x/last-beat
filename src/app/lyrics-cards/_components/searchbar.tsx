'use client';

import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Search } from 'lucide-react';
import { z } from 'zod';
import { useAtom } from 'jotai';

import { GetLyricsApi } from '@/lib/zod/schemas';
import { lcTrackArtist, lcTrackLyrics, lcTrackName, lcTrackUrl } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getLyricsAction } from '../_actions/fetch-lyrics';

type Inputs = {
  search: string;
};

const schema = z.object({
  search: z.string().min(1),
});

export const SearchBar = () => {
  const [_, setLyrics] = useAtom(lcTrackLyrics);
  const [__, setArtist] = useAtom(lcTrackArtist);
  const [___, setTrack] = useAtom(lcTrackName);
  const [____, setTrackUrl] = useAtom(lcTrackUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const url = new URL('/api/lyrics', window.location.origin);
      url.searchParams.set('q', data.search);
      const json = await getLyricsAction(data.search);
      if (!json.success) {
        console.error(json);
        return;
      }
      if (!json.data) {
        console.error(json);
        return;
      }
      setLyrics(json.data.lyrics);
      setTrack(json.data.title);
      setArtist(json.data.artist);
      setTrackUrl(json.data.url);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input
          type="text"
          placeholder="Search for a song"
          {...register('search')}
        />
        <Button variant="secondary" size="icon" type="submit" className="cursor-pointer"><Search /></Button>
      </div>
    </form>
  );
};
