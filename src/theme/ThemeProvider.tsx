import { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './theme-context';
import { ThemeMode } from '../constants/enums';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<ThemeMode>(
		() => (localStorage.getItem('theme-mode') as ThemeMode) || ThemeMode.Auto
	);

	useEffect(() => {
		localStorage.setItem('theme-mode', mode);
		const root = document.documentElement;
		if (mode === ThemeMode.Auto) {
			root.removeAttribute('data-theme');
		} else {
			root.setAttribute('data-theme', mode);
		}
	}, [mode]);

	const value = useMemo(() => ({ mode, setMode }), [mode]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
