import { useState } from 'react';
import Search from '../../components/Search/Search';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { NavLink } from 'react-router-dom';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import './Header.scss';

export default function Header() {
	const { t } = useTranslation('common');
	const [open, setOpen] = useState(false);

	return (
		<header className='header'>
			<div className='header-inner container'>
				<div className='logo-and-nav'>
					<NavLink to='/' onClick={() => setOpen(false)}>
						<img className='logo' src='/images/Logo.png' alt='Logo' />
					</NavLink>

					<nav className='nav desktop'>
						<NavLink to='/' className='nav-link'>
							{t('nav_home')}
						</NavLink>
						<NavLink to='/my-list' className='nav-link'>
							{t('nav_my_list')}
						</NavLink>
					</nav>
				</div>

				<div className='controls'>
					<Search />
					<div className='nav desktop'>
						<ThemeToggle />
						<LanguageSwitcher />
					</div>

					<div className={`hamburger ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}>
						<svg viewBox='0 0 32 32'>
							<path
								className='line line-top-bottom'
								d='M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22'
							/>
							<path className='line' d='M7 16 27 16' />
						</svg>
					</div>
				</div>
			</div>

			<div className={`mobile-menu ${open ? 'open' : ''}`}>
				<button className='close' onClick={() => setOpen(false)}>
					×
				</button>
				<NavLink to='/' className='nav-link' onClick={() => setOpen(false)}>
					{t('nav_home')}
				</NavLink>
				<NavLink to='/my-list' className='nav-link' onClick={() => setOpen(false)}>
					{t('nav_my_list')}
				</NavLink>
				<div className='nav'>
					<ThemeToggle />
					<LanguageSwitcher />
				</div>
			</div>

			<div className={`overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
		</header>
	);
}
