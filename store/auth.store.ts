import {getCurrentUser} from '@/lib/appwrite';
import type {User} from '@/type';
import {create} from 'zustand';

type AuthState = {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	setUser: (user: User | null) => void;
	setIsLoading: (isLoading: boolean) => void;
	fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: false,
	user: null,
	isLoading: true,
	setIsAuthenticated: (value) => set({isAuthenticated: value}),
	setUser: (user) => set({user}),
	setIsLoading: (value) => set({isLoading: value}),
	fetchAuthenticatedUser: async () => {
		set({isLoading: true});
		try {
			const user = await getCurrentUser();
			if (user) {
				set({user: user as User, isAuthenticated: true});
			} else {
				set({user: null, isAuthenticated: false});
			}
		} catch (error) {
			console.log('fetchAuthenticatedUser error: ', error);
			set({user: null, isAuthenticated: false});
		} finally {
			set({isLoading: false});
		}
	},
}));

export default useAuthStore;
