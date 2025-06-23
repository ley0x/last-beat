import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@components/ui/breadcrumb'

import { SidebarTrigger } from '@components/ui/sidebar'

import { ToggleTheme } from '@common/toggle-theme'
import { ToggleBg } from '@layout/toggle-background'
import { Link, useMatches } from '@tanstack/react-router'

// Helper function to generate breadcrumb title from route path
const generateBreadcrumbTitle = (pathname: string, params?: Record<string, string>) => {
  if (pathname === '/') return 'Last Beat'

  // Remove / at start and end then split by /
  const segments = pathname.slice(1, -1).split('/')

  // Get the last segment for the title
  const lastSegment = segments[segments.length - 1]

  // Special formatting for specific routes
  if (lastSegment === 'lyrics-cards') return 'Lyrics Cards'
  if (lastSegment === 'tierlists') return 'Tier Lists'
  if (lastSegment === 'topsters') return 'Topsters'
  if (lastSegment === 'covers') return 'Covers'
  if (lastSegment === 'stats') return 'Stats'
  if (lastSegment === 'albums') return 'Albums'
  if (lastSegment === 'artists') return 'Artists'
  if (lastSegment === 'tracks') return 'Tracks'

  return lastSegment
}

// Helper function to build the path for intermediate breadcrumb items
const buildPathForSegments = (segments: string[], index: number, params?: Record<string, string>) => {
  const pathSegments = segments.slice(0, index + 1)
  let path =
    '/' +
    pathSegments
      .map(segment => {
        if (segment.startsWith('$')) {
          const paramName = segment.slice(1)
          return params?.[paramName] || segment
        }
        return segment
      })
      .join('/')

  // Add trailing slash for index routes (when the last segment is not empty)
  // This handles cases like /stats/ and /stats/$username/
  if (path !== '/' && !path.endsWith('/')) {
    path += '/'
  }

  return path
}

const BreadcrumbNav = () => {
  const matches = useMatches()

  // Get the current route (last match)
  const currentMatch = matches[matches.length - 1]

  if (!currentMatch || currentMatch.pathname === '/') {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize">Last Beat</BreadcrumbPage>
      </BreadcrumbItem>
    )
  }

  // Build breadcrumb path by analyzing the current pathname
  const pathname = currentMatch.pathname
  const params = currentMatch.params
  const segments = pathname.slice(1).split('/').filter(Boolean) // Remove empty segments

  const breadcrumbItems = [
    <BreadcrumbItem key="home">
      <BreadcrumbLink asChild>
        <Link to="/" className="capitalize">
          Last Beat
        </Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  ]

  // Build breadcrumbs for each segment
  segments.forEach((segment, index) => {
    const segmentPath = buildPathForSegments(segments, index, params)
    const title = generateBreadcrumbTitle(segmentPath, params)

    // Compare paths by normalizing trailing slashes
    const normalizePathForComparison = (path: string) => (path.endsWith('/') ? path : path + '/')
    const isCurrentPage = normalizePathForComparison(segmentPath) === normalizePathForComparison(pathname)

    // Add separator
    breadcrumbItems.push(<BreadcrumbSeparator key={`separator-${index}`} />)

    // Add breadcrumb item
    if (isCurrentPage) {
      // Current page is not clickable
      breadcrumbItems.push(
        <BreadcrumbItem key={segmentPath}>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    } else {
      // Other items are clickable
      breadcrumbItems.push(
        <BreadcrumbItem key={segmentPath}>
          <BreadcrumbLink asChild>
            <Link to={segmentPath}>{title}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      )
    }
  })

  return <>{breadcrumbItems}</>
}

export const Navbar = () => {
  return (
    <nav className="sticky top-0 flex justify-between gap-5 items-center z-50 bg-background/80 backdrop-blur-md px-5 py-2 w-full border-b border-sidebar-border shadow-sm">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbNav />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-x-2">
        <ToggleBg />
        <ToggleTheme />
      </div>
    </nav>
  )
}
