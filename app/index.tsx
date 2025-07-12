import {Text, View} from 'react-native';

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Text className='text-5xl text-center font-quicksand-bold text-primary'>
				Welcome to my Fast Food App!
			</Text>
		</View>
	);
}
