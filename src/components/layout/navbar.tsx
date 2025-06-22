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

  // Remove leading slash and split by /
  const segments = pathname.slice(1).split('/')

  // Handle parameterized routes
  const processedSegments = segments.map(segment => {
    // If segment starts with $, it's a parameter
    if (segment.startsWith('$')) {
      const paramName = segment.slice(1) // Remove $
      return params?.[paramName] || segment
    }
    return segment
  })

  // Get the last segment for the title
  const lastSegment = processedSegments[processedSegments.length - 1]

  // Special formatting for specific routes
  if (lastSegment === 'lyrics-cards') return 'Lyrics Cards'
  if (lastSegment === 'tierlists') return 'Tier Lists'
  if (lastSegment === 'topsters') return 'Topsters'
  if (lastSegment === 'covers') return 'Covers'
  if (lastSegment === 'stats') return 'Stats'

  // Capitalize first letter
  return lastSegment
}

// Helper function to build the path for intermediate breadcrumb items
const buildPathForSegments = (segments: string[], index: number, params?: Record<string, string>) => {
  const pathSegments = segments.slice(0, index + 1)
  return (
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
  )
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
  const segments = pathname.slice(1).split('/')

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
    const isLast = index === segments.length - 1
    const segmentPath = buildPathForSegments(segments, index, params)
    const title = generateBreadcrumbTitle(segmentPath, params)

    // Add separator
    breadcrumbItems.push(<BreadcrumbSeparator key={`separator-${index}`} />)

    // Add breadcrumb item
    if (isLast) {
      // Last item is not clickable
      breadcrumbItems.push(
        <BreadcrumbItem key={segmentPath}>
          <BreadcrumbPage className="capitalize">{title}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    } else {
      // Intermediate items are clickable
      breadcrumbItems.push(
        <BreadcrumbItem key={segmentPath}>
          <BreadcrumbLink asChild>
            <Link to={segmentPath} className="capitalize">
              {title}
            </Link>
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
