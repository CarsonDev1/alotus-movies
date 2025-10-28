import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';

export default function useMyList() {
  const [list, setList] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('my-list');
    if (saved) setList(JSON.parse(saved));
  }, []);

  const save = (next: Movie[]) => {
    setList(next);
    localStorage.setItem('my-list', JSON.stringify(next));
  };

  const toggle = (m: Movie) => {
    const exists = list.some(x => x.id === m.id);
    if (exists) save(list.filter(x => x.id !== m.id));
    else save([...list, m]);
  };

  const has = (id: number) => list.some(x => x.id === id);

  return { list, toggle, has };
}
