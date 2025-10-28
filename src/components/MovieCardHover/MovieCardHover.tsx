/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { Play, Plus, Check, ChevronDown } from 'lucide-react';
import FadeImage from '../FadeImage/FadeImage';
import useHoverTrailer from '../../hooks/useHoverTrailer';
import { TMDB_IMG_BASE } from '../../constants/imageBase';
import useMyList from '../../hooks/useMyList';
import './MovieCardHover.scss';
import type { Movie } from '../../types/movie';
import { Link } from 'react-router-dom';

interface Props {
	movie: Movie;
	index: number;
}

export default function MovieCardHover({ movie }: Props) {
	const [isHovered, setIsHovered] = useState(false);
	const [position, setPosition] = useState({ origin: 'center', offsetX: 0 });
	const hoverTimeoutRef = useRef<any>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	const { trailerKey, onEnter, onLeave } = useHoverTrailer(movie.id);
	const { toggle, has } = useMyList();

	const calculatePosition = () => {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const cardWidth = rect.width;
		const scaledWidth = cardWidth * 1.5;

		let origin = 'center';
		let offsetX = 0;

		const rightOverflow = rect.left + scaledWidth - viewportWidth;
		const leftOverflow = -(rect.left - (scaledWidth - cardWidth) / 2);

		if (rightOverflow > 0) {
			origin = 'right';
			offsetX = -Math.min(rightOverflow + 20, cardWidth * 0.25);
		} else if (leftOverflow > 0) {
			origin = 'left';
			offsetX = Math.min(leftOverflow + 20, cardWidth * 0.25);
		}

		setPosition({ origin, offsetX });
	};

	const handleMouseEnter = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}

		hoverTimeoutRef.current = setTimeout(() => {
			calculatePosition();
			setIsHovered(true);
			onEnter();
		}, 400);
	};

	const handleMouseLeave = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}
		setIsHovered(false);
		onLeave();
	};

	useEffect(() => {
		if (!isHovered) return;

		const handleResize = () => calculatePosition();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isHovered]);

	useEffect(() => {
		if (isHovered) {
			document.body.style.overflowX = 'hidden';
		} else {
			document.body.style.overflowX = '';
		}
		return () => {
			document.body.style.overflowX = '';
		};
	}, [isHovered]);

	return (
		<div
			ref={cardRef}
			className={`movie-card ${isHovered ? 'is-hovered' : ''}`}
			data-origin={position.origin}
			style={
				{
					'--offset-x': `${position.offsetX}px`,
				} as React.CSSProperties
			}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className='card-preview'>
				<FadeImage src={`${TMDB_IMG_BASE}/w500${movie.poster_path}`} alt={movie.title} />
			</div>

			{isHovered && (
				<div className='card-expanded'>
					<div className='media'>
						{trailerKey ? (
							<iframe
								src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${trailerKey}`}
								allow='autoplay; encrypted-media'
								title={movie.title}
							/>
						) : (
							<FadeImage
								src={`${TMDB_IMG_BASE}/w780${movie.backdrop_path || movie.poster_path}`}
								alt={movie.title}
							/>
						)}
					</div>

					<div className='info'>
						<div className='actions'>
							<Link to={`/movie/${movie.id}`}>
								<button className='btn-play' aria-label='Play'>
									<Play size={18} fill='currentColor' />
								</button>
							</Link>
							<button
								className='btn-icon'
								onClick={(e) => {
									e.stopPropagation();
									toggle(movie);
								}}
								aria-label={has(movie.id) ? 'Remove' : 'Add to list'}
							>
								{has(movie.id) ? <Check size={16} /> : <Plus size={16} strokeWidth={3} />}
							</button>
							<Link to={`/movie/${movie.id}`}>
								<button className='btn-icon ml-auto' aria-label='More info'>
									<ChevronDown size={16} />
								</button>
							</Link>
						</div>

						<h3 className='title'>{movie.title}</h3>

						<div className='meta'>
							<span className='match'>{movie.vote_average.toFixed(1)}</span>
							<span className='year'>
								{movie.release_date ? new Date(movie.release_date).getFullYear() : '2025'}
							</span>
							<span className='badge'>HD</span>
						</div>

						<div className='genres'>{movie.overview}</div>
					</div>
				</div>
			)}
		</div>
	);
}
