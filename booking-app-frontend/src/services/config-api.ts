import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import { AuthTokenError } from './errors/auth-token.error';
import { logout } from 'contexts/auth.context';

export const setupAPIClient = (context?: GetServerSidePropsContext) => {
	const cookies = parseCookies(context);

	const api = axios.create({
		baseURL: process.env.NEXT_PUBLIC_BASE_URL,
		headers: {
			Authorization: cookies['@auth.token']
				? `Bearer ${cookies['@auth.token']}`
				: '',
		},
		withCredentials: true,
	});

	api.interceptors.response.use(
		(response) => response,
		(error: AxiosError) => {
			if (error.response?.status === 401) {
				if (typeof window !== undefined) {
					logout();
				} else {
					return Promise.reject(new AuthTokenError());
				}
			}

			return Promise.reject(error);
		},
	);

	return api;
};
