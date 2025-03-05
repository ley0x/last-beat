import { z } from "zod";
import { environment } from "./zod/environment";
import { SpotifyArtistSchema } from "./zod/schemas";

const getSpotifyAccessToken = async () => {
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

export const spotifySearch = async (artistName: string): Promise<z.infer<typeof SpotifyArtistSchema>[]> => {
  const accessToken = await getSpotifyAccessToken();
  const args = {
    q: artistName,
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
