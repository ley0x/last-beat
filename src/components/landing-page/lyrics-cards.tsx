;
import { Link } from "@tanstack/react-router";
import { Wrapper } from "@common/wrapper";

export const LyricsCards = () => {
  return (
    <section>
      <Wrapper>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
            <img
              alt="John Coltrane"
              src="/artists/sade.jpg"
              className="h-96 w-full object-cover sm:h-72 md:h-full"
              objectFit="cover"
              width={707}
              height={900}
            />
            <img
              alt="Nina Simone"
              src="/artists/nina-simone.jpg"
              className="h-96 w-full object-cover sm:h-72 md:h-full"
              objectFit="cover"
              width={687}
              height={1024}
            />
          </div>
          <div className="bg-primary p-8 lg:p-12 lg:px-16 lg:py-24">
            <div className="flex flex-col justify-center items-center h-full mx-auto text-center">
              <h2 className="text-2xl font-bold text-white lg:text-3xl">
                Create cards for your favorite lyrics
              </h2>

              <p className="text-white/90 sm:mt-4">
                Turn your favorite song lyrics into beautifully designed cards. Personalize each card with unique styles and share your musical moments with friends.
              </p>

              <div className="mt-4 lg:mt-8">
                <Link
                  to="/cards"
                  className="inline-block rounded-sm border border-white bg-white px-12 py-3 text-sm font-medium text-red-500 transition hover:bg-transparent hover:text-white focus:ring-3 focus:ring-red-400 focus:outline-hidden"
                >
                  Generate cards
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
