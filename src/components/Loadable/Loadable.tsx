import { Suspense, createElement, isValidElement } from 'react';
import type { ComponentType, LazyExoticComponent, FC, ReactNode } from 'react';

function isReactComponent(value: unknown): value is ComponentType {
	return typeof value === 'function' && 'value' in value.prototype && typeof (value.prototype as object) === 'object';
}

function Loadable<T extends object>(
	Component: LazyExoticComponent<ComponentType<T>>,
	Fallback?: ComponentType<Record<string, never>> | (() => ReactNode)
) {
	const LoadableComponent: FC<T> = (props) => {
		let fallbackElement: ReactNode = null;

		if (typeof Fallback === 'function') {
			if (!isReactComponent(Fallback)) {
				fallbackElement = (Fallback as () => ReactNode)();
			} else {
				fallbackElement = createElement(Fallback);
			}
		} else if (isValidElement(Fallback)) {
			fallbackElement = Fallback;
		}

		return (
			<Suspense fallback={fallbackElement}>
				{createElement(Component as unknown as ComponentType<T>, props)}
			</Suspense>
		);
	};

	return LoadableComponent;
}

export { Loadable };
