import {Slot} from 'expo-router';
import {SafeAreaView, Text} from 'react-native';

export default function AuthLayout() {
	return (
		<SafeAreaView>
			<Text>Auth Layout</Text>
			<Slot />
		</SafeAreaView>
	);
}
