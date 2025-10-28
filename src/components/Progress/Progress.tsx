import { useNavigation } from 'react-router';
import { NProgress } from './NProgress';

export function Progress() {
	const navigation = useNavigation();

	const isLoading = navigation.state === 'loading' && navigation.formData == null && !!navigation.location?.pathname;

	return <NProgress isAnimating={isLoading} color='#29d' />;
}
