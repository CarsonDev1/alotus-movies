import { type RouteObject } from 'react-router-dom';
import Home from '../pages/home/Home';
import NowPlaying from '../pages/movies/NowPlaying';

const publicRoutes: RouteObject = {
	id: 'public',
	path: '/',
	children: [
		{ index: true, element: <Home /> },
		{ path: 'now-playing', element: <NowPlaying /> },
	],
};

export { publicRoutes };
