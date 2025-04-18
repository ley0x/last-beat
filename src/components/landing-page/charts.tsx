import Image from "next/image";
import Link from "next/link";
import { Wrapper } from "../_common/wrapper";

export const Charts = () => {
  return (
    <Wrapper className="flex-wrap justify-between items-center gap-y-5 gap-x-2">
      <Image
        alt="Gil Scott-Heron"
        src="/artists/gil-scott-heron.jpg"
        width={1200 / 3}
        height={1760 / 3}
      />
      <div className="">
        <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold md:text-3xl">
            Explore interactive charts to see your music taste evolution
          </h2>
          <p className="hidden text-muted-foreground md:mt-4 md:block">
            We retrieve all your Last.fm scrobbles and generates charts for you. Explore your music taste through years and genres.
          </p>
          <div className="mt-4 md:mt-8">
            <Link
              href="#"
              className="inline-block rounded-sm bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-red-500 focus:ring-3 focus:outline-hidden ring-red-400"
            >
              Explore charts
            </Link>
          </div>
        </div>
      </div>

    </Wrapper>
  )
}
