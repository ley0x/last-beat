import React, { MouseEventHandler } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Search } from 'lucide-react'
import { z } from 'zod'
import { useAtom } from 'jotai'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'

import { GeniusSearchTrackSchema } from '@lib/schemas'
import { lcSelectedLyrics, lcSelectedTrack, lcTrackLyrics } from '@lib/store'

import { fetchGeniusSearchTracks } from '@services/api/genius'

import { Input } from '@components/ui/input'
import { HoverBorderGradient } from '@components/ui/hover-border-gradient'

type Inputs = {
  search: string
}

const schema = z.object({
  search: z.string().min(1)
})

type Props = {
  setLoading: (loading: boolean) => void
  setFoundTracks: (foundTracks: z.infer<typeof GeniusSearchTrackSchema>[]) => void
}

export const SearchBar = ({ setLoading, setFoundTracks }: Props) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [, setSelectedTrack] = useAtom(lcSelectedTrack)
  const [, setSelectedLyrics] = useAtom(lcSelectedLyrics)
  const [, setLyrics] = useAtom(lcTrackLyrics)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(schema)
  })

  const {
    data: tracks,
    isLoading,
    error
  } = useQuery({
    queryKey: ['genius', 'search', searchQuery],
    queryFn: () => fetchGeniusSearchTracks(searchQuery),
    enabled: !!searchQuery
  })

  React.useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  React.useEffect(() => {
    if (tracks) {
      setFoundTracks(tracks)
    }
  }, [tracks, setFoundTracks])

  React.useEffect(() => {
    if (error) {
      console.error(error)
      setFoundTracks([])
    }
  }, [error, setFoundTracks])

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault()
    const formData = getValues()
    onSubmit(formData)
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setSelectedTrack(null)
    setLyrics('')
    setSelectedLyrics('')
    setFoundTracks([])
    setSearchQuery(data.search)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full items-center gap-2">
          <Input type="text" placeholder="Search for a song" {...register('search')} />
          <HoverBorderGradient
            containerClassName="rounded-sm"
            as="button"
            onClick={handleClick}
            className="cursor-pointer size-9 p-0 text-center dark:bg-card bg-white text-black dark:text-white flex items-center justify-center"
          >
            <Search className="size-5" />
          </HoverBorderGradient>
        </div>
        {errors && <p className="text-sm text-destructive">{errors.search?.message}</p>}
      </form>
    </>
  )
}
