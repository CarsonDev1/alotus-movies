import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Tabs.scss';

export default function Tabs() {
	const { t } = useTranslation('common');
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const tab = params.get('tab') ?? 'now';

	const handleChange = (newTab: string) => {
		if (newTab !== tab) {
			navigate(`/?tab=${newTab}`, { preventScrollReset: true });
		}
	};

	return (
		<div className='tab-container'>
			<input
				type='radio'
				name='tab'
				id='tab-now'
				className='tab tab--1'
				checked={tab === 'now'}
				onChange={() => handleChange('now')}
			/>
			<label className='tab_label' htmlFor='tab-now'>
				{t('header_now_playing')}
			</label>

			<input
				type='radio'
				name='tab'
				id='tab-top'
				className='tab tab--2'
				checked={tab === 'top'}
				onChange={() => handleChange('top')}
			/>
			<label className='tab_label' htmlFor='tab-top'>
				{t('header_top_rated')}
			</label>

			<div className='indicator' />
		</div>
	);
}
