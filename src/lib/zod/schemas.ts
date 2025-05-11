import { z } from "zod"

export const TimeframeSchema = z.union([z.literal('7day'), z.literal('1month'), z.literal('3month'), z.literal('6month'), z.literal('12month'), z.literal('overall')])

export const LastFmImage = z.object({
  "#text": z.string(),
  size: z.union([z.literal('small'), z.literal('medium'), z.literal('large'), z.literal('extralarge'), z.literal('mega'), z.literal("")]),
})

export const LastFmTrackSchema = z.object({
  name: z.string(),
  mbid: z.string().nullish(),
  url: z.string().url(),
  duration: z.string(),
  listeners: z.string(),
  playcount: z.string(),
  artist: z.object({
    name: z.string(),
    mbid: z.string(),
    url: z.string().url(),
  }).partial().nullish(),
  album: z.object({
    position: z.string(),
    artist: z.string(),
    title: z.string(),
    mbid: z.string(),
    url: z.string().url(),
    image: z.array(LastFmImage),
  }).partial().nullish(),
  toptags: z.object({
    tag: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
    })),
  }),
  wiki: z.object({
    published: z.string(),
    summary: z.string(),
    content: z.string(),
  }).nullish(),
})

const LastFmTrackMinSchema = z.object({
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
    track: z.union([z.array(LastFmTrackMinSchema), LastFmTrackMinSchema]).nullish(),
  }).nullish()
})


export const LastFmSearchAlbumSchema = z.object({
  name: z.string(),
  artist: z.string(),
  url: z.string().url(),
  image: z.array(LastFmImage),
})

export const LastFmSearchTrackSchema = z.object({
  name: z.string(),
  artist: z.string(),
  url: z.string().url(),
  image: z.array(LastFmImage),
  listeners: z.string().nullish(),
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


export const LastFmUserFriends = z.object({
  name: z.string(),
  image: z.array(LastFmImage),
  url: z.string().url(),
  subscriber: z.string(),
  playcount: z.string(),
  // id: z.string(),
  // age: z.string(),
  // gender: z.string(),
  // realname: z.string(),
  // country: z.string(),
  // playlists: z.string(),
  // bootstrap: z.string(),
  // registered: z.object({
  //   unixtime: z.string(),
  //   "#text": z.number(),
  // }),
  // type: z.string(),
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

export const SpotifyAlbumSchema = z.object({
  album_type: z.string(),
  href: z.string().url(),
  id: z.string(),
  name: z.string(),
  release_date: z.string(),
  total_tracks: z.number(),
  type: z.string(),
  images: z.array(z.object({
    height: z.number(),
    url: z.string().url(),
    width: z.number(),
  })),
})

export const SpotifyTrackSchema = z.object({
  album: SpotifyAlbumSchema,
  disc_number: z.number(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_urls: z.object({
    spotify: z.string().url(),
  }),
  id: z.string(),
  name: z.string(),
  popularity: z.number(),
  track_number: z.number(),
  type: z.string(),
})


export const GeniusSearchTrackSchema = z
  .object({
    title: z.string(),
    url: z.string().url(),
    artist_names: z.string(),
    primary_artist_names: z.string(),
    header_image_url: z.string().url(),
    header_image_thumbnail_url: z.string().url(),
    title_with_featured: z.string(),
  })


export const DeezerArtistSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string().url(),
  picture_small: z.string().url(),
  picture_medium: z.string().url(),
  picture_big: z.string().url(),
  picture_xl: z.string().url(),
  picture: z.string().url(),
  tracklist: z.string().url(),
  type: z.string(),
});

export const DeezerAlbumSchema = z.object({
  id: z.number(),
  title: z.string(),
  link: z.string(),
  cover_medium: z.string(),
  cover_big: z.string(),
  cover_xl: z.string(),
  nb_tracks: z.number(),
  type: z.string(),
  tracklist: z.string().url(),
  artist: DeezerArtistSchema,
});
