import { useEffect, useRef, useState } from 'react';

type Props = {
	src: string;
	alt: string;
	className?: string;
};

export default function FadeImage({ src, alt, className }: Props) {
	const ref = useRef<HTMLImageElement | null>(null);
	const [visible, setVisible] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(el);
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<img
			ref={ref}
			src={visible ? src : undefined}
			alt={alt}
			className={`${className ?? ''} fade-img ${loaded ? 'loaded' : ''}`}
			onLoad={() => setLoaded(true)}
			loading='lazy'
		/>
	);
}
