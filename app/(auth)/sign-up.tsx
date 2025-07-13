import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import {createUser} from '@/lib/appwrite';
import {Link, router} from 'expo-router';
import {useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';

export default function SignUpPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({name: '', email: '', password: ''});

	const submit = async () => {
		const {name, email, password} = form;
		if (!name || !email || !password) {
			return Alert.alert('Please enter valid name, email and password');
		}
		setIsSubmitting(true);

		try {
			await createUser({name, email, password});
			router.replace('/');
		} catch (error: any) {
			Alert.alert('Error', error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className='gap-10 bg-white rounded-lg p-5 mt-5'>
			<CustomInput
				label='Name'
				placeholder='Enter your name'
				value={form.name}
				onChangeText={(text) => setForm((prev) => ({...prev, name: text}))}
			/>
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
				title='Sign Up'
				isLoading={isSubmitting}
				onPress={submit}
			/>
			<View className='flex flex-row justify-center gap-2 mt-5'>
				<Text className='base-regular text-gray-100'>
					Already have an account?
				</Text>
				<Link
					href='/sign-in'
					className='base-bold text-primary'>
					Sign In
				</Link>
			</View>
		</SafeAreaView>
	);
}
