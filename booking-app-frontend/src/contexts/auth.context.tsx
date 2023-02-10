import { createContext, useContext, useLayoutEffect, useState } from 'react';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import jwtDecode from 'jwt-decode';

// SERVICES
import { api } from '@/services/api';

// INTERFACES
import { UserInterface } from '@/interfaces/user.interface';
import { DoLoginInterface } from '@/interfaces/do-login.interface';
import { RegisterInterface } from '@/interfaces/register.interface';

interface AuthContextData {
	user?: UserInterface;
	isAuthenticated: boolean;
	ready: boolean;
	doLogin: (data: DoLoginInterface) => Promise<void>;
	register: (data: RegisterInterface) => Promise<void>;
	logout: () => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
	{} as AuthContextData,
);

export const logout = () => {
	try {
		destroyCookie(undefined, '@auth.token');
		Router.push('/login');
	} catch (error) {
		console.error(error);
	}
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<UserInterface>();
	const [ready, setReady] = useState(false);

	useLayoutEffect(() => {
		const { '@auth.token': token } = parseCookies(undefined);

		if (token) {
			setReady(false);
			(async () => {
				try {
					//const { data } = await api.get<UserInterface>(`/users/me`);
					const data: UserInterface = {
						id: '1',
						username: 'Teste',
						email: 'teste@teste.com',
					};
					setUser(data);
				} catch (error) {
					console.error(error);
					logout();
				} finally {
					setReady(true);
				}
			})();
		}
	}, [setUser]);

	const doLogin = async (credentials: DoLoginInterface) => {
		try {
			// const { data } = await api.post<{ token: string }>(
			// 	`/auth/login`,
			// 	credentials,
			// );
			const data = {
				token: 'token',
			};
			setCookie(undefined, '@auth.token', data.token, {
				maxAge: 60 * 60 * 12, // 12h
				path: '/', // Quais caminhos terão acesso ao token. `/` significa que todos terão acesso
			});

			// const { id, username, email } = jwtDecode<UserInterface>(
			// 	data.token,
			// );
			const { id, username, email } = {
				id: '1',
				username: 'Teste',
				email: 'teste@teste.com',
			};
			setUser({ id, username, email });

			api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

			Router.push('/');
		} catch (error) {
			if (user) {
				setUser(undefined);
			}
			logout();
			throw error;
		}
	};

	const register = async (data: RegisterInterface) => {
		await api.post(`/auth/register`, data);
		Router.push('/');
	};

	const handleLogout = () => {
		setUser(undefined);
		logout();
	};

	const authProviderData: AuthContextData = {
		user,
		isAuthenticated: !!user,
		ready,
		doLogin,
		register,
		logout: handleLogout,
	};

	return (
		<AuthContext.Provider value={authProviderData}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
