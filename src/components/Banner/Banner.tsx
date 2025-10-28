import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNowPlaying } from '../../api/tmdbApi';
import type { Movie } from '../../types/movie';
import type { PaginatedResponse } from '../../types/api';
import useMyList from '../../hooks/useMyList';
import './Banner.scss';

export default function Banner() {
	const navigate = useNavigate();
	const { toggle, has } = useMyList();
	const { data, isLoading } = useQuery<PaginatedResponse<Movie>>({
		queryKey: ['banner-now-playing'],
		queryFn: () => getNowPlaying(1),
	});

	const [activeIndex, setActiveIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const autoTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const TIME_RUNNING = 500;
	const TIME_AUTO_NEXT = 8000;

	const totalSlides = data?.results?.slice(0, 5) || [];
	const slides =
		totalSlides.length > 0 ? [...totalSlides.slice(activeIndex), ...totalSlides.slice(0, activeIndex)] : [];

	const changeSlide = useCallback(
		(targetIndex: number) => {
			if (isAnimating || totalSlides.length === 0 || targetIndex === 0) return;

			setIsAnimating(true);
			setActiveIndex((prev) => (prev + targetIndex) % totalSlides.length);

			setTimeout(() => setIsAnimating(false), TIME_RUNNING);
		},
		[isAnimating, totalSlides.length]
	);

	const handleViewDetails = (movieId: number) => {
		navigate(`/movie/${movieId}`);
	};

	const handleToggleFavorite = (e: React.MouseEvent, movie: Movie) => {
		e.stopPropagation();
		toggle(movie);
	};

	useEffect(() => {
		if (totalSlides.length === 0) return;

		autoTimerRef.current = setTimeout(() => changeSlide(1), TIME_AUTO_NEXT);

		return () => {
			if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
		};
	}, [activeIndex, changeSlide, totalSlides.length]);

	if (isLoading) {
		return (
			<div className='carousel skeleton'>
				<div className='list'>
					<div className='item'>
						<div className='skeleton-image' />
						<div className='banner-overlay' />
						<div className='content'>
							<div className='skeleton-title' />
							<div className='skeleton-topic' />
							<div className='skeleton-des' />
							<div className='skeleton-buttons'>
								<div className='skeleton-button' />
								<div className='skeleton-button' />
							</div>
						</div>
					</div>
				</div>
				<div className='thumbnail'>
					{[...Array(5)].map((_, i) => (
						<div key={i} className='item'>
							<div className='skeleton-thumb' />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (!slides.length) return null;

	const activeMovie = slides[0];
	const isInList = has(activeMovie.id);

	return (
		<div className={`carousel ${isAnimating ? 'next' : ''}`}>
			<div className='list'>
				{slides.map((movie, index) => (
					<div key={movie.id} className='item'>
						<img
							src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
							alt={movie.title}
							loading='lazy'
						/>
						{index === 0 && (
							<>
								<div className='banner-overlay' />
								<div className='content'>
									<div className='title'>{movie.title}</div>
									<div className='topic'>⭐ {movie.vote_average.toFixed(1)}</div>
									<div className='des'>{movie.overview}</div>
									<div className='buttons'>
										<button className='btn-play' onClick={() => handleViewDetails(movie.id)}>
											<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
												<path d='M8 5v14l11-7z' />
											</svg>
											<span>Play</span>
										</button>
										<button
											className={`btn-favorite ${isInList ? 'active' : ''}`}
											onClick={(e) => handleToggleFavorite(e, movie)}
											data-tooltip={isInList ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
										>
											{isInList ? (
												<svg
													width='20'
													height='20'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M5 13l4 4L19 7'
													/>
												</svg>
											) : (
												<svg
													width='20'
													height='20'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M12 5v14m7-7H5'
													/>
												</svg>
											)}
										</button>
									</div>
								</div>
							</>
						)}
					</div>
				))}
			</div>

			<div className='thumbnail'>
				{slides.map((movie, index) => (
					<div
						key={`thumb-${movie.id}`}
						className={`item ${index === 0 ? 'active' : ''}`}
						onClick={() => changeSlide(index)}
					>
						<img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
					</div>
				))}
			</div>
		</div>
	);
}
