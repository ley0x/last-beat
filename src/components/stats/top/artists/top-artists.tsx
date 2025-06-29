import { useState } from 'react'
import { useAtom } from 'jotai'

import { timeframeAtom } from '@lib/store'
import { Artist } from '@common/artist'
import { ErrorStatus } from '@common/error-status'

import { StatsContainer } from '@stats/music/stats-container'
import { ArtistSkeleton } from '@common/artist-skeleton'
import { DataTable } from '@stats/table/data-table'

import { useQuery } from '@tanstack/react-query'

import { ArtistsColumns } from './columns'
import { MAX, MIN } from '@lib/constants'
import { fetchLastFmUserTopArtists } from '@services/api/lastfm'

type Props = {
  username: string
  viewMore?: boolean
}

export const TopArtists = ({ username, viewMore }: Props) => {
  const [timeframe] = useAtom(timeframeAtom)

  const [mode, setMode] = useState<'grid' | 'list'>('list')
  const [page, setPage] = useState(1)
  const [limit] = useState(viewMore ? MIN : MAX)
  const {
    data: artists,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['top-artists', username, timeframe, limit, page],
    queryFn: () => fetchLastFmUserTopArtists(username, timeframe, limit, page)
  })

  if (isPending) {
    return (
      <StatsContainer page={page} setPage={setPage} type="artists" viewMore={!!viewMore} setMode={setMode} mode={mode} username={username}>
        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <ArtistSkeleton key={index} />
          ))}
      </StatsContainer>
    )
  }

  if (isError) {
    return <ErrorStatus message={error.message} />
  }

  return (
    <StatsContainer page={page} setPage={setPage} type="artists" viewMore={!!viewMore} setMode={setMode} mode={mode} username={username}>
      {mode === 'grid' && <DataTable columns={ArtistsColumns} data={artists} />}
      {mode === 'list' && (
        <div className="flex flex-wrap gap-x-2 gap-y-4 justify-evenly items-center">
          {artists && artists.map((artist, index) => <Artist artist={artist} key={index} />)}
        </div>
      )}
    </StatsContainer>
  )
}
