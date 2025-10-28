import { useQuery } from '@tanstack/react-query';
import { getNowPlaying } from '../../api/tmdbApi';
import type { Movie } from '../../types/movie';
import type { PaginatedResponse } from '../../types/api';
import './NowPlaying.scss';

export default function NowPlaying() {
	const { data, isLoading, error } = useQuery<PaginatedResponse<Movie>>({
		queryKey: ['now-playing', 1],
		queryFn: () => getNowPlaying(1),
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Something went wrong.</p>;

	return (
		<section className='now-playing container'>
			<h2 className='title'>🎬 Now Playing</h2>
			<div className='grid'>
				{data?.results.map((movie) => (
					<div key={movie.id} className='movie-card'>
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className='poster'
						/>
						<div className='info'>
							<h3>{movie.title}</h3>
							<p>⭐ {movie.vote_average.toFixed(1)}</p>
							<p>{movie.release_date}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
