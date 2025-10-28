import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './MovieDetailPage.scss';
import { getMovieCredits, getMovieDetail, getMovieVideos } from '../../../api/tmdbApi';
import type { Cast, Crew, Video } from '../../../types/movie';
import { ImageOff } from 'lucide-react';
import { TMDB_IMG_BASE } from '../../../constants/imageBase';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MovieDetailPage() {
	const { id } = useParams<{ id: string }>();
	const [playTrailer, setPlayTrailer] = useState(false);
	const { t } = useTranslation('common');


	const {
		data: movie,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['movie-detail', id],
		queryFn: () => getMovieDetail(id!),
		enabled: !!id,
		retry: 1,
	});

	const { data: videos, isError: videosError } = useQuery<Video[]>({
		queryKey: ['movie-videos', id],
		queryFn: () => getMovieVideos(id!),
		enabled: !!id,
		retry: 1,
	});

	const { data: credits, isError: creditsError } = useQuery({
		queryKey: ['movie-credits', id],
		queryFn: () => getMovieCredits(id!),
		enabled: !!id,
		retry: 1,
	});

	if (isLoading) {
		return (
			<div className='movie-detail-skeleton'>
				<div className='backdrop-skeleton'></div>
				<div className='container'>
					<div className='poster-skeleton skeleton'></div>
					<div className='info-skeleton'>
						<div className='title-skeleton skeleton'></div>
						<div className='tagline-skeleton skeleton'></div>
						<div className='meta-skeleton'>
							<div className='skeleton'></div>
							<div className='skeleton'></div>
							<div className='skeleton'></div>
						</div>
						<div className='overview-skeleton'>
							<div className='skeleton'></div>
							<div className='skeleton'></div>
							<div className='skeleton'></div>
						</div>
						<div className='genres-skeleton'>
							<div className='skeleton'></div>
							<div className='skeleton'></div>
							<div className='skeleton'></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (isError || !movie) {
		return (
			<div className='movie-detail-error'>
				<div className='error-icon'>🚫</div>
				<h2>{(error as Error)?.message || 'Failed to fetch movie details. Please try again later.'}</h2>
			</div>
		);
	}

	if (videosError || creditsError) {
		return (
			<div className='movie-detail-error'>
				<div className='error-icon'>⚠️</div>
				<h2>Network Error</h2>
				<p>Failed to load additional movie data. Please check your connection.</p>
			</div>
		);
	}

	const trailer = videos?.find((v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));

	const cast: Cast[] = credits?.cast?.slice(0, 8) ?? [];
	const directors: Crew[] = credits?.crew?.filter((p) => p.job === 'Director') ?? [];
	const backdropUrl = movie.backdrop_path ? `${TMDB_IMG_BASE}/original${movie.backdrop_path}` : null;

	return (
		<div className='movie-detail'>
			<div className='sec-com'>
				{backdropUrl && (
					<div className='backdrop' style={{ backgroundImage: `url(${backdropUrl})` }}>
						<div className='backdrop-overlay'></div>
					</div>
				)}

				<div className='container'>
					<div className='movie-detail-container'>
						<div className='poster'>
							{movie.poster_path ? (
								<img
									src={`${TMDB_IMG_BASE}/w500${movie.poster_path}`}
									alt={movie.title}
								/>
							) : (
								<ImageOff />
							)}
						</div>

						<div className='info'>
							<h1 className='title'>{movie.title}</h1>
							{movie.tagline && <p className='tagline'>"{movie.tagline}"</p>}

							<div className='meta'>
								{movie.vote_average && (
									<span className='rating'>
										{movie.vote_average.toFixed(1)}
									</span>
								)}
								{movie.release_date && (
									<span className='year'>{new Date(movie.release_date).getFullYear()}</span>
								)}
								{movie.runtime && <span className='runtime'>{movie.runtime} {t('runtime')}</span>}
							</div>

							{movie.overview && <p className='overview'>{movie.overview}</p>}

							{movie.genres && movie.genres.length > 0 && (
								<div className='genres'>
									{movie.genres.map((g) => (
										<span key={g.id} className='genre-tag'>
											{g.name}
										</span>
									))}
								</div>
							)}


						</div>

					</div>
					<div className='additional-info'>
						{trailer && (
							<div className="trailer">
								<h3>🎬 {t('watch_trailer')}</h3>

								<div className="trailer-player">
									{!playTrailer && (
										<div className="thumbnail" onClick={() => setPlayTrailer(true)}>
											<img
												src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
												alt="Trailer Thumbnail"
											/>
											<div className="play-btn">▶</div>
										</div>
									)}

									<iframe
										src={`https://www.youtube.com/embed/${trailer.key}?autoplay=${playTrailer ? 1 : 0}`}
										title={trailer.name}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									></iframe>
								</div>
							</div>
						)}


						{directors.length > 0 && (
							<div className='directors'>
								<h3>
									{directors.length > 1 ? t('directors') : t('director')}
								</h3>
								<div className='people-grid'>
									{directors.map((d) => (
										<div key={d.id} className='person'>
											<div className='person-image'>
												{d.profile_path ? (
													<img
														src={`${TMDB_IMG_BASE}/w185${d.profile_path}`}
														alt={d.name}
													/>
												) : (
													<div className='no-image'>
														<ImageOff />
													</div>
												)}
											</div>
											<p className='person-name'>{d.name}</p>
										</div>
									))}
								</div>
							</div>
						)}

						{cast.length > 0 && (
							<div className='cast'>
								<h3>{t('cast')}</h3>
								<div className='people-grid'>
									{cast.map((actor) => (
										<div key={actor.id} className='person'>
											<div className='person-image'>
												{actor.profile_path ? (
													<img
														src={`${TMDB_IMG_BASE}/w185${actor.profile_path}`}
														alt={actor.name}
														className="w-[185px] h-[278px] object-cover rounded"
													/>
												) : (
													<div className='no-image'>
														<ImageOff className="text-gray-400 w-12 h-12" />
													</div>
												)}
											</div>
											<p className='name'>{actor.name}</p>
											<p className='character'>{actor.character}</p>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
