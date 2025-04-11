import { useEffect } from "react";
import { Alltracks, Timeframe } from "@/lib/types";
import { fetchUserTopTracks } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { allTracksAtom } from "@/lib/store";

type UseFetchAllTracksParams = {
    username: string;
    timeframe: Timeframe;
    limit: number;
}

type UseFetchAllTracksReturn = {
  tracks: Alltracks;
}

export const useFetchAllTracks = ({username, timeframe, limit}: UseFetchAllTracksParams): UseFetchAllTracksReturn => {

  const [tracks, setTracks] = useAtom<Alltracks>(allTracksAtom);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['top-tracks-all', username, timeframe, limit],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchUserTopTracks(username, timeframe, limit, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length === 0) return null;
      return lastPage.page + 1;
    }
  });

  useEffect(() => {
    console.info("[+] Current page:", data?.pageParams)
    console.info("[+] Has next page:", hasNextPage)
    if (hasNextPage) {
      fetchNextPage();
    } else {
        setTracks(data?.pages.map(track => track.data).flat() ?? null)
    }
  }, [timeframe, data, fetchNextPage, hasNextPage, setTracks])

  return {tracks}
}