import { useEffect, useState, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNowPlaying } from '../../api/tmdbApi';
import type { Movie } from '../../types/movie';
import type { PaginatedResponse } from '../../types/api';
import './Banner.scss';

export default function Banner() {
	const { data, isLoading } = useQuery<PaginatedResponse<Movie>>({
		queryKey: ['banner-now-playing'],
		queryFn: () => getNowPlaying(1),
	});

	const [slides, setSlides] = useState<Movie[]>([]);
	const [animationType, setAnimationType] = useState<'next' | 'prev' | ''>('');
	const [isAnimating, setIsAnimating] = useState(false);
	const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const TIME_RUNNING = 3000;
	const TIME_AUTO_NEXT = 7000;

	// Cập nhật slides khi có data TMDB
	useEffect(() => {
		if (data?.results) {
			setSlides(data.results.slice(0, 4)); // lấy 4 phim đầu tiên
		}
	}, [data]);

	const showSlider = useCallback(
		(type: 'next' | 'prev') => {
			if (isAnimating || slides.length === 0) return;

			setIsAnimating(true);
			setAnimationType(type);

			setSlides((prev) => {
				if (type === 'next') {
					const [first, ...rest] = prev;
					return [...rest, first];
				} else {
					const newSlides = [...prev];
					const last = newSlides.pop();
					return last ? [last, ...newSlides] : newSlides;
				}
			});

			setTimeout(() => {
				setAnimationType('');
				setIsAnimating(false);
			}, TIME_RUNNING);
		},
		[isAnimating, slides.length]
	);

	const handleNext = useCallback(() => showSlider('next'), [showSlider]);
	const handlePrev = useCallback(() => showSlider('prev'), [showSlider]);

	// Auto play
	useEffect(() => {
		if (autoTimer.current) clearTimeout(autoTimer.current);
		autoTimer.current = setTimeout(() => {
			handleNext();
		}, TIME_AUTO_NEXT);

		return () => {
			if (autoTimer.current) clearTimeout(autoTimer.current);
		};
	}, [slides, handleNext]);

	if (isLoading) return <div className='carousel loading'>Loading...</div>;
	if (!slides.length) return null;

	return (
		<div className={`carousel ${animationType}`}>
			{/* Main slides */}
			<div className='list'>
				{slides.map((movie) => (
					<div key={movie.id} className='item'>
						<img
							src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
							alt={movie.title}
							loading='lazy'
						/>
						<div className='content'>
							<div className='author'>TMDB</div>
							<div className='title'>{movie.title}</div>
							<div className='topic'>⭐ {movie.vote_average.toFixed(1)}</div>
							<div className='des'>{movie.overview}</div>
							<div className='buttons'>
								<button>SEE MORE</button>
								<button>WATCH NOW</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Thumbnails */}
			<div className='thumbnail'>
				{slides.map((movie) => (
					<div key={`thumb-${movie.id}`} className='item'>
						<img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
						<div className='content'>
							<div className='title'>{movie.title}</div>
							<div className='description'>{movie.release_date}</div>
						</div>
					</div>
				))}
			</div>

			{/* Controls */}
			<div className='arrows'>
				<button id='prev' onClick={handlePrev} disabled={isAnimating}>
					&lt;
				</button>
				<button id='next' onClick={handleNext} disabled={isAnimating}>
					&gt;
				</button>
			</div>

			{/* Time bar */}
			<div className='time' />
		</div>
	);
}
