import '@/app/global.css';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';

export default function RootLayout() {
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

	return <Stack screenOptions={{headerShown: false}} />;
}
