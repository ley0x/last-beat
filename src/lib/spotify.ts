import { z } from "zod";
import { environment } from "./zod/environment";
import { SpotifyAlbumSchema, SpotifyArtistSchema, SpotifyTrackSchema } from "./zod/schemas";

export const getSpotifyAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: environment.SPOTIFY_CLIENT_ID,
      client_secret: environment.SPOTIFY_CLIENT_SECRET,
    }),
  });
  const json = await response.json();
  return z.string().parse(json.access_token);
};

export const spotifySearch = async (q: string): Promise<z.infer<typeof SpotifyArtistSchema>[]> => {
  const accessToken = await getSpotifyAccessToken();
  const args = {
    q,
    type: 'artist',
    limit: "1"
  };
  const url = `https://api.spotify.com/v1/search/?${new URLSearchParams(args)}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const json = await response.json();
  const data = SpotifyArtistSchema.array().parse(json.artists.items);
  return data;
}

export const spotifySearchAlbum = async (q: string, limit: number = 25): Promise<z.infer<typeof SpotifyAlbumSchema>[]> => {
  const accessToken = await getSpotifyAccessToken();
  const args = {
    q,
    type: 'album',
    limit: `${limit}`
  };

  const url = `https://api.spotify.com/v1/search/?${new URLSearchParams(args)}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const json = await response.json();
  const data = SpotifyAlbumSchema.array().parse(json.albums.items);
  return data;
}

export const getSpotifyArtistID = async (artistName: string): Promise<string> => {
  const artists = await spotifySearch(artistName);
  if (artists.length === 0) throw new Error("No artist found");
  return artists[0].id;
}

export const spotifyGetArtist = async (artistID: string): Promise<z.infer<typeof SpotifyArtistSchema>> => {
  const accessToken = await getSpotifyAccessToken();
  const url = `https://api.spotify.com/v1/artists/${artistID}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const json = await response.json();
  const data = SpotifyArtistSchema.parse(json);
  return data;
}

export const getArtistProfilePicture = async (artistID: string): Promise<string> => {
  const artist = await spotifyGetArtist(artistID);
  const images = artist.images;
  if (images.length === 0) throw new Error("No artist profile picture found");
  return images[0].url;
}

export const searchArtistProfilePicture = async (artistName: string): Promise<string> => {
  const artistID = await getSpotifyArtistID(artistName);
  return getArtistProfilePicture(artistID);
}


export const searchSpotifyTrack = async (name: string, artist: string): Promise<z.infer<typeof SpotifyTrackSchema>> => {
  const accessToken = await getSpotifyAccessToken();
  const args = {
    q: `track:${name} artist:${artist}`,
    type: 'track',
    limit: '1'
  }

  const url = `https://api.spotify.com/v1/search/?${new URLSearchParams(args)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const json = await response.json();
  const data = SpotifyTrackSchema.parse(json.tracks.items[0]);
  return data;
}

