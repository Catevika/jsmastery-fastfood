import '@/app/global.css';
import useAuthStore from '@/store/auth.store';
import * as Sentry from '@sentry/react-native';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';

Sentry.init({
	dsn: 'https://018defd066e74920c74b136803d73f83@o4508185539837952.ingest.de.sentry.io/4509660358115408',

	// Adds more context data to events (IP address, cookies, user, etc.)
	// For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
	sendDefaultPii: true,

	// Configure Session Replay
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [
		Sentry.mobileReplayIntegration(),
		Sentry.feedbackIntegration(),
	],

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
	const {isLoading, fetchAuthenticatedUser} = useAuthStore();

	const [fontsLoaded, error] = useFonts({
		'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
		'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
		'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
		'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
		'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
	});

	useEffect(() => {
		if (error) {
			throw new Error('Error loading fonts:', error);
		}
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [error, fontsLoaded]);

	useEffect(() => {
		fetchAuthenticatedUser();
	}, [fetchAuthenticatedUser]);

	if (!fontsLoaded || isLoading) return null;

	return <Stack screenOptions={{headerShown: false}} />;
});
