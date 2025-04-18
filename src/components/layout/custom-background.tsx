"use client";

export const CustomBackground = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative min-h-screen w-full bg-primary-950">
      {/* Noise overlay */}
      <div className="pointer-events-none background-primary absolute inset-0 z-10 mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("/noise.png")' }} />
      {/* Content */}
      <div className="relative z-20 h-screen overflow-y-scroll w-full flex flex-col">
        {children}
      </div>
    </div>
  )
}
