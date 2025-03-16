import Image from "next/image";
import Link from "next/link";
import { Wrapper } from "../_common/wrapper";

export const Stats = () => {
  return (
    <section id="stats" className="pt-5">
      <Wrapper>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full">
          <div className="bg-red-600 p-8 lg:p-12 lg:px-16 lg:py-24">
            <div className="flex flex-col justify-center items-center h-full mx-auto text-center">
              <h2 className="text-2xl font-bold text-white lg:text-3xl">
                Top albums, artists, and tracks
              </h2>

              <p className="text-white/90 sm:mt-4">
                Dive into your music history with personalized insights. Explore your favorite tracks, artists, and albums over time.
                Whether it&apos;s your all-time favorites or recent obsessions, gain a deeper understanding of your musical tastes with our intuitive timeline features.
              </p>

              <div className="mt-4 lg:mt-8">
                <Link
                  href="/stats"
                  className="inline-block rounded-sm border border-white bg-white px-12 py-3 text-sm font-medium text-red-500 transition hover:bg-transparent hover:text-white focus:ring-3 focus:ring-red-400 focus:outline-hidden"
                >
                  See your stats
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:grid-cols-2">
            <Image
              alt="John Coltrane"
              src="/artists/john-coltrane.jpg"
              className="h-96 w-full object-cover sm:h-72 md:h-full"
              objectFit="cover"
              width={707}
              height={900}
            />
            <Image
              alt="Donna Summer"
              src="/artists/donna-summer.jpg"
              className="h-96 w-full object-cover sm:h-72 md:h-full"
              objectFit="cover"
              width={687}
              height={1024}
            />
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
