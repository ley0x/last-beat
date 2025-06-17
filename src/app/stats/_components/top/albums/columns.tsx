"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { z } from "zod"
import { ArrowDown, ArrowDownUp, ArrowUp } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table"
import { LastFmTopAlbums } from "@lib/schemas"
import { cn, findLargestImage } from "@lib/utils"

import { Button } from "@components/ui/button"
import { CoverCard } from "@stats/top/cover-card"

export type AlbumsTable = z.infer<typeof LastFmTopAlbums>

export const AlbumsColumns: ColumnDef<AlbumsTable>[] = [
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

      /* eslint-disable react-hooks/rules-of-hooks */
      const [show, setShow] = useState(false);

      const image = findLargestImage(row.original.image);
      return (
        <div className="w-fit">
          <CoverCard url={findLargestImage(row.original.image)} show={show} setShow={setShow} />
          <Image
            src={image === "#" ? "/placeholder.webp" : image}
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
    accessorKey: "artist.name",
    sortingFn: (a, b) => a.original.artist.name.localeCompare(b.original.artist.name),
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
        <p>{row.original.artist.name ?? "-"}</p>
      )
    }
    ,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <Button variant="ghost" className="flex justify-between w-full rounded-none cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Album</span>
          {sorted === false ? (
            <ArrowDownUp />
          ) : (sorted === "asc" ? <ArrowDown /> : <ArrowUp />)}
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Link href={row.original.url} rel="noreferrer" target="_blank" className="font-bold">{row.getValue("name")}</Link>
      )
    }
    ,
    enableSorting: true,
    enableHiding: false,
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
]
