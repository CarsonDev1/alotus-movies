import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './header/Header';
import { Progress } from '../components/Progress/Progress';

export default function Root() {
	return (
		<>
			<Header />
			<main className='main'>
				<Progress />
				<ScrollRestoration />
				<Outlet />
			</main>
		</>
	);
}
