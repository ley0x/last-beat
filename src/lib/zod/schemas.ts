import { z } from "zod"

export const TimeframeSchema = z.union([z.literal('7day'), z.literal('1month'), z.literal('3month'), z.literal('6month'), z.literal('12month'), z.literal('overall')])

export const LastFmTrackSchema = z.object({
  name: z.string(),
  duration: z.number().nullable(),
  artist: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  url: z.string().url(),
})


export const LastFmImage = z.object({
  "#text": z.string(),
  size: z.union([z.literal('small'), z.literal('medium'), z.literal('large'), z.literal('extralarge'), z.literal('mega'), z.literal("")]),
})

export const LastFmAlbumSchema = z.object({
  name: z.string(),
  artist: z.string(),
  url: z.string().url(),
  image: z.array(LastFmImage),
  listeners: z.string().nullish(),
  playcount: z.string().nullish(),
  tags: z.union([
    z.literal(""),
    z.object({
      tag: z.array(z.object({
        name: z.string(),
        url: z.string().url(),
      })),
    })]).nullish(),
  tracks: z.object({
    track: z.union([z.array(LastFmTrackSchema), LastFmTrackSchema]).nullish(),
  }).nullish()
})


export const LastFmSearchAlbumSchema = z.object({
  name: z.string(),
  artist: z.string(),
  url: z.string().url(),
  image: z.array(LastFmImage),
})

export const LastFmUserInfo = z.object({
  name: z.string(),
  age: z.string(),
  subscriber: z.string().nullish(),
  realname: z.string().nullish(),
  bootstrap: z.string().nullish(),
  playcount: z.string().nullish(),
  playlists: z.string().nullish(),
  track_count: z.string().nullish(),
  album_count: z.string().nullish(),
  image: z.array(LastFmImage),
  registered: z.object({
    unixtime: z.string(),
    "#text": z.number(),
  }),
  country: z.string(),
  gender: z.string().nullish(),
  url: z.string().url(),
  type: z.string(),
})

export const LastFmTopArtists = z.object({
  streamable: z.string(),
  image: z.array(LastFmImage),
  mbid: z.string(),
  url: z.string().url(),
  playcount: z.string(),
  '@attr': z.object({
    rank: z.string(),
  }),
  name: z.string(),
})

export const LastFmTopAlbums = z.object({
  artist: z.object({
    url: z.string().url(),
    name: z.string(),
    mbid: z.string(),
  }),
  image: z.array(LastFmImage),
  mbid: z.string(),
  url: z.string().url(),
  playcount: z.string(),
  '@attr': z.object({
    rank: z.string(),
  }),
  name: z.string(),
})

export const LastFmTopTracks = z.object({
  streamable: z.object({
    fulltrack: z.string(),
    "#text": z.string(),
  }),
  mbid: z.string(),
  name: z.string(),
  image: z.array(LastFmImage),
  artist: z.object({
    url: z.string().url(),
    name: z.string(),
    mbid: z.string(),
  }),
  url: z.string().url(),
  duration: z.string(),
  '@attr': z.object({
    rank: z.string(),
  }),
  playcount: z.string(),
})

export const LastFmTopTags = z.object({
  name: z.string(),
  count: z.string(),
  url: z.string().url(),
})

export const SpotifyArtistSchema = z.object({
  external_urls: z.object({
    spotify: z.string().url(),
  }),
  followers: z.object({
    total: z.number(),
  }),
  genres: z.array(z.string()),
  href: z.string().url(),
  id: z.string(),
  images: z.array(z.object({
    height: z.number(),
    url: z.string().url(),
    width: z.number(),
  })),
  name: z.string(),
  popularity: z.number(),
  type: z.string(),
  uri: z.string().url(),
})
