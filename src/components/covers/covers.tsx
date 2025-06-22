import { useState } from 'react'

import { SearchBar } from '@covers/searchbar'
import { DeezerAlbum } from '@covers/album.deezer'
import { LastfmAlbum } from '@covers/album.lastfm'
import { SpotifyAlbum } from '@covers/album.spotify'

import { SearchAlbumsResponse, Provider } from '@lib/types'

export const Covers = () => {
  const [albums, setAlbums] = useState<SearchAlbumsResponse>({ deezer: [], lastfm: [], spotify: [] })
  const [provider, setProvider] = useState<Provider>('deezer')
  return (
    <div className="flex flex-col items-center space-y-4">
      <SearchBar setAlbums={setAlbums} setProvider={setProvider} />
      <div className="flex justify-around flex-wrap gap-2">
        {provider === 'deezer' && albums.deezer?.map((album, index) => <DeezerAlbum album={album} key={index} />)}
        {provider === 'lastfm' && albums.lastfm?.map((album, index) => <LastfmAlbum album={album} key={index} />)}
        {provider === 'spotify' && albums.spotify?.map((album, index) => <SpotifyAlbum album={album} key={index} />)}
      </div>
    </div>
  )
}
