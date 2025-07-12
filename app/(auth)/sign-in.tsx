import {router} from 'expo-router';
import {Button, Text, View} from 'react-native';
export default function SignIn() {
	return (
		<View>
			<Text> Sign In Page</Text>
			<Button
				title='Sign Up'
				onPress={() => router.push('/sign-up')}
			/>
		</View>
	);
}
