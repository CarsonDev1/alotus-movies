import { useTranslation } from 'react-i18next';
import MovieCardHover from '../../components/MovieCardHover/MovieCardHover';
import useMyList from '../../hooks/useMyList';

export default function MyListPage() {
	const { list } = useMyList();
	const { t } = useTranslation("common");

	return (
		<section className='container'>
			<h2 className='grid-title'>{t('nav_my_list')}</h2>
			<div className='movies-grid'>
				{list.map((m, index) => (
					<MovieCardHover key={m.id} movie={m} index={index} />
				))}
			</div>
		</section>
	);
}
