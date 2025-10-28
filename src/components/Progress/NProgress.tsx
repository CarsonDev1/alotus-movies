import { useNProgress } from '@tanem/react-nprogress';
import './NProgress.scss';

interface NProgressProps {
	isAnimating: boolean;
	color?: string;
	height?: number;
}

export function NProgress({ isAnimating, color = '#007bff', height = 3 }: NProgressProps) {
	const { animationDuration, isFinished, progress } = useNProgress({
		isAnimating,
	});

	const barStyle: React.CSSProperties & Record<string, string | number> = {
		width: `${progress * 100}%`,
		transition: `width ${animationDuration}ms ease-out`,
		'--nprogress-color': color,
	};

	return (
		<div
			className='nprogress-container'
			style={{
				height,
				opacity: isFinished ? 0 : 1,
				transition: `opacity ${animationDuration}ms ease-out`,
			}}
		>
			{!isFinished && (
				<div className='nprogress-bar' style={barStyle}>
					<div className='nprogress-glow' />
				</div>
			)}
		</div>
	);
}
