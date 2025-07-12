import CartButton from '@/components/CartButton';
import {images, offers} from '@/constants';
import cn from 'clsx';
import {Fragment} from 'react';
import {
	FlatList,
	Image,
	Pressable,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function HomePage() {
	return (
		<SafeAreaView className='flex-1 bg-white'>
			<FlatList
				data={offers}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({item}) => {
					const isEven = item.id % 2 === 0;
					return (
						<View>
							<Pressable
								className={cn(
									'offer-card',
									isEven ? 'flex-row' : 'flex-row-reverse',
								)}
								style={{backgroundColor: item.color}}
								android_ripple={{color: '#fffff22'}}>
								<Fragment>
									<View className='h-full w-1/2'>
										<Image
											source={item.image}
											className='size-full'
											resizeMode={
												item.title === 'PIZZA PARTY' ? 'cover' : 'contain'
											}
										/>
									</View>
									<View
										className={cn(
											'offer-card__info',
											isEven ? 'pr-5' : 'pl-5',
										)}>
										<Text className='h1-bold text-white leading-tight'>
											{item.title}
										</Text>
										<Image
											source={images.arrowRight}
											className='size-10'
											resizeMode='contain'
											tintColor='#fff'
										/>
									</View>
								</Fragment>
							</Pressable>
						</View>
					);
				}}
				contentContainerClassName='pb-28 px-5'
				ListHeaderComponent={() => (
					<View className='flex-between flex-row w-full my-5'>
						<View className='flex-start'>
							<Text className='small-bold text-primary'>DELIVER TO</Text>
							<TouchableOpacity className='flex-center flex-row gap-1 mt-0.5'>
								<Text className='paragraph-bold text-dark-100'>Paris</Text>
								<Image
									source={images.arrowDown}
									className='size-3'
									resizeMode='contain'
								/>
							</TouchableOpacity>
						</View>
						<CartButton />
					</View>
				)}
			/>
		</SafeAreaView>
	);
}
