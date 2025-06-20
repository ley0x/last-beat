import Header from '@common/header'
import { Button } from '@components/ui/button'
import { Plus } from 'lucide-react'
import { useTimeframe } from '@hooks/use-timeframe'

import { Controls } from '@stats/top/controls'
import { useNavigate } from '@tanstack/react-router'

type Props = {
  children: React.ReactNode
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  viewMore?: boolean
  setMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>
  mode: 'grid' | 'list'
  username: string
  type: 'albums' | 'artists' | 'tags' | 'tracks'
}

export const StatsContainer = ({ children, page, setPage, type, viewMore, setMode, mode, username }: Props) => {
  const time = useTimeframe()
  const navigate = useNavigate({ from: '/stats/$username' })

  const data = {
    albums: {
      title: 'Top Albums',
      subtitle: `Your top albums from the ${time}.`,
      href: `/stats/${username}/albums`
    },
    artists: {
      title: 'Top Artists',
      subtitle: `Your top artists from the ${time}.`,
      href: `/stats/${username}/artists`
    },
    tags: {
      title: 'Top Tags',
      subtitle: `Your top tags from the ${time}.`,
      href: `/stats/${username}/tags`
    },
    tracks: {
      title: 'Top Tracks',
      subtitle: `Your top tracks from the ${time}.`,
      href: `/stats/${username}/tracks`
    }
  }

  return (
    <div className="flex flex-col gap-5 justify-center">
      <div>
        <div className="w-full flex flew-wrap gap-2 items-center justify-between">
          <Header as="h2">{data[type].title}</Header>
          <Controls setPage={setPage} page={page} setMode={setMode} mode={mode} />
        </div>
        <Header as="h4" className="text-gray-400 font-normal">
          {data[type].subtitle}
        </Header>
      </div>
      <div className="flex flex-wrap gap-2 justify-around items-center">{children}</div>
      {!!viewMore && (
        <div className="flex justify-end">
          <Button onClick={() => navigate({ to: data[type].href })} variant="outline" className="hover:cursor-pointer">
            <span>View more</span>
            <Plus />{' '}
          </Button>
        </div>
      )}
    </div>
  )
}
