'use client';

import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Search } from 'lucide-react';
import { z } from 'zod';
import { useAtom } from "jotai";

import { searchLastFmTrack } from '../../_actions/search-tracks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LastFmTrackSchema } from '@/lib/zod/schemas';
import { lcSelectedLyrics, lcSelectedTrack, lcTrackLyrics } from "@/lib/store";

type Inputs = {
  search: string;
};

const schema = z.object({
  search: z.string().min(1),
});

type Props = {
  setLoading: (loading: boolean) => void;
  setFoundTracks: (foundTracks: z.infer<typeof LastFmTrackSchema>[]) => void;
}

export const SearchBar = ({ setLoading, setFoundTracks }: Props) => {

  const [, setSelectedTrack] = useAtom(lcSelectedTrack);
  const [, setSelectedLyrics] = useAtom(lcSelectedLyrics);
  const [, setLyrics] = useAtom(lcTrackLyrics);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      setFoundTracks([]);
      setSelectedTrack(null);
      setLyrics("");
      setSelectedLyrics("");
      const tracks = await searchLastFmTrack(data.search);
      console.log(tracks);


      if (!tracks.success) {
        console.error(tracks);
        return;
      }

      if (!tracks.data) {
        console.error(tracks);
        return;
      }

      console.info("Tracks founds:", tracks.data)
      console.log(tracks.data)
      setFoundTracks(tracks.data);

    } catch (e) {
      console.error(e);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder="Search for a song"
            {...register('search')}
          />
          <Button variant="secondary" size="icon" type="submit" className="cursor-pointer"><Search /></Button>
        </div>
        {errors && (
          <p className="text-sm text-destructive">{errors.search?.message}</p>
        )}
      </form>
    </>
  );
};
