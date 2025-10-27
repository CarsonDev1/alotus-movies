import { useEffect, useMemo, useState } from 'react';
import { ThemeContext, type ThemeMode } from './theme-context';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<ThemeMode>(() => {
		return (localStorage.getItem('theme-mode') as ThemeMode) || 'auto';
	});

	useEffect(() => {
		localStorage.setItem('theme-mode', mode);

		const root = document.documentElement;
		if (mode === 'auto') {
			root.removeAttribute('data-theme');
		} else {
			root.setAttribute('data-theme', mode);
		}
	}, [mode]);

	const value = useMemo(() => ({ mode, setMode }), [mode]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
