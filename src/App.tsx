import Header from './layout/header/Header';
import './styles/global.scss';

export default function App() {
	return (
		<>
			<Header />
			<main className='main container'>
				<p>Step 1 ✅ — Router, React Query, i18n, Dark/Light/Auto đã sẵn sàng.</p>
				<p>Sang Step 2 sẽ fetch TMDB (Now Playing).</p>
			</main>
		</>
	);
}
