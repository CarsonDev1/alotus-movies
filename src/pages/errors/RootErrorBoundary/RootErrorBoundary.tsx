import { isRouteErrorResponse, useRouteError } from 'react-router';
import { lazy } from 'react';

import { Loadable } from '../../../components/Loadable/Loadable';
import { Button } from '../../../components/Button/Button';
import './RootErrorBoundary.scss';

const app = {
	401: lazy(() => import('../401')),
	404: lazy(() => import('../404')),
	429: lazy(() => import('../429')),
	500: lazy(() => import('../500')),
};

function RootErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error) && Object.keys(app).includes(error.status.toString())) {
		const Component = Loadable(app[error.status as keyof typeof app]);
		return <Component />;
	}

	return (
		<div className='error-page'>
			<div className='error-content'>
				<h2 className='error-title'>Có lỗi xảy ra</h2>
				<p className='error-message'>Vui lòng thử lại sau hoặc quay lại trang chủ.</p>
				<Button variant='outlined' className='error-button'>
					Quay lại trang chủ
				</Button>
			</div>
		</div>
	);
}

export default RootErrorBoundary;
