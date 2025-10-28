import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './SearchPage.scss';
import { searchMovies } from '../../api/tmdbApi';
import type { Movie } from '../../types/movie';
import MovieCardHover from '../../components/MovieCardHover/MovieCardHover';
import { useRef } from 'react';

export default function SearchPage() {
	const [params] = useSearchParams();
	const query = params.get('q') || '';
	const loaderRef = useRef<HTMLDivElement | null>(null);


	const { data, isLoading, isFetching, isError } = useQuery({
		queryKey: ['search-page', query],
		queryFn: () => searchMovies(query),
		enabled: !!query,
	});

	const results = data?.results ?? [];

	if (!query) return <div className='search-page'>Type something to search.</div>;
	if (isLoading) {
		return (
			<div className='search-page container'>
				<h2 className='search-title'>
					Searching for "<span>{query}</span>"
				</h2>

				<div className='movies-grid'>
					{Array.from({ length: 12 }).map((_, i) => (
						<div key={i} className="skeleton-card" />
					))}
				</div>
			</div>
		);
	}
	if (isError) return <div className='search-page'>Error loading results.</div>;

	return (
		<div className='search-page container'>
			<h2 className='search-title'>
				Search results for "<span>{query}</span>"
			</h2>

			<div className='movies-grid'>
				{results.map((m: Movie, index: number) => (
					<MovieCardHover key={m.id} movie={m} index={index} />
				))}
			</div>
			<div ref={loaderRef} className='infinite-loader'>
				{isFetching && 'Loading…'}
			</div>
		</div>
	);
}
