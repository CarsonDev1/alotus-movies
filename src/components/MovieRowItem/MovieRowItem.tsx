import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import { TMDB_IMG_BASE } from '../../constants/imageBase';
import useHoverTrailer from '../../hooks/useHoverTrailer';
import '../MovieRow/MovieRow.scss';

export default function MovieGridItem({ movie }: { movie: Movie }) {
	const { trailerKey, onEnter, onLeave } = useHoverTrailer(movie.id);
	const [flip, setFlip] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleEnter = () => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			const spaceBelow = window.innerHeight - rect.bottom;
			setFlip(spaceBelow < 220);
		}
		onEnter();
	};

	return (
		<div ref={ref} className={`grid-item ${flip ? 'flip' : ''}`} onMouseEnter={handleEnter} onMouseLeave={onLeave}>
			<div className='grid-card'>
				{trailerKey ? (
					<iframe
						src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
						allow='autoplay'
						className='card-media'
					/>
				) : (
					<img
						src={`${TMDB_IMG_BASE}/w300${movie.backdrop_path ?? movie.poster_path}`}
						alt={movie.title}
						loading='lazy'
						className='card-media'
					/>
				)}

				<div className='card-info'>
					<div className='actions'>
						<Link to={`/movie/${movie.id}`} className='play'>
							▶
						</Link>
						<button className='add'>＋</button>
						<Link to={`/movie/${movie.id}`} className='more'>
							ⓘ
						</Link>
					</div>
					<div className='title'>{movie.title}</div>
					<div className='rating'>⭐ {movie.vote_average.toFixed(1)}</div>
				</div>
			</div>
		</div>
	);
}
