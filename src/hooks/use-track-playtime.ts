import { LastFmTopTracks, SpotifyTrackSchema } from "@/lib/schemas";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { z } from "zod";

type UseFetchTrackPlaytime = {
    tracks: z.infer<typeof LastFmTopTracks>[];
}
  
export const useFetchTracksPlaytime = ({tracks}: UseFetchTrackPlaytime) => {

    const [totalTime, setTotalTime] = useState(0);
    const search = async (track: string, artist: string) => {
        const url = new URL('/api/spotify/search/track', window.location.origin);
        url.searchParams.set('track', encodeURIComponent(track));
        url.searchParams.set('artist', encodeURIComponent(artist));
        const res = await fetch(url.toString());
    
        if (!res.ok) {
        throw new Error(res.statusText);
        }
    
        const json = await res.json();
        const foundTrack = SpotifyTrackSchema.parse(json.data);
        return foundTrack;
    }
    const searchAll = async (tracks: z.infer<typeof LastFmTopTracks>[]) => {
        const promises = tracks.map(async (track) => {
            const { name, artist } = track;
            const foundTrack = await search(name, artist?.name ?? "");
            return foundTrack;
        });
        const results = await Promise.all(promises);
        return results;
    }
    const { data, isLoading } = useQuery({ queryKey: ['spotify-search-all-tracks', tracks], queryFn: () => searchAll(tracks) });

    useEffect(() => {
        if(isLoading) return;
        const totalTime = tracks.reduce((acc, track) => {
            const foundedTrack = data?.find(t => t.name === track.name);
            const duration = foundedTrack?.duration_ms;
            if (!duration) return acc + (Number(track.playcount ?? 1) * Number(track.duration ?? 0) / 60)
            return acc + (Number(track.playcount ?? 1) * Number(duration) / 60000)
        }, 0);
        setTotalTime(totalTime);
    }, [tracks, setTotalTime, isLoading, data])



  return {minutes: totalTime}
}