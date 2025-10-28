import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from './theme';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import './styles/global.scss';
import i18n from './i18';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider>
					<RouterProvider router={router} />
				</ThemeProvider>
			</I18nextProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
