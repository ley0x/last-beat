import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '@components/default-cache-boundary'
import { NotFound } from '@components/not-found'
import { seo } from '@lib/utils'

import appCss from '@styles/globals.css?url'
import { Providers } from '@/components/providers/providers'
import { Layout } from '@/components/layout/layout'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      ...seo({
        title: 'LastBeat | Music Statistics and more',
        description: `The Rhythm of Your Life, Quantified`
      })
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss
      },
      { rel: 'icon', href: '/favicon.ico' }
    ]
  }),
  errorComponent: props => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="relative">
        <Providers>
          <Layout>{children}</Layout>
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </Providers>
        <Scripts />
      </body>
    </html>
  )
}
