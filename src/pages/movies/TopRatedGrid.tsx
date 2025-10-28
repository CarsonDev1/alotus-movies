import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTopRated } from '../../api/tmdbApi';
import type { Movie } from '../../types/movie';
import type { PaginatedResponse } from '../../types/api';
import MovieCardList from '../../components/MovieCardList/MovieCardList';
import MovieCardHover from '../../components/MovieCardHover/MovieCardHover';
import './MoviesGrid.scss';

export default function TopRatedGrid() {
	const [params] = useSearchParams();
	const view = params.get('view') ?? 'grid';

	const [page, setPage] = useState(1);
	const [movies, setMovies] = useState<Movie[]>([]);
	const loaderRef = useRef<HTMLDivElement | null>(null);

	const { data, isFetching, isLoading, error } = useQuery<PaginatedResponse<Movie>>({
		queryKey: ['top-rated', page],
		queryFn: () => getTopRated(page),
		placeholderData: (prev) => prev,
	});

	useEffect(() => {
		if (data) {
			setMovies((prev) => {
				if (page === 1) return data.results;
				return [...prev, ...data.results];
			});
		}
	}, [data, page]);

	useEffect(() => {
		const el = loaderRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isFetching) setPage((p) => p + 1);
			},
			{ rootMargin: '200px' }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [isFetching]);

	if (isLoading && page === 1) return <div className='grid-skeleton'>Loading…</div>;
	if (error) return <p className='grid-error'>Network error.</p>;

	if (view === 'list') {
		return (
			<>
				<MovieCardList movies={movies} />
				<div ref={loaderRef} className='infinite-loader'>
					{isFetching && 'Loading…'}
				</div>
			</>
		);
	}

	return (
		<>
			<div className='movies-grid'>
				{movies.map((m, index) => (
					<MovieCardHover key={m.id} movie={m} index={index} />
				))}
			</div>
			<div ref={loaderRef} className='infinite-loader'>
				{isFetching && 'Loading…'}
			</div>
		</>
	);
}
