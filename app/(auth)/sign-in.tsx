import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import {signIn} from '@/lib/appwrite';
import * as Sentry from '@sentry/react-native';
import {Link, router} from 'expo-router';
import {useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';

export default function SignInPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({email: '', password: ''});

	const submit = async () => {
		const {email, password} = form;
		if (!email || !password) {
			return Alert.alert('Please enter valid email and password');
		}
		setIsSubmitting(true);

		try {
			await signIn({email, password});
			router.replace('/');
		} catch (error: any) {
			Alert.alert('Error', error.message);
			Sentry.captureEvent(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className='gap-10 bg-white rounded-lg p-5 mt-5'>
			<CustomInput
				label='Email'
				placeholder='Enter your email'
				value={form.email}
				onChangeText={(text) => setForm((prev) => ({...prev, email: text}))}
				keyboardType='email-address'
			/>
			<CustomInput
				label='Password'
				placeholder='Enter your password'
				value={form.password}
				onChangeText={(text) => setForm((prev) => ({...prev, password: text}))}
				secureTextEntry={true}
			/>
			<CustomButton
				title='Sign In'
				isLoading={isSubmitting}
				onPress={submit}
			/>
			<View className='flex flex-row justify-center gap-2 mt-5'>
				<Text className='base-regular text-gray-100'>
					Don&apos;t have an account?
				</Text>
				<Link
					href='/sign-up'
					className='base-bold text-primary'>
					Sign Up
				</Link>
			</View>
		</SafeAreaView>
	);
}
