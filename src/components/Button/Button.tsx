import React, { type ElementType, type ReactNode, forwardRef } from 'react';
import './Button.scss';

type Variant = 'filled' | 'outlined';

export interface ButtonProps<E extends ElementType = 'button'> {
	as?: E;
	children?: ReactNode;
	color?: string;
	variant?: Variant;
	disabled?: boolean;
	isIcon?: boolean;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef(
	<E extends ElementType = 'button'>(
		{
			as,
			children,
			color = '#007bff',
			variant = 'filled',
			disabled,
			isIcon = false,
			type = 'button',
			className = '',
			...rest
		}: ButtonProps<E>,
		ref: React.ForwardedRef<HTMLButtonElement>
	) => {
		const Component = as || 'button';

		const baseClass = 'btn';
		const variantClass = `${baseClass}--${variant}`;
		const iconClass = isIcon ? `${baseClass}--icon` : '';
		const fullClassName = [baseClass, variantClass, iconClass, className].filter(Boolean).join(' ');

		const style: React.CSSProperties & Record<string, string | number> = {
			'--btn-color': color,
		};

		return (
			<Component
				ref={ref}
				type={Component === 'button' ? type : undefined}
				disabled={disabled}
				className={fullClassName}
				style={style}
				{...rest}
			>
				{children}
			</Component>
		);
	}
);

Button.displayName = 'Button';
