"use client";

import { ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Hero = () => {
  const smoothScroll = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
  return (
    <section
      className="relative bg-[url(/artists/sly-and-the-family-stone.webp)] bg-cover bg-center bg-no-repeat"
    >
      <div
        className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
      ></div>

      <div
        className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex h-screen lg:items-center lg:px-8"
      >
        <div className="max-w-4xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            <strong className="text-6xl block font-extrabold text-primary">
              Last Beat
            </strong>
            The Rhythm of Your Life, Quantified
          </h1>

          <p className="mt-4 max-w-6xl text-white/90 sm:text-xl/relaxed">
            Unlock the power of your music habits with Last Beat.
            Gain insights into how music shapes your life and share your unique rhythm with the world.
            Dive deep into your audio history and let the data tell your story.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              to="/stats"
              className="inline-block rounded-sm bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-red-500 focus:ring-3 focus:outline-hidden ring-red-400"
            >
              See your stats
            </Link>

            <Link
              to="/charts"
              className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-muted shadow-sm focus:ring-3 focus:ring-muted-foreground focus:outline-hidden sm:w-auto"
            >
              Explore charts
            </Link>
          </div>
        </div>
      </div>
      <ChevronDown onClick={() => smoothScroll("stats")} className="absolute bottom-0 left-1/2 -translate-x-1/2 h-12 w-12 mb-2 cursor-pointer text-white animate-bounce" />
    </section>
  )
}
