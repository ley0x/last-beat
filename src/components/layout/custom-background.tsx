import { showGlowyBackgroundAtom } from '@lib/store'
import { cn } from '@lib/utils'
import { useAtom } from 'jotai'

export const CustomBackground = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [showGlowyBg] = useAtom(showGlowyBackgroundAtom)
  return (
    <div className="relative min-h-screen w-full h-screen overflow-x-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 z-10 isolate pointer-events-none bg-background/70" />
      <div
        className="absolute inset-0 z-10 mix-blend-overlay opacity-30"
        style={{ backgroundImage: 'url("/noise.png")' }}
      />
      {showGlowyBg && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20">
          <div
            className={cn(
              'absolute left-3/4 top-4/4 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-3xl',
              {
                'animate-pulse duration-[5000ms]': false
              }
            )}
          />
          <div
            className={cn(
              'absolute left-1/4 top-1/4 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink-600 to-indigo-500 blur-2xl',
              {
                'animate-pulse duration-[5000ms]': false
              }
            )}
          />
        </div>
      )}
      {/* Content */}
      <div id="main-layout" className="relative z-20 w-full h-full overflow-y-scroll overflow-x-hidden flex flex-col">
        {children}
      </div>
    </div>
  )
}
