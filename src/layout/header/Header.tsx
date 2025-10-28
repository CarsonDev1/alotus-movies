import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { Language, ThemeMode } from '../../constants/enums';
import './Header.scss';

export default function Header() {
	const { t, i18n } = useTranslation('common');
	const { mode, setMode } = useTheme();
	const currentLang = i18n.language || Language.EN;

	const changeLang = (lng: Language) => {
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
						<select className='select' value={mode} onChange={(e) => setMode(e.target.value as ThemeMode)}>
							<option value={ThemeMode.Auto}>{t('theme_auto')}</option>
							<option value={ThemeMode.Light}>{t('theme_light')}</option>
							<option value={ThemeMode.Dark}>{t('theme_dark')}</option>
						</select>
					</label>

					<label>
						{t('language')}:
						<select
							className='select'
							value={currentLang.startsWith(Language.VI) ? Language.VI : Language.EN}
							onChange={(e) => changeLang(e.target.value as Language)}
						>
							<option value={Language.EN}>{t('lang_en')}</option>
							<option value={Language.VI}>{t('lang_vi')}</option>
						</select>
					</label>
				</div>
			</div>
		</header>
	);
}
