/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import { getMovieVideos } from '../api/tmdbApi';
import type { Video } from '../types/movie';

export default function useHoverTrailer(movieId: number) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const timer = useRef<any | null>(null);

  const onEnter = () => {
    timer.current = setTimeout(async () => {
      const data: Video[] = await getMovieVideos(movieId);
      const yt = data.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
      if (yt) setTrailerKey(yt.key);
    }, 800);
  };

  const onLeave = () => {
    if (timer.current) clearTimeout(timer.current);
    setTrailerKey(null);
  };

  return { trailerKey, onEnter, onLeave };
}
