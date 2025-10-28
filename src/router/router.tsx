import { createBrowserRouter, type RouteObject } from 'react-router';

import { publicRoutes } from './public';
import Root from '../layout/Root';
import RootErrorBoundary from '../pages/errors/RootErrorBoundary/RootErrorBoundary';

const router = createBrowserRouter([
	{
		id: 'root',
		Component: Root,
		ErrorBoundary: RootErrorBoundary,
		children: [publicRoutes] as RouteObject[],
	},
]);

export default router;
