"use client";

import { useEffect, useState } from "react";

import { useAtom } from "jotai";

import { useQuery } from "@tanstack/react-query";



import Divider from "@common/divider";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@components/ui/select"

import { Input } from "@components/ui/input"

import { Timeframe } from "@lib/types";
import { gridAlbumsAtom, topsterHeightAtom, topsterWidthAtom } from "@lib/store";

import { fetchLastFmUserTopAlbums } from "@services/api/lastfm";


export const ImportLastfm = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>("1month");
  const [height] = useAtom(topsterHeightAtom)
  const [width] = useAtom(topsterWidthAtom)
  const [, setAlbums] = useAtom(gridAlbumsAtom);
  const [username, setUsername] = useState<string>("");

  const { data: albums, refetch } = useQuery({
    queryKey: ['top-albums', username, timeframe, height * width],
    queryFn: () => fetchLastFmUserTopAlbums(username, timeframe, height * width),
    enabled: false
  });

  const handleValueChange = (value: Timeframe) => {
    setTimeframe(value);
  }

  useEffect(() => {
    if (albums) {
      setAlbums(albums.map((album) => ({ artist: album.artist.name, url: album.url, name: album.name, image: album.image })));
    }
  }, [albums, setAlbums]);

  const handleImport = async () => {
    await refetch();
    if (albums === undefined) return;
  }

  return (
    <Card className="gap-4 bg-card/20">
      <CardHeader>
        <CardTitle>Import</CardTitle>
        <CardDescription>
          Import your last.fm most played albums.
        </CardDescription>
      </CardHeader>
      <Divider className="my-0" />
      <CardContent className="flex flex-col gap-2">
        <Input placeholder="Last.fm username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <div className="w-full flex gap-2">
          <Select defaultValue={timeframe} onValueChange={handleValueChange}>
            <SelectTrigger className="grow cursor-pointer">
              <SelectValue placeholder="Select a timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a timeframe</SelectLabel>
                <SelectItem value="7day">7 days</SelectItem>
                <SelectItem value="1month">1 month</SelectItem>
                <SelectItem value="3month">3 months</SelectItem>
                <SelectItem value="6month">6 months</SelectItem>
                <SelectItem value="12month">12 months</SelectItem>
                <SelectItem value="overall">Overall</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={handleImport} size="sm" variant="secondary" className="hover:cursor-pointer">
            <span>Import</span>
            <img src="/providers/lastfm.png" width={20} height={20} alt="Last.fm logo" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
