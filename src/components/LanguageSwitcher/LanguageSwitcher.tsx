import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../../constants/enums';
import { useTheme } from '../../theme';
import './LanguageSwitcher.scss';

export default function LanguageSwitcher() {
	const { mode } = useTheme();
	const { i18n } = useTranslation('common');
	const current = i18n.language.startsWith(Language.VI) ? Language.VI : Language.EN;
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const changeLang = (lng: Language) => {
		localStorage.setItem('lang', lng);
		i18n.changeLanguage(lng);
		setOpen(false);
	};

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('click', handler);
		return () => document.removeEventListener('click', handler);
	}, []);

	return (
		<div ref={ref} className={`lang-select ${mode}`}>
			<button className='lang-btn' onClick={() => setOpen((o) => !o)}>
				🌐 {current.toUpperCase()}
			</button>

			{open && (
				<div className='lang-menu'>
					<button onClick={() => changeLang(Language.EN)}>English</button>
					<button onClick={() => changeLang(Language.VI)}>Tiếng Việt</button>
				</div>
			)}
		</div>
	);
}
