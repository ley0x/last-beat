"use client";

import React from 'react'
import Header from './_common/header';

export const TopAlbums = () => {
  return (
    <section className="flex flex-col gap-5 justify-center">
      <div>
        <Header as="h2">Top Albums</Header>
        <Header as="h4" className="text-gray-400 font-normal">Your top albums from the last 7 days.</Header>
      </div>
      <p className="text-center">Coming soon...</p>
    </section>
  )
}
