import { useSearchParams, useNavigate } from 'react-router-dom';
import { LayoutGrid, List as ListIcon } from 'lucide-react';
import './ViewToggle.scss';

export default function ViewToggle() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const view = params.get('view') ?? 'grid';

	const setView = (v: 'grid' | 'list') => {
		const next = new URLSearchParams(params);
		next.set('view', v);
		navigate(`?${next.toString()}`, { preventScrollReset: true });
	};

	return (
		<div className='view-toggle'>
			<button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>
				<LayoutGrid size={18} />
			</button>
			<button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
				<ListIcon size={18} />
			</button>
		</div>
	);
}
