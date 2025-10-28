import { useSearchParams } from 'react-router-dom';
import NowPlayingGrid from '../movies/NowPlayingGrid';
import TopRatedGrid from '../movies/TopRatedGrid';
import Banner from '../../components/Banner/Banner';
import Tabs from '../../components/Tabs/Tabs';
import ViewToggle from '../../components/ViewToggle/ViewToggle';

export default function Home() {
	const [params] = useSearchParams();
	const tab = params.get('tab') ?? 'now';

	return (
		<div>
			<Banner />
			<div className='container'>
				<div className='sec-com'>
					<Tabs />
				</div>
				<div className='toggle-wrap'>
					<ViewToggle />
				</div>
				{tab === 'top' ? <TopRatedGrid /> : <NowPlayingGrid />}
			</div>
		</div>
	);
}
