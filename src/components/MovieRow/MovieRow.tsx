import type { Movie } from '../../types/movie';
import MovieRowItem from '../MovieRowItem/MovieRowItem';
import './MovieRow.scss';

export default function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
	return (
		<section className='movie-grid-section'>
			<h2 className='grid-title'>{title}</h2>
			<div className='movie-grid'>
				{movies.map((m) => (
					<MovieRowItem key={m.id} movie={m} />
				))}
			</div>
		</section>
	);
}
