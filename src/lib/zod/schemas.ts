import { z } from "zod"

export const LastFmTrackSchema = z.object({
  name: z.string(),
  duration: z.number().nullable(),
  artist: z.object({
    name: z.string(),
    url: z.string().url(),
  }),
  url: z.string().url(),
})

export const LastFmAlbumSchema = z.object({
  name: z.string(),
  artist: z.string(),
  url: z.string().url(),
  image: z.array(z.object({
    "#text": z.string(),
    size: z.union([z.literal('small'), z.literal('medium'), z.literal('large'), z.literal('extralarge'), z.literal('mega'), z.literal("")]),
  })),
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
  image: z.array(z.object({
    "#text": z.string(),
    size: z.union([z.literal('small'), z.literal('medium'), z.literal('large'), z.literal('extralarge'), z.literal('mega'), z.literal("")]),
  }))
})

// {
//   user: {
//     name: 'ley0x',
//     age: '0',
//     subscriber: '0',
//     realname: 'ley0x',
//     bootstrap: '0',
//     playcount: '104473',
//     artist_count: '3582',
//     playlists: '0',
//     track_count: '19459',
//     album_count: '6520',
//     image: [ [Object], [Object], [Object], [Object] ],
//     registered: { unixtime: '1653504399', '#text': 1653504399 },
//     country: 'France',
//     gender: 'n',
//     url: 'https://www.last.fm/user/ley0x',
//     type: 'user'
//   }
// }
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
  image: z.array(z.object({
    "#text": z.string(),
    size: z.union([z.literal('small'), z.literal('medium'), z.literal('large'), z.literal('extralarge'), z.literal('mega'), z.literal("")]),
  })),
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
  image: z.array(z.object({
    "#text": z.string(),
    size: z.union([z.literal('small'), z.literal('medium'), z.literal('large'), z.literal('extralarge'), z.literal('mega'), z.literal("")]),
  })),
  mbid: z.string(),
  url: z.string().url(),
  playcount: z.string(),
  '@attr': z.object({
    rank: z.string(),
  }),
  name: z.string(),
})
