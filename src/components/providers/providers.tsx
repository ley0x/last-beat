import { Provider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { CustomBackground } from '@layout/custom-background'

import { ReactQueryProvider } from "@common/react-query-provider";
import { SidebarProvider } from "@components/ui/sidebar"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomBackground>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </CustomBackground>
          <Toaster theme="system" />
        </ThemeProvider>
      </Provider>
    </ReactQueryProvider>
  )
}
