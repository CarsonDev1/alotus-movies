import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import './Header.scss';

export default function Header() {
	const { t, i18n } = useTranslation('common');
	const { mode, setMode } = useTheme();

	const currentLang = i18n.language || 'en';

	const changeLang = (lng: 'en' | 'vi') => {
		localStorage.setItem('lang', lng);
		i18n.changeLanguage(lng);
	};

	return (
		<header className='header'>
			<div className='header-inner container'>
				<div className='app-title'>{t('appTitle')}</div>

				<div className='controls'>
					<label>
						{t('theme')}:
						<select className='select' value={mode} onChange={(e) => setMode(e.target.value as never)}>
							<option value='auto'>{t('theme_auto')}</option>
							<option value='light'>{t('theme_light')}</option>
							<option value='dark'>{t('theme_dark')}</option>
						</select>
					</label>

					<label>
						{t('language')}:
						<select
							className='select'
							value={currentLang.startsWith('vi') ? 'vi' : 'en'}
							onChange={(e) => changeLang(e.target.value as 'en' | 'vi')}
						>
							<option value='en'>{t('lang_en')}</option>
							<option value='vi'>{t('lang_vi')}</option>
						</select>
					</label>
				</div>
			</div>
		</header>
	);
}
