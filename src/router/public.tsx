import { type RouteObject } from 'react-router-dom';
import Home from '../pages/home/Home';
import SearchPage from '../pages/search/SearchPage';
import MovieDetailPage from '../pages/movies/detail/MovieDetailPage';
import MyListPage from '../pages/my-list/MyListPage';

const publicRoutes: RouteObject = {
	id: 'public',
	path: '/',
	children: [
		{ index: true, element: <Home /> },
		{ path: 'search', element: <SearchPage /> },
		{ path: 'movie/:id', element: <MovieDetailPage /> },
		{ path: 'my-list', element: <MyListPage /> },
	],
};

export { publicRoutes };
