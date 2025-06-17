"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { z } from "zod"
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table"
import { LastFmTopArtists } from "@lib/schemas"
import { cn, findLargestImage } from "@lib/utils"

import { Button } from "@/components/ui/button"

import { CoverCard } from "@/app/stats/_components/top/cover-card"
import { ArtistSkeleton } from "@/components/_common/artist-skeleton"

import { useQuery } from "@tanstack/react-query"
import { ErrorStatus } from "@/components/_common/error-status"

export type AlbumsTable = z.infer<typeof LastFmTopArtists>

const search = async (artistName: string) => {
  const url = new URL('/api/spotify/search/artist-profile-picture', window.location.origin);
  url.searchParams.set('q', encodeURIComponent(artistName));
  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json()
  const profilePicture = z.string().url().parse(json.data);
  return profilePicture;
}

export const ArtistsColumns: ColumnDef<AlbumsTable>[] = [
  {
    accessorKey: "image",
    header: () => {
      return (
        <div>
          Cover
        </div>
      )
    },
    cell: ({ row }) => {

      const artist = row.original;
      /* eslint-disable react-hooks/rules-of-hooks */
      const [show, setShow] = useState(false);
      const [profilePicture, setProfilePicture] = useState(findLargestImage(artist.image));
      const { isPending, isError, data } = useQuery({ queryKey: ['search-profile-picture', artist.name], queryFn: () => search(artist.name) });

      useEffect(() => {
        if (!data) return;
        setProfilePicture(data);
      }, [data]);

      if (isPending) {
        return <ArtistSkeleton />
      }

      if (isError) {
        return (<ErrorStatus message={"Artist not found"} />)
      }

      return (
        <div className="w-fit">
          <CoverCard url={profilePicture} show={show} setShow={setShow} />
          <Image
            src={profilePicture === "#" ? "/placeholder.webp" : profilePicture}
            onClick={() => setShow(!show)}
            width={50}
            height={50}
            alt="cover"
            className="cursor-pointer"
            unoptimized
            loading="lazy"
          />
        </div>
      )
    }
    ,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "rank",
    sortingFn: (a, b) => Number(a.original["@attr"].rank) - Number(b.original["@attr"].rank),
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <Button variant="ghost" className="flex justify-around w-full rounded-none cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Rank</span>
          {sorted === false ? (
            <ArrowDownUp />
          ) : (sorted === "asc" ? <ArrowDown /> : <ArrowUp />)}
        </Button>
      )
    },
    cell: ({ row }) => {
      const rank = row.original["@attr"].rank;
      return (
        <p className={cn("text-center font-bold text-lg", {
          "text-3xl": rank == "1" || rank == "2" || rank == "3",
        })}>{
            rank == "1" ? "🥇" : rank == "2" ? "🥈" : rank == "3" ? "🥉" : rank
          }
        </p>
      )
    }
    ,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    sortingFn: (a, b) => a.original.name.localeCompare(b.original.name),
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <Button variant="ghost" className="flex justify-between w-full rounded-none cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Artist</span>
          {sorted === false ? (
            <ArrowDownUp />
          ) : (sorted === "asc" ? <ArrowDown /> : <ArrowUp />)}
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <p>{row.original.name ?? "-"}</p>
      )
    }
    ,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "playcount",
    sortingFn: (a, b) => Number(a.original.playcount) - Number(b.original.playcount),
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <Button variant="ghost" className="flex justify-around w-full rounded-none cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Playcount</span>
          {sorted === false ? (
            <ArrowDownUp />
          ) : (sorted === "asc" ? <ArrowDown /> : <ArrowUp />)}
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="text-center text-lg">{row.getValue("playcount")}</p>
      )
    }
    ,
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   accessorKey: "playtime",
  //   sortingFn: (a, b) => Number(a.original.playcount) - Number(b.original.playcount),
  //   header: ({ column }) => {
  //     const sorted = column.getIsSorted();
  //     return (
  //       <Button variant="ghost" className="flex justify-around w-full rounded-none cursor-pointer" onClick={() => column.toggleSorting()}>
  //         <span>Playcount</span>
  //         {sorted === false ? (
  //           <ArrowDownUp />
  //         ) : (sorted === "asc" ? <ArrowDown /> : <ArrowUp />)}
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {

  //     const [tracks] = useAtom(allTracksAtom);

  //     const artist = row.original.name;
  //     const filteredTracks = tracks?.filter((track) => track.artist.name === artist) ?? [];
  //     const { minutes } = useFetchTracksPlaytime({tracks: filteredTracks});

  //     if (!tracks) return (<p className="text-center text-lg">-</p>);
  //     return (
  //       <p className="text-center text-lg">{beautifyNumber(minutes)} minutes</p>
  //     )
  //   }
  //   ,
  //   enableSorting: true,
  //   enableHiding: true,
  // },
]
