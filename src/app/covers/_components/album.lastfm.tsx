'use client';

import React from 'react';
;
import { Link } from "@tanstack/react-router";
import { z } from 'zod';
import slugify from 'slugify';
import { LastFmSearchAlbumSchema } from '@lib/schemas';

import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';

import { findLargestImage } from '@lib/utils';

import { CopyBtn } from '@covers/copy-btn';
import { DownloadBtn } from '@covers/download-btn';

import Divider from '@common/divider';

type Props = {
  album: z.infer<typeof LastFmSearchAlbumSchema>;
}

export const LastfmAlbum = ({ album }: Props) => {

  return (
    <Card className="flex flex-col gap-0 justify-between shadow-md w-42 py-2">
      <CardHeader className="my-0">
        <Link to={album.url} target="_blank" className="block">
          <img
            src={findLargestImage(album.image)}
            alt={`Cover of the album ${album.name}`}
            height={200}
            width={200}
            loading="lazy"
            className="aspect-square grow mx-auto"
          />
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-sm lg:text-md font-semibold line-clamp-2 ">{album.name}</p>
        <p className="text-sm text-muted-foreground line-clamp-1 break-all">{album.artist}</p>
        <Divider className="my-2" />
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col gap-2">
        <DownloadBtn link={findLargestImage(album.image)} filename={slugify(album.artist + " " + album.name + " cover").toLocaleLowerCase() + ".jpg"} />
        <CopyBtn link={findLargestImage(album.image)} />
      </CardFooter>
    </Card>
  );
};
