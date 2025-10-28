import { useState, useEffect } from 'react';
import { Search as SearchIcon, X as CloseIcon } from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../theme';
import './Search.scss';
import { useTranslation } from 'react-i18next';

export default function Search() {
	const { mode } = useTheme();
	const { t } = useTranslation('common');
	const navigate = useNavigate();
	const location = useLocation();
	const [params] = useSearchParams();

	const [query, setQuery] = useState('');
	const isSearchPage = location.pathname === '/search';

	useEffect(() => {
		if (isSearchPage) {
			setQuery(params.get('q') || '');
		} else {
			setQuery('');
		}
	}, [isSearchPage, params]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
	};

	const handleClear = () => {
		setQuery('');
		navigate('/');
	};

	return (
		<div className={`search-container ${mode}`}>
			<form className='search-box' onSubmit={handleSubmit}>
				<div className='icon'>
					<SearchIcon />
				</div>

				<input
					type='text'
					className='input'
					placeholder={t('search_placeholder')}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>

				{query && (
					<button type='button' className='clear-btn' onClick={handleClear}>
						<CloseIcon />
					</button>
				)}
			</form>
		</div>
	);
}
