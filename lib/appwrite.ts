import type {CreateUserParams, SignInParams} from '@/type';
import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from 'react-native-appwrite';

if (
	!process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ||
	!process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ||
	!process.env.EXPO_PUBLIC_APPWRITE_PLATFORM ||
	!process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID ||
	!process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID
) {
	throw new Error(
		'Please add APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_PLATFORM, APPWRITE_DATABASE_ID, APPWRITE_USER_COLLECTION_ID to .env',
	);
}

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT.toString(),
	project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID.toString(),
	platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM.toString(),
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID.toString(),
	userCollectionId:
		process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID.toString(),
};

export const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.project)
	.setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);

		if (!newAccount) {
			throw new Error('Failed to create user');
		}

		await signIn({email, password});

		const avatarUrl = avatars.getInitialsURL(name);

		return await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				email,
				name,
				accountId: newAccount.$id,
				avatar: avatarUrl,
			},
		);
	} catch (error) {
		throw new Error(error as string);
	}
};

export const signIn = async ({email, password}: SignInParams) => {
	try {
		await account.createEmailPasswordSession(email, password);
	} catch (error) {
		throw new Error(error as string);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) {
			throw new Error('Failed to get current user');
		}
		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)],
		);
		if (!currentUser) {
			throw new Error('Failed to get current user');
		}
		return currentUser.documents[0];
	} catch (error) {
		throw new Error(error as string);
	}
};
