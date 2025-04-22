import React from 'react';

type CreditsProps = {
  artist: string;
  track: string;
  size: 'sm' | 'md' | 'lg';
};

const sizeMap: Record<CreditsProps['size'], string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Credits: React.FC<CreditsProps> = ({ artist, track, size }) => {
  return (
    <p
      className={`${sizeMap[size]} font-semibold leading-tight text-white px-2 truncate`}
    >
      {artist || 'Artist'} - {track || 'Track'}
    </p>
  );
};
