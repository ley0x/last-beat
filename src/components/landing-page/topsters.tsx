;
import { Link } from "@tanstack/react-router";
import { Wrapper } from "@common/wrapper";

export const Topsters = () => {
  return (
    <Wrapper className="flex-wrap-reverse justify-around md:justify-between  items-center gap-y-5 gap-x-2">
      <div className="">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold md:text-3xl">
            Make posters of your top albums or artists
          </h2>
          <p className="hidden text-muted-foreground md:mt-4 md:block">
            Create stunning posters featuring your top albums and artists.
            Whether it&apos;s a collage of album covers or a tribute to your favorite musicians, Topsters helps you celebrate your music journey in style.
          </p>
          <div className="mt-4 md:mt-8">
            <Link
              to="/topsters"
              className="inline-block rounded-sm bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-red-500 focus:ring-3 focus:outline-hidden ring-red-400"
            >
              Generate topsters
            </Link>
          </div>
        </div>
      </div>
      <img
        alt="Charles Mingus"
        src="/artists/mingus.jpg"
        width={500 / 1.5}
        height={596 / 1.5}
      />
    </Wrapper>
  )
}
