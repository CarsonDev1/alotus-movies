import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import { TMDB_IMG_BASE } from '../../constants/imageBase';
import useMyList from '../../hooks/useMyList';
import './MovieCardList.scss';
import { Check, Plus } from 'lucide-react';

export default function MovieCardList({ movies }: { movies: Movie[] }) {
	const { toggle, has } = useMyList();

	return (
		<div className="movie-list">
			{movies.map((m) => (
				<Link to={`/movie/${m.id}`} key={m.id} className="list-row">
					<img src={`${TMDB_IMG_BASE}/w185${m.poster_path}`} alt={m.title} />

					<div className="info">
						<h3>{m.title}</h3>
						<p className='info'>{m.overview}</p>
						<div className="meta">
							<span className="rating">⭐ {m.vote_average.toFixed(1)}</span>
							<span className="year">{m.release_date?.slice(0, 4)}</span>
						</div>
					</div>

					<button
						className={`list-add ${has(m.id) ? 'active' : ''}`}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							toggle(m);
						}}
					>
						{has(m.id) ? <Check /> : <Plus />}
					</button>
				</Link>
			))}
		</div>
	);
}
