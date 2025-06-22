import { useState } from 'react'

import { StatsContainer } from '@stats/music/stats-container'
import { AlbumSkeleton } from '@common/album-skeleton'
import { DataTable } from '@stats/table/data-table'

import { ErrorStatus } from '@common/error-status'
import { Track } from '@common/track'

import { timeframeAtom } from '@lib/store'

import { useAtom } from 'jotai'
import { useQuery } from '@tanstack/react-query'

import { MAX, MIN } from '@lib/constants'
import { TrackColumns } from './columns'
import { fetchLastFmUserTopTracks } from '@services/api/lastfm'

type Props = {
  username: string
  viewMore?: boolean
}

export const TopTracks = ({ username, viewMore }: Props) => {
  const [timeframe] = useAtom(timeframeAtom)
  const [page, setPage] = useState(1)
  const [mode, setMode] = useState<'grid' | 'list'>('list')

  const [limit] = useState(viewMore ? MIN : MAX)
  const {
    data: tracks,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['top-tracks', username, timeframe, limit, page],
    queryFn: () => fetchLastFmUserTopTracks(username, timeframe, limit, page)
  })

  if (isPending) {
    return (
      <StatsContainer
        page={page}
        setPage={setPage}
        type="tracks"
        viewMore={!!viewMore}
        setMode={setMode}
        mode={mode}
        username={username}
      >
        {Array(limit)
          .fill(0)
          .map((_, index) => (
            <AlbumSkeleton key={index} />
          ))}
      </StatsContainer>
    )
  }

  if (isError) {
    return <ErrorStatus message={error.message} />
  }

  return (
    <StatsContainer
      page={page}
      setPage={setPage}
      type="tracks"
      viewMore={!!viewMore}
      setMode={setMode}
      mode={mode}
      username={username}
    >
      {mode === 'grid' && <DataTable columns={TrackColumns} data={tracks.data} />}
      {mode === 'list' && (
        <div className="flex flex-wrap gap-x-2 gap-y-4 justify-evenly items-center">
          {tracks && tracks.data.map((track, index) => <Track track={track} key={index} />)}
        </div>
      )}
    </StatsContainer>
  )
}
